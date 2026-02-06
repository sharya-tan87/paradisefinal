/**
 * RefreshToken Model
 *
 * Stores refresh token hashes for secure token management.
 * Enables token rotation and revocation.
 */

const { Model, DataTypes, Op } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize) => {
    class RefreshToken extends Model {
        /**
         * Hash a token for storage
         * @param {string} token - Plain refresh token
         * @returns {string} SHA-256 hash
         */
        static hashToken(token) {
            return crypto.createHash('sha256').update(token).digest('hex');
        }

        /**
         * Store a new refresh token
         * @param {number} userId - User ID
         * @param {string} token - Plain refresh token
         * @param {number} expiresInDays - Days until expiration
         * @returns {Promise<RefreshToken>}
         */
        static async storeToken(userId, token, expiresInDays = 30) {
            const tokenHash = RefreshToken.hashToken(token);
            const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

            return RefreshToken.create({
                userId,
                tokenHash,
                expiresAt
            });
        }

        /**
         * Validate a refresh token
         * @param {number} userId - User ID
         * @param {string} token - Plain refresh token
         * @returns {Promise<RefreshToken|null>} Token entry if valid
         */
        static async validateToken(userId, token) {
            const tokenHash = RefreshToken.hashToken(token);

            return RefreshToken.findOne({
                where: {
                    userId,
                    tokenHash,
                    isRevoked: false,
                    expiresAt: { [Op.gt]: new Date() }
                }
            });
        }

        /**
         * Revoke a specific token (used during rotation)
         * @param {number} tokenId - Token ID
         * @returns {Promise<boolean>}
         */
        static async revokeToken(tokenId) {
            const [updated] = await RefreshToken.update(
                { isRevoked: true },
                { where: { id: tokenId } }
            );
            return updated > 0;
        }

        /**
         * Revoke all tokens for a user (used during logout)
         * @param {number} userId - User ID
         * @returns {Promise<number>} Number of revoked tokens
         */
        static async revokeAllUserTokens(userId) {
            const [updated] = await RefreshToken.update(
                { isRevoked: true },
                { where: { userId, isRevoked: false } }
            );
            return updated;
        }

        /**
         * Clean up expired and revoked tokens
         * @returns {Promise<number>} Number of deleted tokens
         */
        static async cleanup() {
            return RefreshToken.destroy({
                where: {
                    [Op.or]: [
                        { expiresAt: { [Op.lt]: new Date() } },
                        { isRevoked: true }
                    ]
                }
            });
        }
    }

    RefreshToken.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        tokenHash: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isRevoked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'RefreshToken',
        tableName: 'refresh_tokens',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                fields: ['userId']
            },
            {
                fields: ['tokenHash']
            },
            {
                fields: ['expiresAt']
            }
        ]
    });

    return RefreshToken;
};
