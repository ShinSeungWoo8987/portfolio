"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const main = async () => {
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver],
            validate: false,
        }),
    });
    apolloServer.applyMiddleware({ app });
    app.get('/', (req, res, next) => {
        res.send('hello');
    });
    app.listen(5000, () => console.log(`Server running on http://localhost:5000`));
};
main().catch((err) => console.log(err));
// createConnection()
//   .then(async (connection) => {
//     const user = new User();
//     user.username = 'test';
//     user.email = 'emailtest';
//     user.password = 'passtest';
//     await connection.manager.save(user);
//     const users = await connection.manager.find(User);
//     console.log(users);
//   })
//   .catch((error) => console.log(error));
