var express = require('express');
var { graphqlHTTP }  = require('express-graphql'); //middleware
var {buildSchema} = require('graphql');

//Creating Schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

// resolver
var root = {
    message: () => 'Hello World!'
};

// Creating an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP ({ //the middleware expects one configurational object having 3 fields: Schema, resolver, graphiql(gives us a FE interface)
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Server is running on port 4000'));