import request from 'supertest';
import express, { Application } from 'express';
import { createProduct } from '../src/controllers/productController';
import Product from '../src/models/Product';

// Mock the Product model
jest.mock('../src/models/Product', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: 'some-id',
        name: 'Test Product',
        features: ['Feature 1', 'Feature 2'],
        price: 99.99,
        __v: 0,
      }),
    })),
  };
});

const app: Application = express();
app.use(express.json());
app.post('/products', createProduct);

describe('createProduct Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 201 status and the created product', async () => {
    const mockProduct = {
      _id: 'some-id',
      name: 'Test Product',
      features: ['Feature 1', 'Feature 2'],
      price: 99.99,
      __v: 0,
    };

    // Mock the save method explicitly
    const saveMock = jest.fn().mockResolvedValue(mockProduct);
    (Product as jest.Mocked<any>).mockImplementation(() => {
      console.log('Mocked save function:', saveMock); // Debugging: Print the saveMock function
      return {
        save: saveMock,
      };
    });

    const response = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        features: ['Feature 1', 'Feature 2'],
        price: 99.99,
      });

    console.log('Response Body:', response.body); // Debugging

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockProduct); // Ensure this matches the actual response
  });

  it('should return 400 status if required fields are missing', async () => {
    const response = await request(app).post('/products').send({
      name: 'Test Product',
      // Missing features and price
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'All fields are required' });
  });

  it('should return 500 status if product creation fails', async () => {
    // Override the mock to reject with an error
    (Product as jest.Mocked<any>).mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('Failed to save')),
    }));

    const response = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        features: ['Feature 1', 'Feature 2'],
        price: 99.99,
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Failed to create product',
      error: {},
    });
  });
});
