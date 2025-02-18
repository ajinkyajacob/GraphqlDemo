import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
  } from "graphql";
  
  const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      genre: { type: GraphQLString },
      rating: { type: GraphQLInt },
      duration: { type: GraphQLString },
    }),
  });

  const MovieTypePaginated = new GraphQLObjectType({
    name: 'MoviePaginated',
    fields: () =>  ({
      data: {type: GraphQLList(MovieType)},
      totalCount: {type: GraphQLInt}
    }),
  })
  
  export {MovieType, MovieTypePaginated};