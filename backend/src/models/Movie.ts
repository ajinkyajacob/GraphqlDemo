// Import necessary modules
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for User document
export interface IMovie extends Document {
  title: string;
  description: string;
  imageUrl: string;
  rating: string;
  time: string;
  year: string;
}

// Create a schema for the User model
const movieSchema: Schema<IMovie> = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: String, required: true },
    time: { type: String, required: true },
    year: { type: String, required: true },
  },
  { timestamps: true },
);

const movie = mongoose.model<IMovie>('Movie', movieSchema);

export type MovieType = typeof movie;

// Create and export the User model
export default movie;
