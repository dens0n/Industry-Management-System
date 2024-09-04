const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const contactRouter = require("./routes/contactRoutes");
const manufacturerRouter = require("./routes/manufacturerRoutes");
const productsRouter = require("./routes/productsRoutes");

mongoose
    .connect("mongodb+srv://enkelt.7dl7p.mongodb.net/", {
        user: "teamenkelt",
        pass: "teamenkelt",
    })
    .then(() => {
        console.log("connected to mongoDB");
    });

const app = express();
app.use(express.json());

app.use("/contact", contactRouter);
app.use("/manufacturer", manufacturerRouter);
app.use("/api/products", productsRouter);

//Summarize the total value of all products in stock


/* //Summarize the total value of products in stock per manufacturer
app.use("/api/products/total-stock-value-by-manufacturer");

//Retrieve a list of all products with less than 10 units in stock
app.use("/api/products/low-stock");

//Retrieve a compact list of products with less than 5 items in stock (including only the manufacturer's and the contact's name, phone and email)
app.use("/api/products/critical-stock"); */

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
