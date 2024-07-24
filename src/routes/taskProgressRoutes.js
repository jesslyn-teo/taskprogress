//////////////////////////////////////////////////////
// REQUIRED MODULES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();
const taskProgressController = require('../controllers/taskProgressController');

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.post('/', taskProgressController.createTaskProgress); // endpoint 11

router.get('/:progress_id', taskProgressController.readTaskProgressById); // endpoint 12
router.get('/user/:user_id', taskProgressController.readTaskProgressByUserId); // EXTRA ENDPOINT
router.get('/', taskProgressController.readAllTaskProgress); // EXTRA ENDPOINT

router.put('/:progress_id', taskProgressController.updateTaskProgressById); // endpoint 13 

router.delete('/:progress_id', taskProgressController.deleteTaskProgressById); // endpoint 14

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;