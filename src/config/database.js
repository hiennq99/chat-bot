const { createPool } = require('mysql');

const pool = createPool({
    port: 3306,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

module.exports = pool;