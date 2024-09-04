const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();
router
    .route('/total-stock-value')
    .get(productController.totalStockValue);

router
    .route('/total-stock-value-by-manufacturer')
    .get(productController.totalStockValueByManufacturer);

router
    .route('/low-stock')
    .get(productController.lowStock);

router
    .route('/critical-stock')
    .get(productController.criticalStock);

router
    .route('/manufacturers')
    .get(productController.getManufacturers);

router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router
    .route('/:id')
    .get(productController.getProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);


module.exports = router;
