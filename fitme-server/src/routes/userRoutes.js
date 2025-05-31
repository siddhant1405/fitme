const express = require('express');
const User = require('../models/user');
const router = express.Router();
const {
  registerUser,
  loginUser,
  completeOnboarding,
  updateProfile
} = require('../controllers/userController');

const dashboardController = require('../controllers/dashboardController');

const auth = require('../middlewares/authMiddleware'); // JWT auth middleware
const upload = require('../middlewares/upload');       // Multer config

// =============================
// Auth & Registration Routes
// =============================

// Register new user
// POST /api/users/register
router.post('/register', registerUser);

// Login existing user
// POST /api/users/login
router.post('/login', loginUser);


// =============================
// User Info Routes (Protected)
// =============================

// Complete onboarding (profile setup)
// POST /api/users/onboarding
router.post('/onboarding', auth, completeOnboarding);

// Update profile details & image
// PATCH /api/users/profile
router.patch('/profile', auth, upload.single('userImage'), updateProfile);
// Get current user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Dashboard data
router.get('/dashboard', auth, dashboardController.getDashboard);

// Add or update daily log
router.post('/log', auth, dashboardController.upsertDailyLog);

module.exports = router;
