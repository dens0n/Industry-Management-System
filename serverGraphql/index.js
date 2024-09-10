import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import dotenv from "dotenv";
import schema from "./schema/schema.js";
import resolvers from "./resolvers/resolvers.js";

dotenv.config();


const app = express();

mongoose.connect(process.env.DATABASE, {
    user: process.env.USERNAME,
    pass: process.env.DATABASE_PASSWORD,
})
.then(() => {
    console.log('Connected to MongoDB database');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
    })
)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
