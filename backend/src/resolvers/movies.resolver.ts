import { getOMDBData } from '../utils/passwordUtils';
import { MutationResolvers } from '../generated/graphql';
import { QueryResolvers } from '../generated/graphql';

export const movieQueries: QueryResolvers = {
  movies: async (_, { page, pageSize }, { dataSources: { Movie } }) => {
    try {
      const data = await Movie.find().skip(page).limit(pageSize);
      const totalRecords = await Movie.countDocuments();
      return {
        data,
        totalRecords,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  movie: async (_, { id }, { dataSources: { Movie } }) => {
    try {
      let movie = await Movie.findById(id);
      if (movie?.omdb && Object.values(movie.omdb).length) {
        console.log(movie.omdb.toObject());
        return movie;
      }
      const omdb = await getOMDBData(movie.title);
      console.log(omdb);
      movie = await Movie.findByIdAndUpdate(id, { omdb }, { new: true });
      return movie;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
