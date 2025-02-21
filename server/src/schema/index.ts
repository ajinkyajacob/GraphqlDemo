import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import UserType from './User';
import { MovieType, MovieTypePaginated } from './Movie';
import Movie from '../models/Movie';
import User from '../models/User';
import {
  hashPassword,
  genToken,
  comparePassword,
} from '../utils/passwordUtils';

// Queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Query to get all users
    users: {
      type: GraphQLList(UserType),
      args: { page: { type: GraphQLInt }, pageSize: { type: GraphQLInt } },
      resolve: async (_, args, context) => {
        try {
          console.log(context.user);
          const users = await User.find().skip(args.page).limit(args.limit);
          return users.map((user) => ({
            ...user.toObject(),
            id: user._id,
            createdAt: user.createdAt.toISOString(), // Format createdAt as ISO 8601
            updatedAt: user.updatedAt.toISOString(), // Format createdAt as ISO 8601
          }));
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },

    // Query to get a user by ID
    user: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (_, args) => {
        try {
          const user = await User.findById(args.id);
          if (user) {
            return {
              ...user.toObject(),
              id: user._id,
              createdAt: user.createdAt.toISOString(),
              updatedAt: user.updatedAt.toISOString(),
            };
          }
          throw new Error('User is null');
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },

    // Query to get all movies
    movies: {
      type: MovieTypePaginated,
      args: { page: { type: GraphQLInt }, pageSize: { type: GraphQLInt } },

      resolve: async (_, args, context) => {
        try {
          console.log(context.user);
          return {
            data: await Movie.find().skip(args.page).limit(args.pageSize),
            totalRecords: await Movie.countDocuments(),
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },

    // Query to get a movie by ID
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (_, args) => {
        try {
          return await Movie.findById(args.id);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Mutation to add a new user
    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        // isAdmin: { type: GraphQLNonNull(GraphQLBoolean) },
      },

      resolve: async (_, args) => {
        try {
          // Destructure password
          const { password, ...others } = args;

          //   Send a hashed password
          const hashedPassword = await hashPassword(password);

          const user = new User({
            password: hashedPassword,
            ...others,
          });
          let data = await user.save();
          const { _id: id, name, email } = data;

          const token = genToken(id as string, email);

          return { id, name, email, jwt: token };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        try {
          const data = await User.findOne({ email: args.email });
          if (!data) throw new Error('User not found');
          const { _id: id, name, email, password } = data;
          const valid = await comparePassword(password, args.password);
          if (!valid) throw new Error('Pasword does not match');
          const token = genToken(id as string, email);
          return { id, name, email, jwt: token };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },

    // Mutation to update a user by ID
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        isAdmin: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        try {
          return await User.findByIdAndUpdate(args.id, args, { new: true });
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },

    // Mutation to delete a user by ID
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (_, args) => {
        try {
          return await User.findByIdAndDelete(args.id);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },

    // Mutation to add a new movie
    addMovie: {
      type: MovieType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLNonNull(GraphQLInt) },
        duration: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (context, args) => {
        try {
          console.log(context);
          const movie = new Movie(args);
          return await movie.save();
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },

    // Mutation to update a movie by ID
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLNonNull(GraphQLInt) },
        duration: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        try {
          return await Movie.findByIdAndUpdate(args.id, args, { new: true });
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },

    // Mutation to delete a movie by ID
    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (_, args) => {
        try {
          return await Movie.findByIdAndDelete(args.id);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  },
});
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
