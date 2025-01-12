import express from "express"; // Import Application from express
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import connectToDB from "./db";
import { typeDefs } from "./schema/mainSchema";
import { resolvers } from "./resolvers/mainResolvers";

// Initialize environment variables
dotenv.config();

const app = express() as any;
const port = process.env.PORT || 5001;

// Connect to MongoDB
connectToDB();

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  try {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
