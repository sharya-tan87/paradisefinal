/**
 * Business Configuration
 * Contains business-specific settings that can be adjusted without code changes
 */

module.exports = {
    // Tax Configuration (Thailand VAT)
    tax: {
        vatRate: parseFloat(process.env.VAT_RATE) || 0.07, // 7% VAT
        vatIncludedByDefault: true
    },

    // Clinic Information
    clinic: {
        name: process.env.CLINIC_NAME || 'Paradise Dental Clinic',
        address: process.env.CLINIC_ADDRESS || '123 Sukhumvit Rd, Bangkok',
        phone: process.env.CLINIC_PHONE || '02-XXX-XXXX',
        email: process.env.CLINIC_EMAIL || 'contact@paradisedental.com'
    },

    // Booking Configuration
    booking: {
        maxAdvanceMonths: parseInt(process.env.BOOKING_MAX_MONTHS) || 6, // How far in advance can book
        minAdvanceHours: parseInt(process.env.BOOKING_MIN_HOURS) || 24,  // Minimum hours before appointment
        defaultSlotDuration: parseInt(process.env.SLOT_DURATION) || 30  // Minutes per slot
    },

    // Security Configuration
    security: {
        maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5,
        lockoutDuration: parseInt(process.env.LOCKOUT_DURATION) || 30 // Minutes
    }
};
