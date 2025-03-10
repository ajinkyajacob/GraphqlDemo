// Import necessary modules
import mongoose, { Schema, Document } from 'mongoose';

export interface IOMDB extends Document {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

// Define the interface for User document
export interface IMovie extends Document {
  title: string;
  description: string;
  imageUrl: string;
  rating: string;
  time: string;
  year: string;
  omdb: IOMDB;
}

export const omdb = new Schema<IOMDB>({
  Title: { type: String },
  Year: { type: String },
  Rated: { type: String },
  Released: { type: String },
  Runtime: { type: String },
  Genre: { type: String },
  Director: { type: String },
  Writer: { type: String },
  Actors: { type: String },
  Plot: { type: String },
  Language: { type: String },
  Country: { type: String },
  Awards: { type: String },
  Poster: { type: String },
  Ratings: [
    {
      Source: { type: String },
      Value: { type: String },
    },
  ],
});

// Create a schema for the User model
const movieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: String, required: true },
    time: { type: String, required: true },
    year: { type: String, required: true },
    omdb,
  },
  { timestamps: true },
);

const movie = mongoose.model<IMovie>('Movie', movieSchema);

export type MovieType = typeof movie;

// Create and export the User model
export default movie;
