const express = require("express");

const productController = require("../controller/product.controller");
const upload = require("../utils/multerUpload");
const router = express.Router();

router.get("/products", productController.getProducts);
router.post("/products", upload.single("image"), productController.addProduct);

router.get("/products/:id", productController.getProductByID);
router.delete("/products/:id", productController.deleteProduct);
router.put(
  "/products/:id",
  upload.single("image"),
  productController.updateProduct
);

module.exports = router;
