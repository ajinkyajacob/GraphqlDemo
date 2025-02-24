import { IMovie } from '@models/Movie';
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

const MovieType = new GraphQLObjectType<IMovie>({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    rating: { type: GraphQLString },
    time: { type: GraphQLString },
    year: { type: GraphQLString },
  }),
});

const MovieTypePaginated = new GraphQLObjectType({
  name: 'MoviePaginated',
  fields: () => ({
    data: { type: GraphQLList(MovieType) },
    totalCount: { type: GraphQLInt },
  }),
});

export { MovieType, MovieTypePaginated };
