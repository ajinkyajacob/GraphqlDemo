import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { typeDefs } from './schemas/schema';
import { resolvers } from './resolvers/index.resolver';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import { getUserFromToken } from './utils/passwordUtils';
import { connect, Mongoose } from 'mongoose';
import Movie, { MovieType } from './models/Movie';
import User, { UserType } from './models/User';
import { JwtPayload } from 'jsonwebtoken';

export interface MyContext {
  user: JwtPayload;
  dataSources: { Movie: MovieType; User: UserType; mongoose: Mongoose };
}

configDotenv();

async function init() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // DB CONNECTION
  if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL environment variable is not defined');
  }

  const mongoose = await connect(process.env.MONGODB_URL, { dbName: 'GQ' })
    .then((x) => {
      console.log('MongoDB connected to the backend successfully');
      return x;
    })
    .catch((err: Error) => console.log(err));

  await server.start();

  app.use(morgan('common'));

  // USE HELMET AND CORS MIDDLEWARES
  app.use(
    cors({
      origin: true, // Comma separated list of your urls to access your api. * means allow everything
      credentials: true, // Allow cookies to be sent with requests
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  app.use(express.json());

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: [
        '*',
        'https://www.your-app.example',
        'https://studio.apollographql.com',
      ],
    }),
    express.json(),
    expressMiddleware<MyContext>(server, {
      context: async ({ req }) => {
        let user;
        if (
          !['login', 'register', 'IntrospectionQuery'].includes(
            req.body.operationName,
          )
        ) {
          user = getUserFromToken(req.headers.authorization) as JwtPayload;
        }
        return {
          user,
          dataSources: { Movie, User, mongoose },
        } as any as MyContext;
      },
    }) as any,
  );
  const port = process.env.PORT || 8500;
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
}

init();
