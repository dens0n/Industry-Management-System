const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://enkelt.7dl7p.mongodb.net/", {
            user: "teamenkelt",
            pass: "teamenkelt",
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB");
        console.log(err);
    }
}

module.exports = connect;
