const express = require('express');
const router = express.Router();

const {
  getCart,
  addToCart,
  removeCartItem
} = require('../controllers/cartController');

const {
  protect
} = require('../middleware/authMiddleware');

router.get('/', protect, getCart);

router.post(
  '/',
  protect,
  addToCart
);

router.delete(
  '/:id',
  protect,
  removeCartItem
);

module.exports = router;