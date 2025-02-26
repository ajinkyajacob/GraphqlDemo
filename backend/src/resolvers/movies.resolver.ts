import { MutationResolvers } from '../generated/graphql';
import { QueryResolvers } from '../generated/graphql';

export const movieQueries: QueryResolvers = {
  movies: async (_, { page, pageSize }, { dataSources: { Movie } }) => {
    try {
      return {
        data: await Movie.find().skip(page).limit(pageSize),
        totalRecords: await Movie.find().countDocuments(),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  movie: async (_, args, { dataSources: { Movie } }) => {
    try {
      return await Movie.findById(args.id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
