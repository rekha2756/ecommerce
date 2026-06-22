const sequelize = require('../config/database');

const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const { Cart, CartItem } = require('./Cart');


// USER ↔ ORDER
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });


// ORDER ↔ ORDER ITEM
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });


// PRODUCT ↔ ORDER ITEM
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });


// USER ↔ CART
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });


// CART ↔ CART ITEM
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });


// PRODUCT ↔ CART ITEM
Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });


const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connected');

    await sequelize.sync({ alter: true });

    console.log('✅ Tables Synced');

    return true;
  } catch (error) {
    console.error('❌ Database Error:', error.message);
    return false;
  }
};

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
  syncDatabase,
};