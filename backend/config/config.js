require('dotenv').config();

const dbConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
};

// Support DATABASE_URL for cloud hosting (Aiven, Railway, etc.)
if (process.env.DATABASE_URL) {
    dbConfig.use_env_variable = 'DATABASE_URL';
    dbConfig.dialectOptions = {
        ssl: {
            rejectUnauthorized: true,
        },
    };
}

module.exports = {
    development: { ...dbConfig },
    test: { ...dbConfig },
    production: { ...dbConfig, logging: false },
};
