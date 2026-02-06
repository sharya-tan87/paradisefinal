/**
 * TokenBlacklist Model
 *
 * Stores invalidated JWT tokens to prevent reuse after logout.
 * Tokens are stored until their natural expiration, then can be cleaned up.
 */

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class TokenBlacklist extends Model {
        /**
         * Check if a token is blacklisted
         * @param {string} token - The JWT token to check
         * @returns {Promise<boolean>} True if blacklisted
         */
        static async isBlacklisted(token) {
            const entry = await TokenBlacklist.findOne({
                where: { token }
            });
            return !!entry;
        }

        /**
         * Add a token to the blacklist
         * @param {string} token - The JWT token to blacklist
         * @param {Date} expiresAt - When the token naturally expires
         * @returns {Promise<TokenBlacklist>} The created entry
         */
        static async blacklist(token, expiresAt) {
            return TokenBlacklist.create({ token, expiresAt });
        }

        /**
         * Clean up expired tokens from the blacklist
         * Should be run periodically (e.g., daily cron job)
         * @returns {Promise<number>} Number of deleted entries
         */
        static async cleanupExpired() {
            const result = await TokenBlacklist.destroy({
                where: {
                    expiresAt: {
                        [require('sequelize').Op.lt]: new Date()
                    }
                }
            });
            return result;
        }
    }

    TokenBlacklist.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'TokenBlacklist',
        tableName: 'token_blacklist',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false, // No need for updatedAt
        indexes: []
    });

    return TokenBlacklist;
};
