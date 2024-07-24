const pool = require("../services/db");

module.exports = {

    // POST /tasks
    insertSingleTask: (data, callback) => {
        const SQLSTATMENT = `
        INSERT INTO Task (title, description, points)
        VALUES (?, ?, ?);
        `;
        const VALUES = [data.title, data.description, data.points];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // GET /tasks
    selectAllTask : (callback) => {
        const SQLSTATMENT = `
            SELECT * FROM Task;
        `;
        pool.query(SQLSTATMENT, callback);
    },

    // GET /tasks/{task_id}
    selectTaskById : (data, callback) => {
        const SQLSTATMENT = `
            SELECT * FROM Task
            WHERE task_id = ?;
        `;
        const VALUES = [data.task_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // PUT /tasks/{task_id}
    updateSingleTask : (data, callback) => {
        const SQLSTATMENT = `
        UPDATE Task 
        SET title = ?, description = ?, points = ?
        WHERE task_id = ?;
        `; 
        const VALUES = [data.title, data.description, data.points, data.task_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // DELETE /tasks/{task_id}
    deleteSingleTask : (data, callback) => {
        const SQLSTATMENT = `
        DELETE FROM Task WHERE task_id = ?;
        `;
        const VALUES = [data.task_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    }
}

