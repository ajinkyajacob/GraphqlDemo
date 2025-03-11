import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  omdb?: Maybe<Omdb>;
  rating?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type MoviePaginated = {
  __typename?: 'MoviePaginated';
  data?: Maybe<Array<Maybe<Movie>>>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<User>;
  login?: Maybe<User>;
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
  Actors?: Maybe<Scalars['String']['output']>;
  Awards?: Maybe<Scalars['String']['output']>;
  BoxOffice?: Maybe<Scalars['String']['output']>;
  Country?: Maybe<Scalars['String']['output']>;
  DVD?: Maybe<Scalars['String']['output']>;
  Director?: Maybe<Scalars['String']['output']>;
  Genre?: Maybe<Scalars['String']['output']>;
  Language?: Maybe<Scalars['String']['output']>;
  Metascore?: Maybe<Scalars['String']['output']>;
  Plot?: Maybe<Scalars['String']['output']>;
  Poster?: Maybe<Scalars['String']['output']>;
  Production?: Maybe<Scalars['String']['output']>;
  Rated?: Maybe<Scalars['String']['output']>;
  Ratings?: Maybe<Array<Maybe<Ratings>>>;
  Released?: Maybe<Scalars['String']['output']>;
  Response?: Maybe<Scalars['String']['output']>;
  Runtime?: Maybe<Scalars['String']['output']>;
  Title?: Maybe<Scalars['String']['output']>;
  Type?: Maybe<Scalars['String']['output']>;
  Website?: Maybe<Scalars['String']['output']>;
  Writer?: Maybe<Scalars['String']['output']>;
  Year?: Maybe<Scalars['String']['output']>;
  imdbID?: Maybe<Scalars['String']['output']>;
  imdbRating?: Maybe<Scalars['String']['output']>;
  imdbVotes?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllOmdb?: Maybe<Array<Maybe<Omdb>>>;
  getOmdbById?: Maybe<Omdb>;
  movie?: Maybe<Movie>;
  movies?: Maybe<MoviePaginated>;
};


export type QueryGetOmdbByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMovieArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMoviesArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Ratings = {
  __typename?: 'Ratings';
  Source?: Maybe<Scalars['String']['output']>;
  Value?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jwt?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Movie: ResolverTypeWrapper<Movie>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  MoviePaginated: ResolverTypeWrapper<MoviePaginated>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  OMDB: ResolverTypeWrapper<Omdb>;
  Query: ResolverTypeWrapper<{}>;
  Ratings: ResolverTypeWrapper<Ratings>;
  User: ResolverTypeWrapper<User>;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Movie: Movie;
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  MoviePaginated: MoviePaginated;
  Int: Scalars['Int']['output'];
  Mutation: {};
  OMDB: Omdb;
  Query: {};
  Ratings: Ratings;
  User: User;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars['Boolean']['output'];
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = MyContext, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = MyContext, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = MyContext, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = MyContext, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = MyContext, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = MyContext, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = MyContext, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = MyContext, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MovieResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  omdb?: Resolver<Maybe<ResolversTypes['OMDB']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoviePaginatedResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['MoviePaginated'] = ResolversParentTypes['MoviePaginated']> = {
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Movie']>>>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'email' | 'name' | 'password'>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
};

export type OmdbResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['OMDB'] = ResolversParentTypes['OMDB']> = {
  Actors?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Awards?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  BoxOffice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  DVD?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Director?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Genre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Metascore?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Plot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Poster?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Production?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Rated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Ratings?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ratings']>>>, ParentType, ContextType>;
  Released?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Response?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Runtime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Writer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imdbID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imdbRating?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imdbVotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllOmdb?: Resolver<Maybe<Array<Maybe<ResolversTypes['OMDB']>>>, ParentType, ContextType>;
  getOmdbById?: Resolver<Maybe<ResolversTypes['OMDB']>, ParentType, ContextType, Partial<QueryGetOmdbByIdArgs>>;
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, Partial<QueryMovieArgs>>;
  movies?: Resolver<Maybe<ResolversTypes['MoviePaginated']>, ParentType, ContextType, RequireFields<QueryMoviesArgs, 'page' | 'pageSize'>>;
};

export type RatingsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Ratings'] = ResolversParentTypes['Ratings']> = {
  Source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jwt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  Movie?: MovieResolvers<ContextType>;
  MoviePaginated?: MoviePaginatedResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OMDB?: OmdbResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Ratings?: RatingsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = MyContext> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';