# TaskProgress
This showcases a full-stack development of a comprehensive frontend and backend application. It prioritizes user-friendly features, secure authentication, and messaging. The extended functionality includes quests, rewards, and inventory, enhancing user interaction. The backend is strengthened to support these features, ensuring a cohesive user experience.

## Table of Contents 
1. Introduction
2. Installations
3. Folder Structure
4. Instructions
5. Things to Note

# Introduction
Hi! This is one of my first ever full-stack developments integrated with a back-end server using MySQL workbench for one of my first year modules Back-End Development. The development leveraged key technologies including JavaScript, HTML, CSS, and various backend frameworks, focusing on modular design, code quality, and efficient error handling. The application demonstrates the integration of modern best practices and industry standards to deliver a functional and user-friendly system.

# Installations
Before running the tests, ensure that the following dependencies are installed:
- Node.js
- npm (Node Package Manager)
- Execute the command 'npm i express mysql2 dotenv jsonwebtoken bcrypt nodemon' in the terminal to install necessary packages before running the program
- Create a .env file with the following and fill up accordingly (Note that I used MySQL workbench for this project):
  DB_HOST= your-host 
  DB_USER = your-user
  DB_PASSWORD = your-password
  DB_DATABASE = gsm (or the name you would like for this database)

  JWT_SECRET_KEY = your-secret-key
  JWT_EXPIRES_IN = your-jwt-expiry
  JWT_ALGORITHM = your-jwt-algorithm

# Folder Structure 
taskprogress
- node_modules
- public
  -- css
    -- layout.css
  -- image
    -- background.jpg
    -- fairy.png
    -- profile.png 
  -- javascript
    -- layout.js
    -- profile.js
    -- getCurrentURL.js
    -- loginUser.js
    -- message.js
    -- navBar.js
    -- queryCmds.js
    -- registerUser,js
    -- fairyCompanions.js
    -- task.js
    -- users.js
  -- fairyCompanion.html
  -- index.html
  -- login.html
  -- message.html
  -- newFairyCompanion.html
  -- newMessage.html
  -- newTask.html
  -- newTaskProgress.html
  -- profile.html
  -- register.html
  -- singleFairyCompanion.html
  -- task.html
  -- taskProgress.html
  -- user.html
- sql_database
  -- gsm_db.sql
  -- ma_db.sql
- src 
  -- configs 
    -- createSchema.js
    -- initTables.js
  -- controllers 
    -- exampleController.js
    -- messageController.js
    -- taskController.js
    -- taskProgressController.js
    -- userController.js 
    -- fairyCompanionController.js
  -- middlewares 
    -- bcryptMiddleware.js
    -- jwtMiddleware.js
  -- models
    -- messageModel.js
    -- taskModel.js 
    -- taskProgressModel.js 
    -- userModel.js
    -- fairyCompanionModel.js
  -- routes
    -- mainRoutes.js
    -- messageRoutes.js
    -- taskRoutes.js 
    -- taskProgressRoutes.js 
    -- userRoutes.js 
    -- fairyCompanionRoutes.js 
  -- services 
    -- db.js
- app.js
- .env
- .gitignore
- index.js
- package-lock.json
- package.json 
- README.md

# Instructions
1. Adjust the user and password settings in the .env file to match MySQL workbench configurations.
2. Execute 'npm run init_tables' to initialize the SQL database with a fresh set of data, free from any CRUD operations.
3. Execute 'npm run dev' to start the server, enabling verification of various endpoints in POSTMAN.

# Things to Note
1. Message Editing and Deletion:
- Users are granted the capability to modify or remove messages, even if they are not the originating creators. This feature enhances user flexibility and control over the content they contribute to the platform, promoting a more inclusive and user-friendly experience.
2. Personal Information Editing Restrictions:
- As part of our commitment to user data security and privacy, users are limited to editing only their individual personal information. This includes details such as username, email, and password. These restrictions ensure that sensitive information remains under the exclusive control of the respective account owner, reinforcing our dedication to maintaining a secure user environment.
3. Additional Endpoints for Task Progress:
- To enrich the functionality of our platform, we have introduced two new endpoints: readAllTaskProgress and readTaskProgressByUserId. These endpoints empower users with enhanced access to task progress data, facilitating a more comprehensive overview of their activities and achievements on the platform. This expansion aligns with our ongoing efforts to provide users with robust features and tools for an enriched user experience. 

  
