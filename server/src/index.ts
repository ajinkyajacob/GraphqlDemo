import express from 'express';
const app = express();
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import { getUserFromToken } from './utils/passwordUtils';

dotenv.config();
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

// DB CONNECTION
if (!process.env.MONGODB_URL) {
  throw new Error('MONGODB_URL environment variable is not defined');
}

mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log('MongoDB connected to the backend successfully');
  })
  .catch((err: Error) => console.log(err));

app.use(
  '/graphql',
  graphqlHTTP((req, res) => {
    const user = getUserFromToken(req.headers.authorization);
    return {
      schema,
      graphiql: true,
      context: { user },
    };
  }),
);

// Start backend server
const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});

export default app;
