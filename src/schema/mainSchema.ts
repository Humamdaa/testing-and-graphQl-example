// /graphql/schemas/mainSchema.js
import { gql } from "apollo-server-express";
import { typeDefs as userTypeDefs } from "./userSchema";
import { typeDefs as messageTypeDefs } from "./messageSchema";
// Import more schemas as needed

const typeDefs = gql`
  ${userTypeDefs}
  ${messageTypeDefs}
`;

export { typeDefs };
