const express = require("express");
const { createCategory, updateCategory, getCategories } = require("../controllers/category");
const { verifyToken, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/",verifyToken,isAdmin,createCategory)
router.get("/",getCategories)
router.patch("/:id",verifyToken,isAdmin,updateCategory)

module.exports = router;
