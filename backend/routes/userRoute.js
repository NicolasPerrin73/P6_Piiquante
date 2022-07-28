//Module
const express = require("express");

//Router function
const router = express.Router();

//Controllers
const userCtrl = require("../controllers/userController");

//Endpoints
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
