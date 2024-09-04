const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
// const app = require("./app");

mongoose.connect("mongodb+srv://enkelt.7dl7p.mongodb.net/", {
  user: "teamenkelt",
  pass: "teamenkelt",
});

const app = express();
app.use(express.json());
// app.use("/animal", animalsRouter);

app.get("/", (request, response) => {
  response.send("Hello World!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
