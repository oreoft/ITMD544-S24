const mysql = require('mysql2/promise');
require('dotenv').config();
async function openDb() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWROD,
        database: process.env.DB_DATABASE
    });
}

async function setupDatabase() {
    const db = await openDb();
    await db.query(`CREATE TABLE IF NOT EXISTS contacts (
        id VARCHAR(255) PRIMARY KEY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        emailAddress VARCHAR(255),
        notes TEXT,
        lastEdited DATETIME
    )`);
    await db.end();
}

module.exports = { openDb, setupDatabase };
