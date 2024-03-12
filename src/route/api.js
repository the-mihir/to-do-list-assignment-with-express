const express = require("express");
const userController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");



const router = express.Router();




router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/profileDetails", AuthMiddleware, userController.profileDetails);
router.post("/profileUpdate", AuthMiddleware, userController.profileUpdate);
router.get("/verifyEmail/:email", userController.verifyEmail);
router.get("/verifyOTP/:email/:otp",userController.verifyOTP);
router.get("/passwordReset/:email/:otp/:password",userController.passwordReset);


module.exports = router;