const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const requireAuth = require('../middleware/requireAuth');


router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user); // ✅ name, role, _id
  } catch (err) {
    console.error('Error in /me:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);


module.exports = router;
