const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    defaultValue: 'Other',
  },

  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://via.placeholder.com/300',
  },
});

module.exports = Product;