const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, TokenBlacklist, RefreshToken } = require('../models');
const logger = require('../utils/logger');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: 'Validation failed',
                details: [{ field: 'username/password', message: 'Username and password are required' }]
            });
        }

        // 1. Find User
        const user = await User.findOne({ where: { username } });
        if (!user) {
            // Create separate log for security audit but return generic message
            logger.warn(`Login failed: User not found - ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 2. Check if user is active
        if (!user.active) {
            logger.warn(`Login attempt for deactivated account: ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Check account lockout
        if (user.lockUntil && user.lockUntil > new Date()) {
            const remainingTime = Math.ceil((user.lockUntil - new Date()) / 60000);
            logger.warn(`Login attempt on locked account: ${username}`);
            return res.status(423).json({
                message: `Account temporarily locked. Please try again in ${remainingTime} minutes.`
            });
        }

        // 4. Check Password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            // Increment failed login attempts
            const attempts = (user.failedLoginAttempts || 0) + 1;
            const updates = { failedLoginAttempts: attempts };

            // Lock account after 5 failed attempts (15 minutes lockout)
            if (attempts >= 5) {
                updates.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
                logger.warn(`Account locked due to failed attempts: ${username}`);
            }

            await user.update(updates);
            logger.warn(`Login failed: Invalid password - ${username} (attempt ${attempts})`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 5. Reset failed attempts on successful login
        if (user.failedLoginAttempts > 0 || user.lockUntil) {
            await user.update({ failedLoginAttempts: 0, lockUntil: null });
        }

        // 6. Generate Tokens (configurable expiry from .env)
        const accessToken = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRY || '8h' }
        );

        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRY || '30d' }
        );

        // Store refresh token hash for validation and revocation
        try {
            await RefreshToken.storeToken(user.id, refreshToken, 30);
        } catch (tokenErr) {
            logger.warn(`Failed to store refresh token: ${tokenErr.message}`);
            // Continue even if storage fails - backward compatibility
        }

        logger.info(`User logged in successfully: ${username}`);

        // 4. Return tokens and user data (excluding password_hash)
        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                email: user.email
            }
        });
    } catch (error) {
        logger.error(`Login error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token required' });
        }

        // Verify token signature
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            logger.warn('Refresh token verification failed');
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Validate against stored token (if available)
        const storedToken = await RefreshToken.validateToken(decoded.userId, refreshToken);

        const user = await User.findByPk(decoded.userId);
        if (!user) {
            logger.warn('Refresh token user not found');
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if user is still active
        if (!user.active) {
            logger.warn(`Token refresh attempt for deactivated account: ${user.username}`);
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        // Revoke old token if it was stored (token rotation)
        if (storedToken) {
            await RefreshToken.revokeToken(storedToken.id);
        }

        // Generate new tokens
        const newAccessToken = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' }
        );

        const newRefreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRY || '30d' }
        );

        // Store new refresh token
        try {
            await RefreshToken.storeToken(user.id, newRefreshToken, 30);
        } catch (tokenErr) {
            logger.warn(`Failed to store new refresh token: ${tokenErr.message}`);
        }

        logger.info(`Token refreshed for user: ${user.username}`);

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                email: user.email
            }
        });

    } catch (error) {
        logger.error(`Refresh error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

/**
 * Logout - Blacklist current access token
 */
exports.logout = async (req, res) => {
    try {
        const token = req.token; // Set by authenticate middleware

        if (token) {
            // Decode to get expiration time
            const decoded = jwt.decode(token);
            const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 15 * 60 * 1000);

            // Add token to blacklist
            await TokenBlacklist.blacklist(token, expiresAt);
            logger.info(`User logged out: ${req.user.username}`);
        }

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        logger.error(`Logout error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: 'An error occurred during logout' });
    }
};

/**
 * Logout All - Revoke all refresh tokens for user
 */
exports.logoutAll = async (req, res) => {
    try {
        const userId = req.user.userId;
        const token = req.token;

        // Blacklist current access token
        if (token) {
            const decoded = jwt.decode(token);
            const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 15 * 60 * 1000);
            await TokenBlacklist.blacklist(token, expiresAt);
        }

        // Revoke all refresh tokens
        const revokedCount = await RefreshToken.revokeAllUserTokens(userId);

        logger.info(`User logged out from all devices: ${req.user.username} (${revokedCount} tokens revoked)`);

        return res.status(200).json({
            success: true,
            message: 'Logged out from all devices successfully',
            revokedSessions: revokedCount
        });
    } catch (error) {
        logger.error(`Logout all error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: 'An error occurred during logout' });
    }
};
