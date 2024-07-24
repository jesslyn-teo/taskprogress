const taskModel = require("../models/taskModel.js");

module.exports = {

    // POST /tasks
    createNewTask : (req, res, next) => {
        const { title, description, points } = req.body;

        if (!title || !description || !points) { // destructuring the request body
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const data = {
            title: title,
            description: description,
            points: points
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end();
            } else {
                res.status(201).json({
                    task_id: `${results.insertId}`,
                    title: `${data.title}`,
                    description: `${data.description}`,
                    points: `${data.points}`
                });
            }
        }

        taskModel.insertSingleTask(data, callback);
    },

    // GET /tasks
    readAllTask : (req, res, next) => {
        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end();
            }
            else res.status(200).json(results);
        }

        taskModel.selectAllTask(callback);
    },

    // GET /tasks/{task_id}
    readTaskById : (req, res, next) => {
        const data = {
            task_id: req.params.task_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end();
            }
            else {
                if (results.length == 0) {
                    res.status(404).json({
                        message: `task_id not found.`
                    })
                } else {
                    res.status(200).json(results[0]);
                }
            }
        }

        taskModel.selectTaskById(data, callback);
    },

    // PUT /tasks/{task_id}
    updateTaskById : (req, res, next) => {
        const { title, description, points } = req.body;

        if (!title || !description || !points) { // destructuring the request body
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const data = {
            task_id: req.params.task_id,
            title: title,
            description: description,
            points: points
        }

        const callback = (error, results, fields) => {  // HAVE NOT DONE DUPLICATE EMAIL
            if (error) {
                res.status(500).end(); // no output 
            } else if (results.affectedRows == 0) {
                res.status(404).json({
                    message: `task_id not found`
                });
            } else {
                res.status(204).end();
            }
        }

        taskModel.updateSingleTask(data, callback);
    },

    // DELETE /tasks/{task_id}
    deleteTaskById : (req, res, next) => {
        const data = {
            task_id: req.params.task_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end(); // no output 
            } else if (results.affectedRows == 0) {
                res.status(404).json({
                    message: `task_id not found`
                });
            } else {
                res.status(204).json(); // no output 
            }
        }

        taskModel.deleteSingleTask(data, callback);
    }
}

