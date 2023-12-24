const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const formidableMiddleware = require("express-formidable");
const productController = require("../controllers/product");

router.post(
  "/",
  verifyToken,
  isAdmin,
  formidableMiddleware(),
  productController.createProduct
);

router.get("/",productController.getProduct);
router.get("/:slug",productController.getSingleProduct);

router.get("/image/:pid",productController.getProductImage);
router.delete("/:id",verifyToken,isAdmin,productController.deleteProduct)

module.exports = router;
