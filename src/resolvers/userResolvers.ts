import { getUserById, createUser } from "../controllers/userController";
const UserResolvers = {
  Query: {
    getUserById: async (_: unknown, { id }: { id: string }) => {
      try {
        // Call controller to fetch user by ID
        return await getUserById(id);
      } catch (error) {
        // Propagate the error with a detailed message
        throw new Error(
          error instanceof Error
            ? error.message
            : "An unknown error occurred while fetching the user."
        );
      }
    },
  },

  Mutation: {
    // Create a new user
    createUser: async (
      _: unknown,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
    ) => {
      try {
        // Call controller to create user
        return await createUser(username, email, password);
      } catch (error) {
        // Propagate the error with a detailed message
        throw new Error(
          error instanceof Error
            ? error.message
            : "An unknown error occurred while creating the user."
        );
      }
    },
  },
};
export { UserResolvers };
