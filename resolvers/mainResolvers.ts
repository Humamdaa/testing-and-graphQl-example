// mainResolvers.ts
import { helloResolver } from "./helloResolvers";
import { UserResolvers } from "./userResolvers";

const resolvers = {
  Query: {
    ...helloResolver.Query,
    ...UserResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
  },
};

export { resolvers };
