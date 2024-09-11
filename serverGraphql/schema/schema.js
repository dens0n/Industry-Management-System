import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        stockQuantity: Int!
        manufacturer: Manufacturer!
    }

    type Manufacturer {
        id: ID!
        name: String!
        contact: Contact!
    }

    type Contact {
        name: String!
        phone: String!
        email: String!
    }

    type stockValueByManufacturer {
        manufacturerId: ID!
        manufacturerName: String!
        totalValue: Float!
    }

    type criticalStockProduct {
        productId: ID!
        productName: String!
        stockQuantity: Int!
        manufacturerName: String!
        contactName: String!
        contactPhone: String!
        contactEmail: String!
    }

    type Query {
        products: [Product!]!
        product(id: ID!): Product
        totalStockValue: Float!
        totalStockValueByManufacturer: [stockValueByManufacturer!]!
        criticalStockProducts: [criticalStockProduct!]!
        manufacturers: [Manufacturer!]!
    }

    input ProductInput {
        name: String!
        description: String!
        price: Float!
        stockQuantity: Int!
        manufacturerId: ID!
    }

    type Mutation {
        addProduct(input: ProductInput!): Product!
        updateProduct(id: ID!, input: ProductInput!): Product!
        deleteProduct(id: ID!): Boolean!
    }
`);

export default schema;