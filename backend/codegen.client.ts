import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,

  schema: './src/schemas',
  generates: {
    '../client/src/generated/graphql.ts': {
      plugins: ['typescript'],
      config: {
        avoidOptionals: true, // This will remove optional properties
        nullableTypename: false, // Make the typename field non-nullable
      },
    },
  },
};

export default config;
