const { openDb } = require('./database');

const repo = {
    findAll: async () => {
        const db = await openDb();
        const [rows] = await db.query('SELECT * FROM contacts');
        await db.end();
        return rows;
    },
    findById: async (uuid) => {
        const db = await openDb();
        const [rows] = await db.query('SELECT * FROM contacts WHERE id = ?', [uuid]);
        await db.end();
        return rows[0];
    },
    create: async (contact) => {
        const db = await openDb();
        const { firstName, lastName, emailAddress, notes } = contact;
        const id = require('crypto').randomUUID();
        const lastEdited = new Date().toISOString().slice(0, 19).replace('T', ' '); // MySQL datetime format
        await db.query('INSERT INTO contacts (id, firstName, lastName, emailAddress, notes, lastEdited) VALUES (?, ?, ?, ?, ?, ?)', [id, firstName, lastName, emailAddress, notes, lastEdited]);
        await db.end();
    },
    deleteById: async (uuid) => {
        const db = await openDb();
        await db.query('DELETE FROM contacts WHERE id = ?', [uuid]);
        await db.end();
    },
    update: async (contact) => {
        const db = await openDb();
        const { id, firstName, lastName, emailAddress, notes, lastEdited } = contact;
        await db.query('UPDATE contacts SET firstName = ?, lastName = ?, emailAddress = ?, notes = ?, lastEdited = ? WHERE id = ?', [firstName, lastName, emailAddress, notes, lastEdited, id]);
        await db.end();
    },
};

module.exports = repo;
