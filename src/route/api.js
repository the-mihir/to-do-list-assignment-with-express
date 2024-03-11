const express = require("express");
const userController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");



const router = express.Router();




router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/profileDetails", AuthMiddleware, userController.profileDetails);
router.post("/profileUpdate", AuthMiddleware, userController.profileUpdate);


module.exports = router;