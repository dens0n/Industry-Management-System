import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, 
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0,
    },
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer',
        required: true,
    }
    
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);


export default Product;