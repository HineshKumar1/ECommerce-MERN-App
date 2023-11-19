const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {verifyToken,isAdmin} = require("../middleware/auth")


router.post("/", userController.addUser);
router.post("/login", userController.login);

module.exports = router;
