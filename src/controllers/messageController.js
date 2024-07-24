const messageModel = require("../models/messageModel.js");

module.exports = {

    // creating a new global message
    createMessage: (req, res, next) => {
        console.log(`New message created`);
        if (req.body.message_text == undefined || req.body.message_text == "") {
            res.status(400).send(`Error: message_text is undefined`);
            return;
        }
        else if (req.body.user_id == undefined) {
            res.status(400).send(`Error: user_id is undefined`);
            return;
        }

        const data = {
            user_id: req.body.user_id,
            message_text: req.body.message_text
        }

        console.log(`data`, data);

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error in createMessage: ${error}. \nPlease try again later.`);
                res.status(500).json(error);
            } else {
                res.status(201).json(results);
            }
        }

        messageModel.insertSingle(data, callback);
    },

    // displaying the messages by specific user
    readMessageById: (req, res, next) => {
        const data = {
            id: req.params.id
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error in readMessagebyId: ${error}. \nPlease try again later.`);
                res.status(500).json(error);
            } else {
                if (results.length == 0) {
                    res.status(404).json({
                        message: `Message not found`
                    });
                }
                else res.status(200).json(results[0]);
            }
        }

        messageModel.selectById(data, callback);
    },

    // displaying all the messages
    readAllMessage: (req, res, next) => {
        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error in readAllMessage: ${error}. \nPlease try again later.`);
                res.status(500).json(error);
            } else {
                const newOrder = results.reverse();
                res.status(200).json(newOrder);
            }
        }

        messageModel.selectAll(callback);
    },

    // updating the message by specific user
    updateMessageById: (req, res, next) => {
        if (req.params.id == undefined) {
            res.status(400).send(`Error: id is undefined`);
            return;
        }
        else if (req.body.message_text == undefined || req.body.message_text == "") {
            res.status(400).send(`Error: message_text is undefined or empty`);
            return;
        }
        else if (req.body.user_id == undefined) {
            res.status(400).send(`Error: userId is undefined`);
            return;
        }

        const data = {
            id: req.params.id,
            user_id: req.body.user_id,
            message_text: req.body.message_text
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error in updateMessageById: ${error}. \nPlease try again later.`);
                res.status(500).json(error);
            } else {
                res.status(200).json(results);
            }
        }

        messageModel.updateById(data, callback);
    },

    // deleting the message by specific user
    deleteMessageById: (req, res, next) => {
        const data = {
            id: req.params.id
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error in deleteMessageById: ${error}. \nPlease try again later.`);
                res.status(500).json(error);
            } else {
                res.status(200).json(results);
            }
        }

        messageModel.deleteById(data, callback);
    }
}