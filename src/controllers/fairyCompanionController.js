const fairyCompanionModel = require("../models/fairyCompanionModel.js");

module.exports = {

    // middleware
    readFairyCompanionExists : (req, res, next) => {
        const { fairy_companion_name } = req.body;

        const data = {
            fairy_companion_name: fairy_companion_name
        }
        
        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end();
            }
            else {
                if (results && results.length > 0) { // if results is null or undefined it would mean that it already exists
                    res.status(409).json({
                        message : `${fairy_companion_name}'s name already exists. Please try another name for your fairy companion.`
                    })
                } else {
                    next(); // continues to createNewStudent    
                }
            }
        }

        fairyCompanionModel.checkFairyCompanionName(data, callback);
    },

    // GET all fairy companions
    readAllFairyCompanion : (req, res, next) => {
        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error readAllFairyCompanion: ${error}`);
                res.status(500).json(error);
            } else {
                res.status(200).json(results);
            }
        }

        fairyCompanionModel.selectAllFairyCompanion(callback);
    },

    // GET fairy companion by id
    readFairyCompanionById : (req, res, next) => {
        const { fairy_companion_id } = req.params;

        const data = {
            fairy_companion_id: fairy_companion_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error readFairyCompanionById: ${error}`);
                res.status(500).json(error);
            } else {
                if(results.length == 0) {
                    res.status(404).json({
                        message: `The fairy_companion_id ${data.fairy_companion_id} not found.`
                    });
                } else {
                    res.status(200).json(results);
                }
            }
        }

        fairyCompanionModel.selectFairyCompanionById(data, callback);
    },

    // POST new fairy companion
    createNewFairyCompanion : (req, res, next) => {
        const { fairy_companion_name, fairy_companion_hair_color, fairy_companion_eye_color, fairy_companion_powers } = req.body;

        const data = {
            fairy_companion_name: fairy_companion_name,
            fairy_companion_hair_color: fairy_companion_hair_color,
            fairy_companion_eye_color: fairy_companion_eye_color,
            fairy_companion_powers: fairy_companion_powers
        }

        if(!fairy_companion_name || !fairy_companion_hair_color || !fairy_companion_eye_color || !fairy_companion_powers) {
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error createNewFairyCompanion: ${error}`);
                res.status(500).json(error);
            } else {
                res.status(201).json({
                    message: `Successfully created new fairy companion ${data.fairy_companion_name}.`,
                    insertId: results.insertId
                });
            }
        }

        fairyCompanionModel.insertNewFairyCompanion(data, callback);
    },

    // PUT fairy companion by id to change hair or eye color
    updateFairyCompanionById : (req, res, next) => {
        const { fairy_companion_id } = req.params;
        const { fairy_companion_hair_color, fairy_companion_eye_color } = req.body;

        const data = {
            fairy_companion_id: fairy_companion_id,
            fairy_companion_hair_color: fairy_companion_hair_color,
            fairy_companion_eye_color: fairy_companion_eye_color
        }

        if(!fairy_companion_hair_color || !fairy_companion_eye_color) {
            res.status(400).json({
                message: `Missing required data.`
            });
            return;
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error updateFairyCompanionById: ${error}`);
                res.status(500).json(error);
            } else {
                if(results.affectedRows == 0) {
                    res.status(404).json({
                        message: `The fairy_companion_id ${data.fairy_companion_id} not found.`
                    });
                } else {
                    res.status(200).json({
                        message: `Successfully updated fairy_companion_id ${data.fairy_companion_id}.`
                    });
                }
            }
        }

        fairyCompanionModel.updateFairyCompanionById(data, callback);
    },

    // DELETE fairy companion by id
    deleteFairyCompanionById : (req, res, next) => {
        const { fairy_companion_id } = req.params;

        const data = {
            fairy_companion_id: fairy_companion_id
        };

        const callback = (error, results, fields) => {
            if (error) {
                console.error(`Error deleteFairyCompanionById: ${error}`);
                res.status(500).json(error);
            } else {
                if(results.affectedRows == 0) {
                    res.status(404).json({
                        message: `The fairy_companion_id ${data.fairy_companion_id} not found.`
                    });
                } else {
                    res.status(200).json({
                        message: `Successfully deleted fairy_companion_id ${data.fairy_companion_id}.`
                    });
                }
            }
        }

        fairyCompanionModel.removeFairyCompanionById(data, callback);
    }
}