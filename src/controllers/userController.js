const userModel = require("../models/userModel.js");

module.exports = {

    // used for log in 
    login: (req, res, next) => {
        console.log(`A login was made`);
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                message: `Missing required data.`
            });
            return; }
        // } else if (password !== res.locals.hash) {
        //     res.status(401).json({
        //         message: `username or password is incorrect. Please try again.`});
        // }

        const data = {
            username: username,
            password: password
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error login: ${error}. \nPlease try again later.`);
                res.status(500).json(error);
            } else if (results.length == 1) {
                res.locals.user_id = results[0].user_id;
                res.locals.hash = results[0].password;
                next();
            } else if (results.length > 1) {
                res.status(409).json({ message: `Duplicate username for ${results.username}. Please try another username.` })
            } else {
                res.status(404).json({ message: `Username ${data.username} does not exist. Please try another username.` })
            }
        }

        userModel.selectByUsernameAndPassword(data, callback);
    },

    // used for registeration
    register: (req, res, next) => {
        console.log(`A registration was made`);
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const data = {
            username: username,
            email: email,
            password: res.locals.hash
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error register: ${error}. \nPlease try again later.`);
                res.status(500).json(error);
            } else {
                res.locals.message = `User ${data.username} successfully created.`;
                next();
            }
        }

        userModel.insertSingle(data, callback);
    },

    // checks if the username or already exists
    checkUsernameOrEmailExist: (req, res, next) => {
        const { username, email } = req.body;

        const data = {
            username: username,
            email: email
        }

        if (!username || !email) {
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error checkUsernameOrEmailExist: ${error}. \nPlease try again later.`);
                res.status(500).json(error);
            } else {
                if (results.length > 0) {
                    res.status(409).json({
                        message: `Username or Email already exists. Please try another username or email.`
                    });
                } else {
                    next();
                }
            }
        }

        userModel.selectByUsernameOrEmail(data, callback);
    },

    // POST /users (PART I) AND PUT /users/{user_id} (PART I)
    readEmail: (req, res, next) => {
        const { email } = req.body;

        const data = {
            email: email
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end();
            }
            else {
                if (results && results.length > 0) { // if results is null or undefined it would mean that it already exists
                    res.status(409).json({
                        message: `${email} belongs to another user. Please try another email.`
                    })
                } else {
                    next(); // continues to createNewUser or updateUserById
                }
            }
        }

        userModel.checkEmail(data, callback);
    },

    // POST /users (PART II)
    createNewUser: (req, res, next) => { // does not accept null or undefined 
        const { username, email, password } = req.body;

        if (!username || !email || !password) { // destructuring the request body
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const data = {
            username: username,
            email: email,
            password: password
        }

        const callback = (error, results, fields) => {
            if (error) { //if the email already exists
                if (results[0].email == data.email) {
                    res.status(409).json({
                        message: `${data.email} belongs to another user. Please try another email.`
                    })
                }
            } else {
                res.status(201).json({
                    user_id: `${results.insertId}`,
                    username: `${data.username}`,
                    email: `${data.email}`

                });
            }
        }

        userModel.insertSingle(data, callback);
    },

    // GET /users
    readAllUser: (req, res, next) => {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllUser:", error);
                res.status(500).json(error);
            } else {
                res.status(200).json(results);
            }
        }
        userModel.selectAll(callback);
    },

    // GET /users/{user_id} 
    readUserById: (req, res, next) => {
        const data = {
            user_id: req.params.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end();
            }
            else {
                if (results.length == 0) {
                    res.status(404).json({
                        message: `${data.user_id} does not exist. Please try another user_id.`
                    })
                } else {
                    res.status(200).json(results[0]);
                }
            }
        }

        userModel.selectById(data, callback);
    },

    // PUT /users/{user_id} (PART II)
    updateUserById: (req, res, next) => {
        console.log(`A user was updated`)
        const { username, email, password } = req.body;

        const data = {
            user_id: req.params.user_id,
            username: username,
            email: email,
            password: password
        }

        if (!username) { // destructuring the request body
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end(); // no output 
            } else if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "user_id not found."
                });
            } else {
                res.status(200).json({
                    user_id: `${data.user_id}`,
                    username: `${data.username}`,
                    email: `${data.email}`
                });
            }
        }
        userModel.updateSingle(data, callback);
    },

    // DELETE /users/{user_id}
    deleteUserById: (req, res, next) => {
        const data = {
            user_id: req.params.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end(); // no output 
            } else if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "user_id not found"
                });
            } else {
                res.status(204).json(); // no output 
            }
        }

        userModel.deleteSingle(data, callback);
    },
}