const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {verifyToken,isAdmin} = require("../middleware/auth")


router.post("/", userController.addUser);
router.post("/login", userController.login);

//protected route:
router.get("/user-auth", verifyToken, (req,res)=>{
    res.status(200).send({ok: true})
})


module.exports = router;
