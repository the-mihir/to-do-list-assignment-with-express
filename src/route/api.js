const express = require("express");
const userController = require("../controller/UserController");
const TaskController = require("../controller/TaskController");
const AuthMiddleware = require("../middleware/AuthMiddleware");



const router = express.Router();



// User Controller related PATH
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/profileDetails", AuthMiddleware, userController.profileDetails);
router.post("/profileUpdate", AuthMiddleware, userController.profileUpdate);
router.get("/verifyEmail/:email", userController.verifyEmail);
router.get("/verifyOTP/:email/:otp",userController.verifyOTP);
router.get("/passwordReset/:email/:otp/:password",userController.passwordReset);

// Task Controller Related PATH
router.post("/task/addTask/", AuthMiddleware,TaskController .addTask);
router.get("/task/readTask",AuthMiddleware,TaskController.getTask);
router.post("/task/updateTask/:id", AuthMiddleware,TaskController .updateTask);
router.get("/task/deleteTask/:id",AuthMiddleware,TaskController.deleteTask);



module.exports = router;