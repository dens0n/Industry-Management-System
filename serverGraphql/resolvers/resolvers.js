import Product from "../models/Product.js";
import Manufacturer from "../models/Manufacturer.js";

const resolvers = {

    procucts: async () => {
        return await Product.find().populate('manufacturer');
    },
    product: async ({ id }) => {
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

    addProduct: async ({input}) => {
        const product = new Product({
            ...input,
            manufacturer: input.manufacturerId,
        });
        await product.save();
        return await product.findById(product.id).populate('manufacturer');
    },

    updateProduct: async ({id, input}) => {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            {...input, manufacturer: input.manufacturerId},
        {new: true}
        ).populate('manufacturer');
        return updatedProduct;
    },

    deleteProduct: async ({id}) => {
        await Product.findByIdAndDelete(id);
        return !!result;
    }


}



export default resolvers;