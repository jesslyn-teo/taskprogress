const taskProgressModel = require("../models/taskProgressModel.js");

module.exports = {

    // POST /task_progress 
    createTaskProgress: (req, res, next) => {
        const { user_id, task_id, completion_date, notes } = req.body;

        if (!completion_date) { 
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const data = {
            user_id: user_id,
            task_id: task_id,
            completion_date: completion_date,
            notes: notes
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(404).json({
                    message: `user_id or task_id does not exist.`
                });
            } else { {
                    res.status(201).json({
                        progress_id: `${results.insertId}`,
                        user_id: `${data.user_id}`,
                        task_id: `${data.task_id}`,
                        completion_date: `${data.completion_date}`,
                        notes: `${data.notes}`
                    });
                }
            }
        }

        taskProgressModel.insertSingleTaskProgress(data, callback);
    },

    // GET /task_progress/{progress_id}
    readTaskProgressById: (req, res, next) => {
        console.log(`A readTaskProgressById was made`)
        const data = {
            progress_id: req.params.progress_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end();
            }
            else {
                if (results.length == 0) {
                    res.status(404).json({
                        message: `progress_id not found.`
                    });
                } else {
                    res.status(200).json(results[0]);
                }
            }
        }

        taskProgressModel.selectTaskProgressById(data, callback);
    },

    // PUT /task_progress/{progress_id} 
    updateTaskProgressById: (req, res, next) => {
        console.log(`a updateTaskProgressById was made`)
        const { notes } = req.body;
        const progress_id = req.params.progress_id;

        if (!notes) { 
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const data = { 
            progress_id: progress_id,
            notes: notes
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end(); // no output 
            } else if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "progress_id not found."
                });
            } else {
                res.status(200).json(results[1]); 
            }
        }

        taskProgressModel.updateSingleTaskProgress(data, callback);
    },

    // DELETE /task_progress/{progress_id}
    deleteTaskProgressById: (req, res, next) => {
        const data = {
            progress_id: req.params.progress_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end(); // no output 
            } else if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "progress_id not found"
                });
            } else {
                res.status(204).json(); // no output 
            }
        }

        taskProgressModel.deleteSingleTaskProgress(data, callback);
    },

    // GET /task_progress
    readAllTaskProgress: (req, res, next) => {
        console.log(`A readAllTaskProgress was made`);

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end();
            }
            else {
                res.status(200).json(results);
            }
        }
        taskProgressModel.selectAllTaskProgress(callback);
    },

    // GET /task_progress/{user_id}
    readTaskProgressByUserId : (req, res, next) => {
        console.log(`A readTaskProgressByUserId was made`)
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
                        message: `user_id not found.`
                    });
                } else {
                    res.status(200).json(results);
                }
            }
        }

        taskProgressModel.selectTaskProgressByUserId(data, callback);
    }

}