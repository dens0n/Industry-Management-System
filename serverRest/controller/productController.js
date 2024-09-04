// controllers/productController.js
const Product = require('../db/models/imsModel');

// Retrieve all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            status: "success",
            results: products.length,
            data: { products },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error retrieving products",
        });
    }
};

// Retrieve a single product by ID
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ status: "fail", message: "Product not found" });
        res.status(200).json({
            status: "success",
            data: { product },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error retrieving product",
        });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            status: "success",
            data: { newProduct },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error creating product",
        });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ status: "fail", message: "Product not found" });
        res.status(200).json({
            status: "success",
            data: { product },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error updating product",
        });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ status: "fail", message: "Product not found" });
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error deleting product",
        });
    }
};

// Summarize the total value of all products in stock
exports.totalStockValue = async (req, res) => {
    try {
        const products = await Product.find({});
        const totalValue = products.reduce((sum, product) => sum + product.price * product.amountInStock, 0);
        res.status(200).json({
            status: "success",
            totalStockValue: totalValue,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error calculating total stock value",
        });
    }
};

// Summarize the total value of products in stock per manufacturer
exports.totalStockValueByManufacturer = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $group: {
                _id: "$manufacturer.name",
                totalValue: { $sum: { $multiply: ["$price", "$amountInStock"] } }
            }}
        ]);
        res.status(200).json({
            status: "success",
            data: { products },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error calculating stock value by manufacturer",
        });
    }
};

// Retrieve a list of all products with less than 10 units in stock
exports.lowStock = async (req, res) => {
    try {
        const products = await Product.find({ amountInStock: { $lt: 10 } });
        res.status(200).json({
            status: "success",
            results: products.length,
            data: { products },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error retrieving low stock products",
        });
    }
};

// Retrieve a compact list of products with less than 5 items in stock
exports.criticalStock = async (req, res) => {
    try {
        const products = await Product.find({ amountInStock: { $lt: 5 } }, 'name manufacturer.contact');
        res.status(200).json({
            status: "success",
            results: products.length,
            data: { products },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error retrieving critical stock products",
        });
    }
};

// Retrieve a list of all manufacturers
exports.getManufacturers = async (req, res) => {
    try {
        const products = await Product.distinct('manufacturer.name');
        res.status(200).json({
            status: "success",
            data: { manufacturers: products },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error retrieving manufacturers",
        });
    }
};
