const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });

    const token = createToken(user._id, user.role);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    });

    res.status(201).json({ user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    const message = err.code === 11000 ? 'Email already registered' : err.message;
    res.status(400).json({ error: message });
  }
};

// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.role);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @route   POST /api/auth/logout
exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};
