const { Product } = require('../models');

// Get All Products
const getProducts = async (req, res) => {
  try {

    const products = await Product.findAll();

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Create Product
const createProduct = async (req, res) => {
  try {

    const product = await Product.create(req.body);

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    await product.update(req.body);

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    await product.destroy();

    res.json({
      message: 'Product deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};