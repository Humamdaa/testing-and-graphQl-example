import { Request, Response } from 'express';

export const req: Request = {
  body: {}, // Initialize req.body as an empty object
} as Request;

export const res: Response = {
  status: jest.fn().mockReturnThis(), // Mock status to return 'this' for chaining
  json: jest.fn(), // Mock json
} as unknown as Response; // Cast to Response type
