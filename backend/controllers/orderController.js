const {
  Order,
  OrderItem,
  Cart,
  CartItem,
  Product
} = require('../models');

// Create Order
const createOrder = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      where: { userId: req.user.id }
    });

    if (!cart) {
      return res.status(400).json({
        message: 'Cart is empty'
      });
    }

    const cartItems = await CartItem.findAll({
      where: { cartId: cart.id }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty'
      });
    }

    let totalAmount = 0;

    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);

      totalAmount +=
        Number(product.price) * item.quantity;
    }

    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      shippingAddress: req.body.shippingAddress
    });

    for (const item of cartItems) {

      const product = await Product.findByPk(
        item.productId
      );

      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    await CartItem.destroy({
      where: { cartId: cart.id }
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get User Orders
const getOrders = async (req, res) => {
  try {

    const orders = await Order.findAll({
      where: {
        userId: req.user.id
      },
      include: [OrderItem]
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrders
};