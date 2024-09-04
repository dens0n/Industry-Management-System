const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const productsRouter = require("./routes/productsRoutes");
const connect = require("./db/dbConnection");

const app = express();
app.use(express.json());

connect();

app.use("/api/products", productsRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
