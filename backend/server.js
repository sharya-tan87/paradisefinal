require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('./models');
const logger = require('./utils/logger');

// Import routes
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware - Helmet for HTTP security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "blob:"],
            scriptSrc: ["'self'"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// CORS middleware - environment-aware configuration
const corsOrigins = process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL].filter(Boolean)
    : [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174'
    ];

if (corsOrigins.length === 0) {
    logger.warn('WARNING: No CORS origins configured!');
}

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman)
        if (!origin) return callback(null, true);

        if (corsOrigins.includes(origin)) {
            callback(null, true);
        } else {
            logger.warn(`CORS blocked origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving with security headers
app.use('/uploads', express.static('uploads', {
    setHeaders: (res, path) => {
        res.set('X-Content-Type-Options', 'nosniff');
    }
}));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.path}`, {
            ip: req.ip,
            userAgent: req.headers['user-agent']
        });
        next();
    });
}

// Health check endpoints for monitoring/load balancers
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

app.get('/ready', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).json({
            status: 'ready',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({
            status: 'not ready',
            database: 'disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Paradise Dental API' });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'API connection successful' });
});

// API Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/treatments', require('./routes/treatmentRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/reports', require('./routes/reportsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/dentist-profiles', require('./routes/dentistProfileRoutes'));
// Test routes - only available in development
if (process.env.NODE_ENV !== 'production') {
    app.use('/api/test', testRoutes);
}

// Server instance for graceful shutdown
let server;

// Graceful shutdown handler
async function gracefulShutdown(signal) {
    logger.info(`${signal} received. Starting graceful shutdown...`);

    // Stop accepting new connections
    if (server) {
        server.close(async () => {
            logger.info('HTTP server closed');

            try {
                // Close database connections
                await sequelize.close();
                logger.info('Database connections closed');
                process.exit(0);
            } catch (error) {
                logger.error('Error during shutdown:', error);
                process.exit(1);
            }
        });
    }

    // Force shutdown after 30 seconds
    setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
    }, 30000);
}

// Database Connection and Server Start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connection has been established successfully.');

        // Sync models - use plain sync to avoid duplicate index issues
        // For schema changes, use migrations instead of alter:true
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync();
            logger.info('Database models synced (development mode).');
        }

        server = app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

        // Register graceful shutdown handlers
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        // In production, exit on DB failure; in development, continue for testing
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        } else {
            server = app.listen(PORT, () => {
                logger.warn(`Server is running on port ${PORT} (DB Connection Failed)`);
            });
        }
    }
};

startServer();
