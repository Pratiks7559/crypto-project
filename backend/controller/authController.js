import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Session from '../models/Session.js';
import bcrypt from 'bcryptjs';

const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjk4NjIyNjAwLCJleHAiOjE2OTg2MjYyMDB9.jg6D8g8WvUJ7xBejLwBpBqvZ-C0xA_vc_vOKsdhDLyk";
const JWT_EXPIRES_IN = '20h' || '1h';

// Validate email format
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password strength
const isStrongPassword = (password) => {
  return password.length >= 8;
};

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, mobile } = req.body;

    // Input validation
    if (!fullName || !email || !password || !mobile) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields are required' 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide a valid email address' 
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ 
        success: false,
        error: 'Password must be at least 8 characters long' 
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        error: 'Email already in use' 
      });
    }

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password,
      mobile,
      profilePicture: req.file 
        ? `/uploads/profile-pictures/${req.file.filename}`
        : null
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role 
      }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Create session
    await new Session({
      sessionId: token,
      userId: newUser._id,
      email: newUser.email,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      expiresAt: new Date(Date.now() + 3600000) // 1 hour
    }).save();

    // Omit sensitive data from response
    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      mobile: newUser.mobile,
      profilePicture: newUser.profilePicture,
      role: newUser.role
    };

    res.status(201).json({ 
      success: true,
      message: 'Registration successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Registration failed. Please try again later.' 
    });
  }
}

export const login = async (req, res) => {
  try {
    console.log('Login request received:', req.body); // Debug log

    // Validate input
    if (!req.body.email || !req.body.password) {
      console.log('Missing email or password');
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find user (case insensitive)
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${req.body.email}$`, 'i') } 
    }).select('+password'); // Include password field

    if (!user) {
      console.log('User not found:', req.body.email);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', user.email);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role || 'user'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Create session
    const session = new Session({
      sessionId: token,
      userId: user._id,
      email: user.email,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      expiresAt: new Date(Date.now() + 3600000) // 1 hour
    });

    await session.save();

    // Prepare response without sensitive data
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role || 'user',
      profilePicture: user.profilePicture,
      balance: user.balance,
      currency: user.currency,
      cryptoBalance: user.cryptoBalance,
      cryptoCurrency: user.cryptoCurrency
    };

    console.log('Login successful for:', user.email); // Debug log
    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};