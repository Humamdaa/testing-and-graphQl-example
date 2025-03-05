import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the User model extending Document
export interface IProduct extends Document {
  name: string;
  features: string;
  price: string;
}

// Define the schema for the User model
const userSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the User model
const Product = mongoose.model<IProduct>("Product", userSchema);

export default Product;
