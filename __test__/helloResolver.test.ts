import { helloResolver } from '../src/resolvers/helloResolvers';
import { getMessage } from '../src/controllers/messageController';

// محاكاة الوحدة messageController
jest.mock('../src/controllers/messageController', () => ({
  getMessage: jest.fn(), // محاكاة الدالة getMessage
}));

describe('helloResolver', () => {
  it('should return the message from getMessage', () => {
    //
    const mockMessage = 'Hello, World!';
    (getMessage as jest.Mock).mockReturnValue(mockMessage); // تحديد القيمة التي سترجعها getMessage

    // call hello function
    const result = helloResolver.Query.hello();

    //
    expect(result).toBe(mockMessage);
    expect(getMessage).toHaveBeenCalled();
  });
});
