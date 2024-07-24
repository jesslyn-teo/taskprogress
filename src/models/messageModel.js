const pool = require('../services/db');

module.exports = {
    selectAll: (callback) => {
        const SQLSTATMENT = `
            SELECT * FROM Messages;
        `;

        pool.query(SQLSTATMENT, callback);
    },

    selectById: (data, callback) => {
        const SQLSTATMENT = `
            SELECT * FROM Messages
            WHERE id = ?;
        `;

        const VALUES = [data.id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    insertSingle: (data, callback) => {
        const SQLSTATMENT = `
            INSERT INTO Messages (message_text, user_id)
            VALUES (?, ?);
        `;

        const VALUES = [data.message_text, data.user_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    updateById: (data, callback) => {
        const SQLSTATMENT = `
            UPDATE Messages 
            SET message_text = ?, user_id = ?
            WHERE id = ?;
        `;

        const VALUES = [data.message_text, data.user_id, data.id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    deleteById: (data, callback) => {
        const SQLSTATMENT = `
            DELETE FROM Messages 
            WHERE id = ?;
        `;
        const VALUES = [data.id];

        pool.query(SQLSTATMENT, VALUES, callback);
    }
};