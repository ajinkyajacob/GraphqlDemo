import { readFileSync } from 'node:fs';
import { resolve } from 'path';
import gql from 'graphql-tag';
export const typeDefs = [
  gql(
    readFileSync(resolve('./src/schemas/movies.graphql'), {
      encoding: 'utf-8',
    }),
  ),

  gql(
    readFileSync(resolve('./src/schemas/login.graphql'), {
      encoding: 'utf-8',
    }),
  ),
];
