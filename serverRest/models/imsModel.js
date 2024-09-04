// models/productModel.js
const mongoose = require('mongoose');

// Define the Contact schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true }
}, { _id: false }); // No _id for embedded documents

// Define the Manufacturer schema
const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String },
    description: { type: String },
    address: { type: String },
    contact: contactSchema // Embed Contact schema
}, { _id: false }); // No _id for embedded documents

// Define the Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: Number, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    amountInStock: { type: Number, default: 0 },
    manufacturer: manufacturerSchema // Embed Manufacturer schema
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
