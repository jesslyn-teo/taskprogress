const pool = require("../services/db");

module.exports = {

    // middleware
    checkFairyCompanionName : (data, callback) => {
        const SQLSTATMENT = `
            SELECT * FROM FairyCompanion
            WHERE fairy_companion_name = ?;
        `;
        const VALUES = [data.fairy_companion_name];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // GET all fairy companions
    selectAllFairyCompanion : (callback) => {
        const SQLSTATMENT = `
            SELECT * FROM FairyCompanion;
        `;
        pool.query(SQLSTATMENT, callback);
    },

    // GET fairy companion by id
    selectFairyCompanionById : (data, callback) => {
        const SQLSTATMENT = `
            SELECT * FROM FairyCompanion 
            WHERE fairy_companion_id = ?;
        `;
        const VALUES = [data.fairy_companion_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // POST new fairy companion
    insertNewFairyCompanion : (data, callback) => {
        const SQLSTATMENT = `
            INSERT INTO FairyCompanion (fairy_companion_name, fairy_companion_hair_color, fairy_companion_eye_color, fairy_companion_powers)
            VALUES (?, ?, ?, ?);
        `;
        const VALUES = [data.fairy_companion_name, data.fairy_companion_hair_color, data.fairy_companion_eye_color, data.fairy_companion_powers];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // PUT fairy companion by id
    updateFairyCompanionById : (data, callback) => {
        const SQLSTATMENT = `
            UPDATE FairyCompanion 
            SET fairy_companion_hair_color = ?, fairy_companion_eye_color = ?
            WHERE fairy_companion_id = ?;
        `;
        const VALUES = [data.fairy_companion_hair_color, data.fairy_companion_eye_color, data.fairy_companion_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // DELETE fairy companion by id
    removeFairyCompanionById : (data, callback) => {
        const SQLSTATMENT = `
            DELETE FROM FairyCompanion 
            WHERE fairy_companion_id = ?;
        `;
        const VALUES = [data.fairy_companion_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    }
}