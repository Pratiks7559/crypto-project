import User from '../models/User.js';
import bcrypt from 'bcryptjs';




export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password -__v -createdAt -updatedAt')
      .lean();

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      user: {
        ...user,
        profilePicture: user.profilePicture 
          ? `${process.env.BASE_URL || 'http://localhost:8082'}${user.profilePicture}`
          : null
      }
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, mobile } = req.body;
    const updates = { fullName, email, mobile };

    if (req.file) {
      updates.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password -__v');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};