import { UserResolvers } from '../src/resolvers/userResolvers';
import { createUser } from '../src/controllers/userController';

// Mock the userController module
jest.mock('../src/controllers/userController', () => ({
  createUser: jest.fn(), // Mock the createUser function
}));

describe('UserResolvers.Mutation.createUser', () => {
  it('should return the created user when createUser is successful', async () => {
    //  Set up the mock
    const mockUser = { id: '1', username: 'newuser', email: 'new@example.com' };
    (createUser as jest.Mock).mockResolvedValue(mockUser); // Define the value returned by createUser

    //  Call the createUser function from the resolver
    const result = await UserResolvers.Mutation.createUser(
      {},
      { username: 'newuser', email: 'new@example.com', password: 'password123' }
    );

    //  Verify the result is correct
    expect(result).toEqual(mockUser); // The result should be mockUser
    expect(createUser).toHaveBeenCalledWith(
      'newuser',
      'new@example.com',
      'password123'
    ); // createUser should be called with the correct arguments
  });

  it('should throw an error when createUser fails', async () => {
    // Set up the mock to fail
    const mockError = new Error('Failed to create user');
    (createUser as jest.Mock).mockRejectedValue(mockError); // Define the error thrown by createUser

    // Call the createUser function from the resolver
    await expect(
      UserResolvers.Mutation.createUser(
        {},
        {
          username: 'newuser',
          email: 'new@example.com',
          password: 'password123',
        }
      )
    ).rejects.toThrow('Failed to create user'); // It should throw the expected error

    // Verify that createUser was called
    expect(createUser).toHaveBeenCalledWith(
      'newuser',
      'new@example.com',
      'password123'
    );
  });
});
