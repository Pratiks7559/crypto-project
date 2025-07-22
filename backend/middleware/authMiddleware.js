

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Session from '../models/Session.js';


export const authenticate = async (req, res, next) => {
  try {
    let token;
    
    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized, no token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, "token");
    
    // Check session
    const session = await Session.findOne({ 
      sessionId: token,
      userId: decoded.userId
    });
    
    if (!session) {
      return res.status(401).json({
        success: false,
        error: 'Session expired or invalid'
      });
    }

    // Get user and attach to request
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    req.user = {
      userId: user._id,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      error: 'Not authorized',
      message: error.message
    });
  }
};
