//////////////////////////////////////////////////////
// REQUIRED MODULES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();
const fairyCompanionController = require('../controllers/fairyCompanionController');

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.get('/:fairy_companion_id', fairyCompanionController.readFairyCompanionById); // endpoint 15
router.get('/', fairyCompanionController.readAllFairyCompanion); // endpoint 16

router.post('/', fairyCompanionController.createNewFairyCompanion); // endpoint 17

router.put('/:fairy_companion_id', fairyCompanionController.readFairyCompanionExists, fairyCompanionController.updateFairyCompanionById); // endpoint 18

router.delete('/:fairy_companion_id', fairyCompanionController.deleteFairyCompanionById); // endpoint 19

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;