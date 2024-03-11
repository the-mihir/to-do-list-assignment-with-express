const express = require("express");
const userController = require("../controller/UserController");



const router = express.Router();




router.post("/registration", userController.registration);
router.post("/login", userController.login);

module.exports = router;