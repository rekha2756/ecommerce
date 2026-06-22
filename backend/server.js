const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { syncDatabase } = require('./models');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Test Route
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'E-Commerce Backend Running Successfully 🚀'
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start Server
const startServer = async () => {
  const connected = await syncDatabase();

  if (!connected) {
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();