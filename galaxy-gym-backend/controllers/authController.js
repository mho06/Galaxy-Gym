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

  // ❌ Prevent anyone from signing up as admin
  if (email.toLowerCase() === 'galaxy@admin') {
    return res.status(403).json({ error: 'This email is reserved for the admin account.' });
  }

  try {
    const user = await User.create({ name, email, password });

    const token = createToken(user._id, user.role);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // ❗ set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({ user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    const message = err.code === 11000 ? 'Email already registered' : err.message;
    res.status(400).json({ error: message });
  }
};

// @route   POST /api/auth/login
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Special case for admin
    if (email.toLowerCase() === 'galaxy@admin') {
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }

  const token = createToken('admin', 'admin');
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000
  });

  console.log('✅ Admin logged in'); // DEBUG

  return res.status(200).json({
    user: {
      id: 'admin',
      name: 'Galaxy Admin',
      email: 'galaxy@admin',
      role: 'admin' // VERY IMPORTANT
    }
  });
}


    // ✅ Normal user login
    const user = await User.login(email, password);
    const token = createToken(user._id, user.role);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// @route   POST /api/auth/logout
exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};
