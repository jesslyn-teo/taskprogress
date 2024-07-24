//////////////////////////////////////////////////////
// REQUIRED MODULES
//////////////////////////////////////////////////////
const express = require('express'); 

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router(); 

//////////////////////////////////////////////////////
// USED IN REGISTRATION OR SIGN UP PAGE
//////////////////////////////////////////////////////
const jwtMiddleware = require('../middlewares/jwtMiddleware.js');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware.js');
const exampleController = require('../controllers/exampleController.js');
const userController = require('../controllers/userController.js');

//////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////
const messageRoutes = require('./messageRoutes');
router.use("/message", messageRoutes);

const taskProgressRoutes = require('./taskProgressRoutes.js');
router.use("/task_progress", taskProgressRoutes);

const taskRoutes = require('./taskRoutes.js');
router.use("/tasks", taskRoutes);

const userRoutes = require("./userRoutes.js");
router.use("/users", userRoutes);

const fairyCompanionRoutes = require('./fairyCompanionRoutes.js');
router.use("/fairy_companion", fairyCompanionRoutes);

//////////////////////////////////////////////////////
// DEFINES ROUTES FOR JWT & BCRYPT
//////////////////////////////////////////////////////
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.post("/jwt/generate", exampleController.preTokenGenerate, jwtMiddleware.generateToken, exampleController.beforeSendToken, jwtMiddleware.sendToken);
router.get("/jwt/verify", jwtMiddleware.verifyToken, exampleController.showTokenVerified);
router.post("/bcrypt/compare", exampleController.preCompare, bcryptMiddleware.comparePassword, exampleController.showCompareSuccess);
router.post("/bcrypt/hash", bcryptMiddleware.hashPassword, exampleController.showHashing);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;