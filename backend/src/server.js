import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import promosRouter from './routes/promos.js';
import ordersRouter from './routes/orders.js';
import lookbookRouter from './routes/lookbook.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.get('/', (req, res) => {
  res.json({
    message: '⚡ Gen-Z Threads API Server is online!',
    status: 'online',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      orders: '/api/orders',
      lookbook: '/api/lookbook'
    }
  });
});

app.use('/api/products', productsRouter);
app.use('/api/promos', promosRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/lookbook', lookbookRouter);

// System health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    vibes: '100% immaculate',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Gen-Z Threads API Server running on http://localhost:${PORT}`);
});
