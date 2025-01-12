import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the User model extending Document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
