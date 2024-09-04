// controllers/productController.js
const Product = require("../models/imsModel");

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

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res
                .status(404)
                .json({ status: "fail", message: "Product not found" });
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

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product)
            return res
                .status(404)
                .json({ status: "fail", message: "Product not found" });
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

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product)
            return res
                .status(404)
                .json({ status: "fail", message: "Product not found" });
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

exports.totalStockValue = async (req, res) => {
    try {
        const products = await Product.find({});
        const totalValue = products.reduce(
            (sum, product) => sum + product.price * product.amountInStock,
            0
        );
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

exports.totalStockValueByManufacturer = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $group: {
                    _id: "$manufacturer.name",
                    totalValue: {
                        $sum: { $multiply: ["$price", "$amountInStock"] },
                    },
                },
            },
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

exports.criticalStock = async (req, res) => {
    try {
        const products = await Product.find(
            { amountInStock: { $lt: 5 } },
            "name manufacturer.contact"
        );
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

exports.getManufacturers = async (req, res) => {
    try {
        const products = await Product.distinct("manufacturer.name");
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
