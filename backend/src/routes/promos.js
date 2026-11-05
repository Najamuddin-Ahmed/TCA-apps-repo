import express from 'express';
import { PROMOS } from '../data/products.js';

const router = express.Router();

router.post('/validate', (req, res) => {
  const { code, cartTotal = 0 } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Promo code required' });
  }

  const normalizedCode = code.trim().toUpperCase();
  const promo = PROMOS[normalizedCode];

  if (!promo) {
    return res.status(404).json({ success: false, message: 'Invalid vibe code. Try "NOCAP" or "GENZ10"' });
  }

  if (promo.minSpend && cartTotal < promo.minSpend) {
    return res.status(400).json({
      success: false,
      message: `Code ${normalizedCode} requires minimum spend of $${promo.minSpend}`
    });
  }

  let discountAmount = 0;
  if (promo.discountPercent) {
    discountAmount = Math.round((cartTotal * (promo.discountPercent / 100)) * 100) / 100;
  } else if (promo.discountFlat) {
    discountAmount = Math.min(promo.discountFlat, cartTotal);
  }

  res.json({
    success: true,
    code: normalizedCode,
    description: promo.description,
    discountAmount,
    newTotal: Math.max(0, Math.round((cartTotal - discountAmount) * 100) / 100)
  });
});

export default router;
