import Product from "../models/Product.js";
import Manufacturer from "../models/Manufacturer.js";
import mongoose from 'mongoose';

const resolvers = {
  Query: {
    products: async () => {
      return await Product.find().populate('manufacturer');
    },
    product: async (_, { id }) => {
      return await Product.findById(id).populate('manufacturer');
    },
    totalStockValue: async () => {
      const products = await Product.find();
      return products.reduce((total, product) => total + (product.price * product.stockQuantity), 0);
    },
    totalStockValueByManufacturer: async () => {
      const products = await Product.find().populate('manufacturer');
      const manufacturerMap = new Map();
  
      products.forEach(product => {
        const { manufacturer, price, stockQuantity } = product;
        const value = price * stockQuantity;
        
        if (manufacturerMap.has(manufacturer.id)) {
          manufacturerMap.get(manufacturer.id).totalValue += value;
        } else {
          manufacturerMap.set(manufacturer.id, {
            manufacturerId: manufacturer.id,
            manufacturerName: manufacturer.name,
            totalValue: value,
          });
        }
      });
      return Array.from(manufacturerMap.values());
    },
    lowStockProducts: async () => {
      return await Product.find({ stockQuantity: { $lt: 10 } });
    },
    criticalStockProducts: async () => {
      const products = await Product.find({ stockQuantity: { $lt: 5 } }).populate('manufacturer');
      return products.map(product => ({
        productId: product.id,
        productName: product.name,
        stockQuantity: product.stockQuantity,
        manufacturerName: product.manufacturer.name,
        contactName: product.manufacturer.contact.name,
        contactPhone: product.manufacturer.contact.phone,
        contactEmail: product.manufacturer.contact.email,
      }));
    },
    manufacturers: async () => {
      return await Manufacturer.find();
    },
  },

  Mutation: {
    addProduct: async (_, { input }) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(input.manufacturerId)) {
          throw new Error('Invalid manufacturerId');
        }
        const manufacturerExists = await Manufacturer.findById(input.manufacturerId);
        if (!manufacturerExists) {
          throw new Error('Manufacturer not found');
        }

        const product = new Product({
          ...input,
          manufacturer: input.manufacturerId,
        });
        
        await product.save();
        
        const savedProduct = await Product.findById(product.id).populate('manufacturer');
        
        if (!savedProduct) {
          throw new Error('Failed to save product');
        }
        
        return savedProduct;
      } catch (error) {
        console.error('Error in addProduct resolver:', error);
        throw new Error(error.message || 'Failed to add product');
      }
    },

    updateProduct: async (_, { id, input }) => {
      try {
        if (input.manufacturerId) {
          if (!mongoose.Types.ObjectId.isValid(input.manufacturerId)) {
            throw new Error('Invalid manufacturerId');
          }
          const manufacturerExists = await Manufacturer.findById(input.manufacturerId);
          if (!manufacturerExists) {
            throw new Error('Manufacturer not found');
          }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
          id, 
          { ...input, manufacturer: input.manufacturerId },
          { new: true }
        ).populate('manufacturer');

        if (!updatedProduct) {
          throw new Error('Product not found');
        }

        return updatedProduct;
      } catch (error) {
        console.error('Error in updateProduct resolver:', error);
        throw new Error(error.message || 'Failed to update product');
      }
    },

    deleteProduct: async (_, { id }) => {
      try {
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
          throw new Error('Product not found');
        }
        return true;
      } catch (error) {
        console.error('Error in deleteProduct resolver:', error);
        throw new Error(error.message || 'Failed to delete product');
      }
    }
  }
};

export default resolvers;