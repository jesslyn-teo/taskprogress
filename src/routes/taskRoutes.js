//////////////////////////////////////////////////////
// REQUIRED MODULES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();
const taskController = require('../controllers/taskController.js');

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.post('/', taskController.createNewTask); // endpoint 06 

router.get('/:task_id', taskController.readTaskById) // endpoint 08
router.get('/', taskController.readAllTask); // endpoint 07

router.put('/:task_id', taskController.updateTaskById); // endpoint 09

router.delete('/:task_id', taskController.deleteTaskById); // endpoint 10

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;