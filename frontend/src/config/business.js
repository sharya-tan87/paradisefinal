/**
 * Business Configuration (Frontend)
 * Contains business-specific settings for the client application
 */

const config = {
    // Clinic Information
    clinic: {
        name: 'Paradise Dental Clinic',
        nameThai: 'พาราไดซ์ เดนทอล คลินิก',
        address: '123 Sukhumvit Rd, Bangkok',
        addressThai: '123 ถนนสุขุมวิท กรุงเทพฯ',
        phone: '02-XXX-XXXX',
        email: 'contact@paradisedental.com',
        lineId: '@paradisedental',
        facebook: 'paradisedentalclinic'
    },

    // Booking Configuration
    booking: {
        maxAdvanceMonths: 6,       // How far in advance patients can book
        minAdvanceHours: 24,       // Minimum hours before appointment
        defaultSlotDuration: 30    // Minutes per appointment slot
    },

    // Tax Configuration (for display purposes)
    tax: {
        vatRate: 0.07,             // 7% VAT
        vatLabel: 'VAT 7%'
    },

    // Business Hours
    businessHours: {
        weekdays: { open: '09:00', close: '18:00' },
        saturday: { open: '09:00', close: '15:00' },
        sunday: { open: null, close: null }  // Closed
    }
};

export default config;
