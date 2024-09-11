const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    { _id: false }
);

const manufacturerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        country: { type: String, required: true },
        website: { type: String },
        description: { type: String },
        address: { type: String },
        contact: contactSchema,
    },
    { _id: false }
);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: Number, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    amountInStock: { type: Number, default: 0 },
    manufacturer: manufacturerSchema,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
