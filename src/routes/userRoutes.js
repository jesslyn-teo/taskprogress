//////////////////////////////////////////////////////
// REQUIRED MODULES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();
const userController = require('../controllers/userController');

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.post('/', userController.readEmail, userController.createNewUser); // endpoint 01 

router.get('/:user_id', userController.readUserById); // endpoint 03 
router.get('/', userController.readAllUser); // endpoint 02 

router.put('/:user_id', userController.readEmail, userController.updateUserById); // endpoint 04

router.delete('/:user_id', userController.deleteUserById); // endpoint 05 

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;