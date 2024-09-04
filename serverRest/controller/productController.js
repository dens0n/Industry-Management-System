const { Product, Contact } = require("../db/models/imsModel");

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
            message: "invalid data set",
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(201).json({
            status: "success",
            results: product.length,
            data: { product },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "invalid data set",
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(201).json({
            status: "success",
            data: { product },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Could not find product",
        });
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(201).json({
            status: "success",
            data: { product },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Could not find product",
        });
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            product,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Could not find product",
        });
    }
};

//Summarize the total value of all products in stock

exports.totalStockValue = async (req, res) => {
    try {
        // Hämta alla produkter från databasen
        const products = await Product.find({});

        // Beräkna det totala lagervärdet
        const totalValue = products.reduce((sum, product) => {
            return sum + product.price * product.amountInStock;
        }, 0);

        res.status(200).json({
            status: "success",
            totalStockValue: totalValue,
            Products: products.length,
            totalStockValue: totalValue,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Invalid data set",
        });
    }
};
