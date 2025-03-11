export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Movie = {
  __typename?: 'Movie';
  description: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['ID']['output']>;
  imageUrl: Maybe<Scalars['String']['output']>;
  omdb: Maybe<Omdb>;
  rating: Maybe<Scalars['String']['output']>;
  time: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
  year: Maybe<Scalars['String']['output']>;
};

export type MoviePaginated = {
  __typename?: 'MoviePaginated';
  data: Maybe<Array<Maybe<Movie>>>;
  totalRecords: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: Maybe<User>;
  login: Maybe<User>;
};


export type MutationAddUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Omdb = {
  __typename?: 'OMDB';
  Actors: Maybe<Scalars['String']['output']>;
  Awards: Maybe<Scalars['String']['output']>;
  BoxOffice: Maybe<Scalars['String']['output']>;
  Country: Maybe<Scalars['String']['output']>;
  DVD: Maybe<Scalars['String']['output']>;
  Director: Maybe<Scalars['String']['output']>;
  Genre: Maybe<Scalars['String']['output']>;
  Language: Maybe<Scalars['String']['output']>;
  Metascore: Maybe<Scalars['String']['output']>;
  Plot: Maybe<Scalars['String']['output']>;
  Poster: Maybe<Scalars['String']['output']>;
  Production: Maybe<Scalars['String']['output']>;
  Rated: Maybe<Scalars['String']['output']>;
  Ratings: Maybe<Array<Maybe<Ratings>>>;
  Released: Maybe<Scalars['String']['output']>;
  Response: Maybe<Scalars['String']['output']>;
  Runtime: Maybe<Scalars['String']['output']>;
  Title: Maybe<Scalars['String']['output']>;
  Type: Maybe<Scalars['String']['output']>;
  Website: Maybe<Scalars['String']['output']>;
  Writer: Maybe<Scalars['String']['output']>;
  Year: Maybe<Scalars['String']['output']>;
  imdbID: Maybe<Scalars['String']['output']>;
  imdbRating: Maybe<Scalars['String']['output']>;
  imdbVotes: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllOmdb: Maybe<Array<Maybe<Omdb>>>;
  getOmdbById: Maybe<Omdb>;
  movie: Maybe<Movie>;
  movies: Maybe<MoviePaginated>;
};


export type QueryGetOmdbByIdArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMovieArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMoviesArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Ratings = {
  __typename?: 'Ratings';
  Source: Maybe<Scalars['String']['output']>;
  Value: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Maybe<Scalars['String']['output']>;
  email: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jwt: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['String']['output']>;
};
