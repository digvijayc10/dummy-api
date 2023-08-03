const express = require("express");

const productController = require("../controller/product.controller");

const router = express.Router();

router.get("/products", productController.getProducts);
router.post("/products", productController.addProduct);

router.get("/products/:id", productController.getProductByID);
router.delete("/products/:id", productController.deleteProduct);
router.put("/products/:id", productController.updateProduct);

module.exports = router;
