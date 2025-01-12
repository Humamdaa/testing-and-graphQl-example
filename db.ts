import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string); // Assuming MONGO_URI is defined in your .env file
    console.log("Connected to MongoDB");
  } catch (error: unknown) {
    // Type assertion to cast 'error' to an instance of the Error class
    if (error instanceof Error) {
      console.error("Connection failed:", error.message); // Now we can safely access 'error.message'
    } else {
      console.error("Unknown error:", error);
    }
  }
}

export default connectToDB;
