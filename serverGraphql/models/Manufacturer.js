import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        }
    }  
}, {timestamps: true});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);


export default Manufacturer;