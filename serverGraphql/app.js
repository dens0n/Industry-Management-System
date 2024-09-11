const connectDB = require('./config/dbConnection');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
mongoose = require('mongoose');
const app = express();
const PORT = 3000;

connectDB();

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
