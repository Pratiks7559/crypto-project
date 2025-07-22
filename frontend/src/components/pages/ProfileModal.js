// import React, { useState, useEffect } from 'react';

// const ProfileModal = ({ onClose }) => {
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   const [profileData, setProfileData] = useState({
//     fullName: '',
//     email: '',
//     mobile: ''
//   });

//   const [profileImage, setProfileImage] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   // Fetch user data on mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch('http://localhost:8082/api/users/me', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         if (!res.ok) throw new Error('Failed to fetch user profile');

//         const data = await res.json();
//         setProfileData({
//           fullName: data.fullName,
//           email: data.email,
//           mobile: data.mobile
//         });

//         // Convert relative image path to full URL
//         if (data.profileImage) {
//           setProfileImage(`http://localhost:8082/${data.profileImage}`);
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         alert('Unable to load profile.');
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setSelectedImage(file);
//   };

//   const handleSaveProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
//       formData.append('fullName', profileData.fullName);
//       formData.append('email', profileData.email);
//       formData.append('mobile', profileData.mobile);
//       if (selectedImage) {
//         formData.append('profilePicture', selectedImage);
//       }

//       const res = await fetch('http://localhost:8082/api/users/update-profile', {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formData
//       });

//       if (res.ok) {
//         alert('Profile updated successfully!');
//         window.location.reload();
//       } else {
//         const msg = await res.text();
//         alert('Update failed: ' + msg);
//       }
//     } catch (error) {
//       console.error('Update error:', error);
//       alert('Error updating profile');
//     }
//   };

//   const handlePasswordChange = async () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("New passwords don't match!");
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch('http://localhost:8082/api/users/change-password', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         })
//       });

//       if (res.ok) {
//         alert('Password changed successfully!');
//         setShowChangePassword(false);
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         });
//       } else {
//         const msg = await res.text();
//         alert('Password change failed: ' + msg);
//       }
//     } catch (error) {
//       console.error('Password change error:', error);
//       alert('Error changing password');
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h2>Edit Profile</h2>
//           <button className="close-btn" onClick={onClose}>&times;</button>
//         </div>

//         <div className="modal-body">
//           {!showChangePassword ? (
//             <>
//               <div className="profile-image-upload">
//                 <img
//                   src={
//                     selectedImage
//                       ? URL.createObjectURL(selectedImage)
//                       : profileImage || '/default-avatar.png'
//                   }
//                   alt="Profile"
//                   className="profile-image-large"
//                 />
//                 <div className="upload-controls">
//                   <label htmlFor="profile-upload" className="upload-btn">
//                     Change Photo
//                   </label>
//                   <input
//                     id="profile-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     style={{ display: 'none' }}
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   value={profileData.fullName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, fullName: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={profileData.email}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, email: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Mobile</label>
//                 <input
//                   type="tel"
//                   value={profileData.mobile}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, mobile: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="form-actions">
//                 <button
//                   className="secondary"
//                   onClick={() => setShowChangePassword(true)}
//                 >
//                   Change Password
//                 </button>
//                 <div>
//                   <button className="cancel-btn" onClick={onClose}>
//                     Cancel
//                   </button>
//                   <button className="save-btn" onClick={handleSaveProfile}>
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3>Change Password</h3>

//               <div className="form-group">
//                 <label>Current Password</label>
//                 <input
//                   type="password"
//                   value={passwordData.currentPassword}
//                   onChange={(e) =>
//                     setPasswordData({ ...passwordData, currentPassword: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="form-group">
//                 <label>New Password</label>
//                 <input
//                   type="password"
//                   value={passwordData.newPassword}
//                   onChange={(e) =>
//                     setPasswordData({ ...passwordData, newPassword: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Confirm New Password</label>
//                 <input
//                   type="password"
//                   value={passwordData.confirmPassword}
//                   onChange={(e) =>
//                     setPasswordData({ ...passwordData, confirmPassword: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="form-actions">
//                 <button
//                   className="back-btn"
//                   onClick={() => setShowChangePassword(false)}
//                 >
//                   Back to Profile
//                 </button>
//                 <button className="save-btn" onClick={handlePasswordChange}>
//                   Change Password
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/profilemodal.css';

const ProfileModal = ({ user, onClose, onSaveProfile, onChangePassword }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        mobile: user.mobile || ''
      });
      setPreviewImage(user.profilePicture || '');
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setValidationErrors(prev => ({
          ...prev,
          profilePicture: 'Please select a valid image file'
        }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          profilePicture: 'Image size should be less than 2MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
      setValidationErrors(prev => ({ ...prev, profilePicture: '' }));
    }
  };

  const validateProfileForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.mobile && !/^[0-9]{10,15}$/.test(formData.mobile)) {
      errors.mobile = 'Please enter a valid mobile number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;
    
    setIsLoading(true);
    try {
      await onSaveProfile(formData, imageFile);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;
    
    setIsLoading(true);
    try {
      const success = await onChangePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      if (success) {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button 
          className="close-button" 
          onClick={onClose}
          disabled={isLoading}
        >
          &times;
        </button>
        
        <div className="modal-tabs">
          <button 
            type="button"
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            disabled={isLoading}
          >
            Profile
          </button>
          <button 
            type="button"
            className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
            disabled={isLoading}
          >
            Password
          </button>
        </div>

        {activeTab === 'profile' ? (
          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label>Profile Picture</label>
              <div className="image-upload-container">
                <div className="profile-preview-container">
                  <img 
                    src={previewImage || '/default-profile.png'} 
                    alt="Profile" 
                    className="profile-preview"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-profile.png';
                    }}
                  />
                </div>
                <label className="upload-label">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    disabled={isLoading}
                    style={{ display: 'none' }}
                  />
                  {imageFile ? 'Change Image' : 'Choose Image'}
                </label>
              </div>
              {validationErrors.profilePicture && (
                <div className="error-message">{validationErrors.profilePicture}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {validationErrors.fullName && (
                <div className="error-message">{validationErrors.fullName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {validationErrors.email && (
                <div className="error-message">{validationErrors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Optional"
              />
              {validationErrors.mobile && (
                <div className="error-message">{validationErrors.mobile}</div>
              )}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
              {validationErrors.currentPassword && (
                <div className="error-message">{validationErrors.currentPassword}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
              {validationErrors.newPassword && (
                <div className="error-message">{validationErrors.newPassword}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
              {validationErrors.confirmPassword && (
                <div className="error-message">{validationErrors.confirmPassword}</div>
              )}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Change Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

ProfileModal.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    profilePicture: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSaveProfile: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired
};

export default ProfileModal;