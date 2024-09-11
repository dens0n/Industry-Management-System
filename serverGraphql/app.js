const connectDB = require('./config/dbConnection');
const schema = require('./schema/graphqlSchema');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
mongoose = require('mongoose');
const app = express();
const PORT = 3000;

connectDB();

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
