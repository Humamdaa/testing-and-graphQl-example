// userController.ts
import User, { IUser } from "../models/User";

// Controller to create a new user
const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  try {
    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Return the created user
    return newUser; // No unreachable code after return
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to create user: " + error.message);
    } else {
      throw new Error("An unknown error occurred while creating the user.");
    }
  }
};

//  get a user by ID
const getUserById = async (id: string): Promise<IUser> => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to get user by ID: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while fetching the user by ID."
      );
    }
  }
};

// Export functions
export { createUser, getUserById };
