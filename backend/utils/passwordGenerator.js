const crypto = require('crypto');

/**
 * Generate a cryptographically secure random temporary password
 * @param {number} length - Password length (default: 12)
 * @returns {string} - Random password
 */
function generateTempPassword(length = 12) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const allChars = uppercase + lowercase + numbers + symbols;

    // Use cryptographically secure random bytes
    const randomBytes = crypto.randomBytes(length);

    // Ensure at least one of each type
    let password = '';
    password += uppercase[randomBytes[0] % uppercase.length];
    password += lowercase[randomBytes[1] % lowercase.length];
    password += numbers[randomBytes[2] % numbers.length];
    password += symbols[randomBytes[3] % symbols.length];

    // Fill rest with random chars
    for (let i = 4; i < length; i++) {
        password += allChars[randomBytes[i] % allChars.length];
    }

    // Cryptographically secure shuffle
    const shuffleBytes = crypto.randomBytes(password.length);
    const chars = password.split('');
    for (let i = chars.length - 1; i > 0; i--) {
        const j = shuffleBytes[i] % (i + 1);
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join('');
}

module.exports = { generateTempPassword };
