const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();

router.route("/total-stock-value").get(productController.totalStockValue);

router
    .route("/")
    .post(productController.createProduct)
    .get(productController.getAllProducts);

router
    .route("/:id")
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;
