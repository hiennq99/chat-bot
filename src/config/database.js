const { createPool } = require('mysql');

const pool = createPool({
    port: 3306,
    host: 'localhost',
    user: 'admin',
    password: '123',
    database: 'chatbot',
    connectionLimit: 10
});

module.exports = pool;