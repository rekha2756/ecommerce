const { Cart, CartItem, Product } = require('../models');

// Get Cart
const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      where: { userId: req.user.id }
    });

    if (!cart) {
      return res.json([]);
    }

    const items = await CartItem.findAll({
      where: { cartId: cart.id }
    });

    res.json(items);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Add To Cart
const addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      where: { userId: req.user.id }
    });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id
      });
    }

    const existingItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId
      }
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();

      return res.json(existingItem);
    }

    const item = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity
    });

    res.status(201).json(item);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Remove Cart Item
const removeCartItem = async (req, res) => {
  try {

    const item = await CartItem.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      });
    }

    await item.destroy();

    res.json({
      message: 'Item removed'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeCartItem
};