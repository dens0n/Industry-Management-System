const mongoose = require("mongoose");

// Contact schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
});

// Manufacturer schema
const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String },
    description: { type: String },
    address: { type: String },
    contact: { type: contactSchema, required: true }, // Embedded Contact schema
});

// Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: Number, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    manufacturer: { type: manufacturerSchema, required: true }, // Embedded Manufacturer schema
    amountInStock: { type: Number, default: 0 },
});

// Skapa modeller
const Contact = mongoose.model("Contact", contactSchema);
const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
const Product = mongoose.model("Product", productSchema);

module.exports = { Contact, Manufacturer, Product };
