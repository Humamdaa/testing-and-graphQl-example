const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    hello: String
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
  }
`;

export { typeDefs };

