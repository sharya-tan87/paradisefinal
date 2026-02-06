const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

// Rate limiting for authentication endpoints (security: prevent brute force)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window per IP
    message: {
        success: false,
        error: 'Too many login attempts. Please try again in 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false
    // Uses default IP-based key generator
});

const refreshLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        error: 'Too many refresh attempts. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Login Route (rate limited)
router.post('/login', loginLimiter, authController.login);

// Refresh Token Route (rate limited)
router.post('/refresh', refreshLimiter, authController.refresh);

// Protected Route for Testing/User Info
router.get('/me', authenticate, (req, res) => {
    res.json({ user: req.user });
});

// Logout Route - Invalidates current token
router.post('/logout', authenticate, authController.logout);

// Logout All - Invalidates all refresh tokens for user
router.post('/logout-all', authenticate, authController.logoutAll);

module.exports = router;
