import { comparePassword } from '../utils/passwordUtils';
import { MutationResolvers } from '../generated/graphql';
import { genToken } from '../utils/passwordUtils';
import { GraphQLError } from 'graphql';

export const userMutations: MutationResolvers = {
  login: async (_, args, context) => {
    try {
      const {
        dataSources: { User },
      } = context;
      const data = await User.findOne({ email: args.email });
      if (!data)
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      const { _id: id, name, email, password, createdAt, updatedAt } = data;
      const valid = await comparePassword(password, args.password);
      if (!valid)
        throw new GraphQLError('Pasword does not match', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      const token = genToken(id as string, email);
      return {
        id: id as string,
        name,
        email,
        jwt: token,
        // createdAt,
        // updatedAt,
      };
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }
  },
};
