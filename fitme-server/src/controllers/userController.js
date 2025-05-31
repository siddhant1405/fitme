const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==========================
// Register a new user
// ==========================
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userImage: '' // optional, can be updated later
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userImage: user.userImage || ''
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ==========================
// Login User
// ==========================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userImage: user.userImage || ''
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ==========================
// Complete Onboarding
// ==========================
exports.completeOnboarding = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { dob, gender, height, weight, goal, activity } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { dob, gender, height, weight, goal, activity },
      { new: true }
    );

    res.json({ message: 'Onboarding complete', user });
  } catch (err) {
    console.error('Onboarding error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// ==========================
// Update Profile
// ==========================
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      dob,
      gender,
      height,
      weight,
      goal,
      activity
    } = req.body;

    const updatedFields = {
      dob,
      gender,
      height,
      weight,
      goal,
      activity
    };

    // ✅ If image is uploaded, set a public-facing relative URL
    if (req.file) {
      const imageUrl = `/uploads/${req.file.filename}`; // Clean and frontend-friendly
      updatedFields.userImage = imageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true }
    );

    res.json({
      message: 'Profile updated',
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        userImage: updatedUser.userImage || '',
        dob: updatedUser.dob,
        gender: updatedUser.gender,
        height: updatedUser.height,
        weight: updatedUser.weight,
        goal: updatedUser.goal,
        activity: updatedUser.activity
      }
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
