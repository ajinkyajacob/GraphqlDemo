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

      resolve: async (_, args) => {
        try {
          return {
            data: await Movie.find().skip(args.page).limit(args.pageSize),
            totalRecords: await Movie.find().countDocuments(),
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

    saveMovies: {
      type: MovieType,
      resolve: async () => {
        const data = await Movie.insertMany([
          {
            title: 'Avatar',
            description:
              'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg',
            time: '162 min',
            year: '2009',
            rating: '7.9',
          },
          {
            title: 'I Am Legend',
            description:
              'Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI0NTI4NjE3NV5BMl5BanBnXkFtZTYwMDA0Nzc4._V1_.jpg',
            time: '101 min',
            year: '2007',
            rating: '7.2',
          },
          {
            title: '300',
            description:
              'King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMwNTg5MzMwMV5BMl5BanBnXkFtZTcwMzA2NTIyMw@@._V1_SX1777_CR0,0,1777,937_AL_.jpg',
            time: '117 min',
            year: '2006',
            rating: '7.7',
          },
          {
            title: 'The Avengers',
            description:
              "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMTA0NjY0NzE4OTReQTJeQWpwZ15BbWU3MDczODg2Nzc@._V1_SX1777_CR0,0,1777,999_AL_.jpg',
            time: '143 min',
            year: '2012',
            rating: '8.1',
          },
          {
            title: 'The Wolf of Wall Street',
            description:
              'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BNDIwMDIxNzk3Ml5BMl5BanBnXkFtZTgwMTg0MzQ4MDE@._V1_SX1500_CR0,0,1500,999_AL_.jpg',
            time: '180 min',
            year: '2013',
            rating: '8.2',
          },
          {
            title: 'Interstellar',
            description:
              "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA3NTEwOTMxMV5BMl5BanBnXkFtZTgwMjMyODgxMzE@._V1_SX1500_CR0,0,1500,999_AL_.jpg',
            time: '169 min',
            year: '2014',
            rating: '8.6',
          },
          {
            title: 'Game of Thrones',
            description:
              'While a civil war brews between several noble families in Westeros, the children of the former rulers of the land attempt to rise up to power. Meanwhile a forgotten race, bent on destruction, plans to return after thousands of years in the North.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BNDc1MGUyNzItNWRkOC00MjM1LWJjNjMtZTZlYWIxMGRmYzVlXkEyXkFqcGdeQXVyMzU3MDEyNjk@._V1_SX1777_CR0,0,1777,999_AL_.jpg',
            time: '56 min',
            year: '2011–',
            rating: '9.5',
          },
          {
            title: 'Vikings',
            description:
              'The world of the Vikings is brought to life through the journey of Ragnar Lothbrok, the first Viking to emerge from Norse legend and onto the pages of history - a man on the edge of myth.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMjM5MTM1ODUxNV5BMl5BanBnXkFtZTgwNTAzOTI2ODE@._V1_.jpg',
            time: '44 min',
            year: '2013–',
            rating: '8.6',
          },
          {
            title: 'Gotham',
            description:
              "The story behind Detective James Gordon's rise to prominence in Gotham City in the years before Batman's arrival.",
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BNDI3ODYyODY4OV5BMl5BanBnXkFtZTgwNjE5NDMwMDI@._V1_SY1000_SX1500_AL_.jpg',
            time: '42 min',
            year: '2014–',
            rating: '8.0',
          },
          {
            title: 'Power',
            description:
              'James "Ghost" St. Patrick, a wealthy New York night club owner who has it all, catering for the city\'s elite and dreaming big, lives a double life as a drug kingpin.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2ODg0MzMzM15BMl5BanBnXkFtZTgwODYxODA5NTE@._V1_SY1000_SX1500_AL_.jpg',
            time: '50 min',
            year: '2014–',
            rating: '8.0',
          },
          {
            title: 'Narcos',
            description:
              'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2MDMzMTc0MF5BMl5BanBnXkFtZTgwMTAyMzA1OTE@._V1_SX1500_CR0,0,1500,999_AL_.jpg',
            time: '49 min',
            year: '2015–',
            rating: '8.9',
          },
          {
            title: 'Breaking Bad',
            description:
              "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's financial future.",
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgyMzI5NDc5Nl5BMl5BanBnXkFtZTgwMjM0MTI2MDE@._V1_SY1000_CR0,0,1498,1000_AL_.jpg',
            time: '49 min',
            year: '2008–2013',
            rating: '9.5',
          },
          {
            title: 'Doctor Strange',
            description:
              'After his career is destroyed, a brilliant but arrogant and conceited surgeon gets a new lease on life when a sorcerer takes him under her wing and trains him to defend the world against evil.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMjM3ODc1ODI5Ml5BMl5BanBnXkFtZTgwODMzMDY3OTE@._V1_.jpg',
            time: 'N/A',
            year: '2016',
            rating: 'N/A',
          },
          {
            title: 'Rogue One: A Star Wars Story',
            description:
              'The Rebellion makes a risky move to steal the plans to the Death Star, setting up the epic saga to follow.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMjE3MzA4Nzk3NV5BMl5BanBnXkFtZTgwNjAxMTc1ODE@._V1_SX1777_CR0,0,1777,744_AL_.jpg',
            time: 'N/A',
            year: '2016',
            rating: 'N/A',
          },
          {
            title: "Assassin's Creed",
            description:
              'When Callum Lynch explores the memories of his ancestor Aguilar and gains the skills of a Master Assassin, he discovers he is a descendant of the secret Assassins society.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BN2EyYzgyOWEtNTY2NS00NjRjLWJiNDYtMWViMjg5MWZjYjgzXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg',
            time: 'N/A',
            year: '2016',
            rating: 'N/A',
          },
          {
            title: 'Luke Cage',
            description:
              'Given superstrength and durability by a sabotaged experiment, a wrongly accused man escapes prison to become a superhero for hire.',
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjc1NjI0NV5BMl5BanBnXkFtZTgwNzA0NzY0ODE@._V1_SY1000_CR0,0,1497,1000_AL_.jpg',
            time: '55 min',
            year: '2016–',
            rating: 'N/A',
          },
        ]);
        return data;
      },
    },
  },
});
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
