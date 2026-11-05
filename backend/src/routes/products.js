import express from 'express';
import { PRODUCTS } from '../data/products.js';

const router = express.Router();

// GET all products with filtering, search, sorting
router.get('/', (req, res) => {
  try {
    let result = [...PRODUCTS];
    const { category, vibe, search, sort, isDrop, isBestseller, minPrice, maxPrice } = req.query;

    if (category && category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (vibe && vibe !== 'all') {
      result = result.filter(p => p.vibe.toLowerCase() === vibe.toLowerCase());
    }

    if (isDrop === 'true') {
      result = result.filter(p => p.isDrop);
    }

    if (isBestseller === 'true') {
      result = result.filter(p => p.isBestseller);
    }

    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    if (search) {
      const q = search.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.vibe.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'trending':
        default:
          result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.reviewsCount - a.reviewsCount);
          break;
      }
    }

    res.json({
      success: true,
      count: result.length,
      products: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching products', error: error.message });
  }
});

// GET single product by ID
router.get('/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Also include 3 related products matching vibe or category
  const related = PRODUCTS
    .filter(p => p.id !== product.id && (p.vibe === product.vibe || p.category === product.category))
    .slice(0, 3);

  res.json({
    success: true,
    product,
    related
  });
});

export default router;
