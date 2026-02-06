/**
 * AES-256-GCM Encryption Utility for Sensitive Data
 *
 * Used to encrypt PHI (Protected Health Information) at rest
 * including: phone, medicalHistory, allergies, currentMedications
 *
 * IMPORTANT: Set ENCRYPTION_KEY in .env (64-char hex string)
 * Generate with: openssl rand -hex 32
 */

const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Get encryption key from environment
 * @returns {Buffer} 32-byte encryption key
 */
function getKey() {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        throw new Error('ENCRYPTION_KEY environment variable is not set');
    }
    if (key.length !== 64) {
        throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)');
    }
    return Buffer.from(key, 'hex');
}

/**
 * Encrypt a plaintext string
 * @param {string} plaintext - The text to encrypt
 * @returns {string|null} Encrypted string in format: iv:authTag:ciphertext (hex encoded)
 */
function encrypt(plaintext) {
    if (!plaintext || plaintext === '') {
        return null;
    }

    try {
        const key = getKey();
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

        let encrypted = cipher.update(plaintext, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        // Format: iv:authTag:ciphertext
        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    } catch (error) {
        console.error('Encryption error:', error.message);
        throw new Error('Failed to encrypt data');
    }
}

/**
 * Decrypt an encrypted string
 * @param {string} encryptedText - Encrypted string in format: iv:authTag:ciphertext
 * @returns {string|null} Decrypted plaintext
 */
function decrypt(encryptedText) {
    if (!encryptedText || encryptedText === '') {
        return null;
    }

    // Check if the text looks like it's encrypted (has the iv:authTag:ciphertext format)
    if (!encryptedText.includes(':')) {
        // Return as-is if not encrypted (for backward compatibility with existing data)
        return encryptedText;
    }

    try {
        const key = getKey();
        const parts = encryptedText.split(':');

        if (parts.length !== 3) {
            // Not in expected format, return as-is
            return encryptedText;
        }

        const [ivHex, authTagHex, encrypted] = parts;

        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');

        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        // If decryption fails, the data might not be encrypted
        // Return the original value for backward compatibility
        console.warn('Decryption warning:', error.message);
        return encryptedText;
    }
}

/**
 * Check if a value appears to be encrypted
 * @param {string} value - The value to check
 * @returns {boolean} True if the value appears to be encrypted
 */
function isEncrypted(value) {
    if (!value || typeof value !== 'string') {
        return false;
    }
    const parts = value.split(':');
    // Check for format: 32-char-iv:32-char-authTag:ciphertext
    return parts.length === 3 &&
           parts[0].length === 32 &&
           parts[1].length === 32 &&
           /^[a-f0-9]+$/i.test(parts[0]) &&
           /^[a-f0-9]+$/i.test(parts[1]);
}

/**
 * Create Sequelize getter/setter for encrypted fields
 * Use in model definition like:
 * phone: {
 *   type: DataTypes.STRING,
 *   ...encryptedField()
 * }
 */
function encryptedField() {
    return {
        get() {
            const value = this.getDataValue(this.constructor.name);
            return decrypt(value);
        },
        set(value) {
            this.setDataValue(this.constructor.name, encrypt(value));
        }
    };
}

module.exports = {
    encrypt,
    decrypt,
    isEncrypted,
    encryptedField
};
