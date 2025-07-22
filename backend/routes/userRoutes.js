import express from 'express';
import { 
  getUserProfile, 
  updateProfile, 
  changePassword 
} from '../controller/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import upload from '../config/multer.js';

const router = express.Router();

// Apply authentication middleware to all user routes
router.use(authenticate);

// Get current user profile
router.get('/me', getUserProfile);

// Update user profile
router.put('/update-profile', upload.single('profilePicture'), updateProfile);

// Change password
router.put('/change-password', changePassword);

export default router;