// Import necessary modules
import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for User document
export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create a schema for the User model
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);
const user = mongoose.model<IUser>('User', userSchema);
export type UserType = typeof user;
// Create and export the User model
export default user;
