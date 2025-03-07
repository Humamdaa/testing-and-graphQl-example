import { Request, Response } from 'express';
import Product from '../src/models/Product';
import { getProducts } from '../src/controllers/productController';

// Mock the Product model
jest.mock('../src/models/Product');

describe('getProducts Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {}; // Mock request object
    res = {
      status: jest.fn().mockReturnThis(), // Mock status function
      json: jest.fn(), // Mock json function
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  
  // success section
  it('should return 200 with a list of products if products are found', async () => {
    // Mock Product.find() to return a list of products
    const mockProducts = [
      { name: 'Product 1', features: ['Feature 1'], price: 100 },
      { name: 'Product 2', features: ['Feature 2'], price: 200 },
    ];
    
    (Product.find as jest.Mock).mockResolvedValueOnce(mockProducts);

    await getProducts(req as Request, res as Response);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  // not found section
  it('should return 404 if no products are found', async () => {
    // Mock Product.find() to return an empty array
    (Product.find as jest.Mock).mockResolvedValueOnce([]);

    await getProducts(req as Request, res as Response);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No products found' });
  });

  // internal server section
  it('should return 500 if there is a server error', async () => {
    // Mock Product.find() to throw an error
    const mockError = new Error('Database error');
    (Product.find as jest.Mock).mockRejectedValueOnce(mockError);

    await getProducts(req as Request, res as Response);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Server error',
      error: 'Database error',
    });
  });
});
