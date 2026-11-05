import express from 'express';

const router = express.Router();

// In-memory store for orders during session
const orders = [];

// POST create order
router.post('/', (req, res) => {
  const { items, customer, paymentMethod, promoCode, total, discountAmount, shippingMethod } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  if (!customer || !customer.email || !customer.name) {
    return res.status(400).json({ success: false, message: 'Customer details missing' });
  }

  const orderId = 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const trackingNumber = 'TRK-' + Math.floor(10000000 + Math.random() * 90000000);

  const newOrder = {
    id: orderId,
    trackingNumber,
    createdAt: new Date().toISOString(),
    status: 'Confirmed - Preparing Drop 📦',
    items,
    customer,
    paymentMethod: paymentMethod || 'Apple Pay',
    promoCode: promoCode || null,
    discountAmount: discountAmount || 0,
    shippingMethod: shippingMethod || 'Standard Express (2-3 Days)',
    total: total,
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  };

  orders.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order locked in! Aura boosted 🔥',
    order: newOrder
  });
});

// GET order by ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, order });
});

export default router;
