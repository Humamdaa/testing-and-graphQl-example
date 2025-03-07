import { UserResolvers } from '../src/resolvers/userResolvers';
import { getUserById } from '../src/controllers/userController';

// Mock the userController module
jest.mock('../src/controllers/userController', () => ({
  getUserById: jest.fn(), // Mock the getUserById function
}));

describe('UserResolvers.Query.getUserById', () => {
  it('should return the user when getUserById is successful', async () => {
    // 1. Set up the mock
    const mockUser = { id: '1', username: 'testuser', email: 'test@example.com' };
    (getUserById as jest.Mock).mockResolvedValue(mockUser); // Define the value returned by getUserById

    // 2. Call the getUserById function from the resolver
    const result = await UserResolvers.Query.getUserById({}, { id: '1' });

    // 3. Verify the result is correct
    expect(result).toEqual(mockUser); // The result should be mockUser
    expect(getUserById).toHaveBeenCalledWith('1'); // getUserById should be called with the correct argument
  });

  it('should throw an error when getUserById fails', async () => {
    // 1. Set up the mock to fail
    const mockError = new Error('User not found');
    (getUserById as jest.Mock).mockRejectedValue(mockError); // Define the error thrown by getUserById

    // 2. Call the getUserById function from the resolver
    await expect(UserResolvers.Query.getUserById({}, { id: '1' })).rejects.toThrow(
      'User not found'
    ); // It should throw the expected error

    // 3. Verify that getUserById was called
    expect(getUserById).toHaveBeenCalledWith('1');
  });
});