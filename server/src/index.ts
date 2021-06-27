import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/user';
import { ProjectResolver } from './resolvers/project';
import { IntroduceResolver } from './resolvers/introduce';
import indexRouter from './routes/index';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import cors from 'cors';

const main = async () => {
  const conn = await createConnection().catch((error) => console.log(error));

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compression());
  app.use(cookieParser());
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://59.14.116.241:3000'],
      credentials: true,
    })
  ); // '*'

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, ProjectResolver, IntroduceResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false }); // '*'

  app.use('/', indexRouter);

  app.listen(5000, () => console.log(`Server running on http://localhost:5000/graphql`));
};

main().catch((err) => console.log(err));
