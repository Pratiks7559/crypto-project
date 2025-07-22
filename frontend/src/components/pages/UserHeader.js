import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';

const UserHeader = ({ user, onEditProfile }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('/default-profile.png');

  useEffect(() => {
    if (user?.profilePicture) {
      setProfileImage(user.profilePicture.includes('http') 
        ? user.profilePicture 
        : `http://localhost:8082${user.profilePicture}`);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <div className="user-info">
        <div className="profile-header">
          <div className="profile-image-container">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-profile.png';
              }}
            />
            <button 
              className="edit-profile-btn" 
              onClick={onEditProfile}
            >
              Edit Profile
            </button>
          </div>
          <div className="user-details">
            <h1>Welcome, {user?.fullName || 'User'}!</h1>
            <p className="user-email">{user?.email}</p>
            <p className="user-mobile">{user?.mobile}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="wallet-info">
        <div className="wallet-balance">
          <span>Your Balance:</span>
          <h2>{user?.currency || '¥'} {Number(user?.balance || 0).toLocaleString()}</h2>
          <span className="crypto-balance">
            ~ {user?.cryptoBalance || 0} {user?.cryptoCurrency || 'ETH'}
          </span>
        </div>

        <div className="blockchain-badge">
          <span>Connected to Ethereum</span>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;