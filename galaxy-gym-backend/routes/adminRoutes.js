const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const adminController = require('../controllers/adminController');

// GET all users
router.get('/users', adminAuth, adminController.getUsers);

module.exports = router;
