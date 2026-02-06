require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const logger = require('./utils/logger');

// Import routes
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

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

// Test Route
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
app.use('/api/test', testRoutes);

// Database Connection and Server Start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync models (force: false means use migrations, alter: true updates schema)
        await sequelize.sync({ alter: true });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        // Continue running server even if DB fails, for testing
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} (DB Connection Failed)`);
        });
    }
};

startServer();
