// Module
const express = require("express");

// Router function
const router = express.Router();

//Middleware files
const auth = require("../middleware/authorize");
const multer = require("../middleware/multerConfig");

//Controllers
const sauceCtrl = require("../controllers/sauceController");

//Endpoints
router.get("/", auth, sauceCtrl.getSauces);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;
