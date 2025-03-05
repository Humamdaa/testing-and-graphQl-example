import { Request, Response } from 'express';
import Product from '../models/Product';

// Controller to get all products

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    if (products && products.length > 0) {
      res.status(200).json(products);
      return;
    }
    res.status(404).json({ message: 'No products found' });
    return;
  } catch (error) {
    console.error('Error fetching products:', error); // Logging the error for better debugging
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
    return;
  }
};

// Controller to create a new product

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, features, price } = req.body;

  console.log('Request body in controller:', req.body); // Debugging

  // Validate the data
  if (!name || !features || !price) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  try {
    const newProduct = new Product({
      name,
      features,
      price,
    });

    console.log('New product before save:', newProduct); // Debugging

    const savedProduct = await newProduct.save();

    console.log('Saved product:', savedProduct); // Debugging

    res.status(201).json(savedProduct);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
    return;
  }
};
