import express from 'express';
import { LOOKBOOK_ITEMS, PRODUCTS } from '../data/products.js';

const router = express.Router();

router.get('/', (req, res) => {
  // Enrich lookbook items with product info
  const enriched = LOOKBOOK_ITEMS.map(item => {
    const products = item.taggedProductIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    return {
      ...item,
      products
    };
  });

  res.json({
    success: true,
    lookbook: enriched
  });
});

export default router;
