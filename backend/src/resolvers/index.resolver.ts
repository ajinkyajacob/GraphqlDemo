import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from '../generated/graphql';
import { movieQueries } from './movies.resolver';
import { userMutations } from './user.resolver';

const queries: QueryResolvers = {
  ...movieQueries,
};

const mutations: MutationResolvers = {
  ...userMutations,
};

export const resolvers: Resolvers = {
  Query: queries,
  Mutation: mutations,
};
