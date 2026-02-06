const jwt = require('jsonwebtoken');
const { TokenBlacklist } = require('../models');
const logger = require('../utils/logger');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        // Verify JWT first (fast, no DB call)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is blacklisted (logged out)
        // If blacklist check fails due to DB error, allow the request through
        // rather than incorrectly returning 401
        try {
            const isBlacklisted = await TokenBlacklist.isBlacklisted(token);
            if (isBlacklisted) {
                return res.status(401).json({ message: 'Token has been revoked' });
            }
        } catch (dbError) {
            logger.warn('Token blacklist check failed, allowing request:', dbError.message);
        }

        // Attach user to request
        req.user = decoded;
        req.token = token; // Store token for potential logout
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // For unexpected errors (not JWT-related), return 500 not 401
        logger.error('Authentication middleware error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authenticate;
