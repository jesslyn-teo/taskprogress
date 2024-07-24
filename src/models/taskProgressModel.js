const pool = require("../services/db");

module.exports = {

    // POST /task_progress 
    insertSingleTaskProgress: (data, callback) => {
        const SQLSTATMENT = `
        INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
        VALUES (?, ?, ?, ?);
        `;
        const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // GET /task_progress/{progress_id}
    selectTaskProgressById : (data, callback) => {
        const SQLSTATMENT = `
            SELECT * FROM TaskProgress
            WHERE progress_id = ?;
        `;
        const VALUES = [data.progress_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // PUT /task_progress/{progress_id} 
    updateSingleTaskProgress: (data, callback) => {
        const SQLSTATMENT = `
            UPDATE TaskProgress 
            SET notes = ?
            WHERE progress_id = ?;
        `;
        const VALUES = [data.notes, data.progress_id, data.progress_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // DELETE /task_progress/{progress_id}
    deleteSingleTaskProgress : (data, callback) => {
        const SQLSTATMENT = `
        DELETE FROM TaskProgress WHERE progress_id = ?;
        `;
        const VALUES = [data.progress_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // GET /task_progress
    selectAllTaskProgress : (callback) => {
        const SQLSTATMENT = `
            SELECT * FROM TaskProgress;
        `;
        pool.query(SQLSTATMENT, callback);
    },

    // GET /task_progress/{user_id}
    selectTaskProgressByUserId : (data, callback) => {
        const SQLSTATMENT = `
            SELECT * FROM TaskProgress
            WHERE user_id = ?;
        `;
        const VALUES = [data.user_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    }
}