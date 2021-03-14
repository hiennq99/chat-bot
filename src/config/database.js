const { createPool } = require('mysql');
require('dotenv').config();

const pool = createPool({
    port: 3306,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DA_NAME,
    connectionLimit: 10
});

module.exports = pool;