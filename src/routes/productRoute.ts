import express from 'express';
// import { Request, Response } from 'express';

import { getProducts, createProduct } from '../controllers/productController';

const router = express.Router();

// GET route to fetch all products
router.get('/', getProducts);

// POST route to create a new product
router.post('/', createProduct);

export default router;
