const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const requireAuth = require('../middleware/requireAuth');

const adminAuth = require('../middleware/adminAuth');
const adminController = require('../controllers/adminController'); // ✅ added

router.get('/me', requireAuth, async (req, res) => {
  try {
    // ✅ If admin from token
    if (req.user.role === 'admin') {
      return res.json({
        id: 'admin',
        name: 'Galaxy Admin',
        email: 'galaxy@admin',
        role: 'admin'
      });
    }

    // ✅ Normal user
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Error in /me:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/admin/users', adminAuth, adminController.getUsers);

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
});




router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/admin/users', adminAuth, adminController.getUsers); // ✅ now works


module.exports = router;
