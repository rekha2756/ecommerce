const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id)
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (user && await user.comparePassword(password)) {
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id)
      });
    }

    res.status(401).json({
      message: 'Invalid email or password'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {

    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ['password']
      }
    });

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};