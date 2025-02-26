import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/schemas',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers', 'typescript-mongodb'],
      config: {
        contextType: '../index#MyContext',
      },
    },
  },
};

export default config;
