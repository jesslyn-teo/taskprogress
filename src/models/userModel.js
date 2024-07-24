const pool = require("../services/db");

module.exports = {

    // used for log in 
    selectByUsernameAndPassword : (data, callback) => {
        const SQLSTATMENT = `
        SELECT user_id, username, password FROM User
        WHERE username = ?;
        `;
        const VALUES = [data.username];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    /// checks if the username or already exists
    selectByUsernameOrEmail: (data, callback) => {
        const SQLSTATEMENT = `
        SELECT user_id FROM User
        WHERE username = ? OR email = ?;`;
        const VALUES = [data.username, data.email];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

    // POST /users (PART I) AND  Question 4 - PUT /users/{user_id} (PART I)
    checkEmail: (data, callback) => {
        const SQLSTATMENT = `
            SELECT * FROM User
            WHERE email = ?;
        `;
        const VALUES = [data.email];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // POST /users (PART II)
    insertSingle: (data, callback) => {
        const SQLSTATMENT = `
        INSERT INTO User (username, email, password)
        VALUES (?, ?, ?);
        `;
        const VALUES = [data.username, data.email, data.password];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // GET /users
    selectAll: (callback) => {
        const SQLSTATMENT = `
            SELECT * FROM User;
        `;
        pool.query(SQLSTATMENT, callback);
    },

    // GET /users/{user_id} 
    selectById: (data, callback) => {
        const SQLSTATMENT = `
        SELECT User.user_id, User.username, User.email, COALESCE(SUM(Task.points), 0) AS total_points
        FROM User
        LEFT JOIN TaskProgress ON User.user_id = TaskProgress.user_id
        LEFT JOIN Task ON TaskProgress.task_id = Task.task_id
        WHERE User.user_id = ?
        GROUP BY User.user_id, User.username, User.email;        
        `;
        const VALUES = [data.user_id];
        pool.query(SQLSTATMENT, VALUES, callback);
        // joining the User table with the TaskProgress table based on user_id 
        // joining the Task table to get the points with TaskProgress table
        // sums up the points using SUM()
        // COALESCE handles cases where there are no points
    },

    // PUT /users/{user_id}
    updateSingle: (data, callback) => {
        const SQLSTATMENT = `
        UPDATE User 
        SET username = ?, email = ?, password = ?
        WHERE user_id = ?;
        `;
        const VALUES = [data.username, data.email, data.password, data.user_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    // DELETE /users/{user_id} 
    deleteSingle: (data, callback) => {
        const SQLSTATMENT = `
        DELETE FROM User WHERE user_id = ?;
        `;
        const VALUES = [data.user_id];
        pool.query(SQLSTATMENT, VALUES, callback);
    }
}