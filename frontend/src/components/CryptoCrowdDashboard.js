// import React, { useEffect, useState } from 'react';
// import '../styles/Dashboard.css';
// import UserHeader from './pages/UserHeader';
// import StatsCards from './pages/StatsCards';
// import CampaignList from './pages/CampaignList';
// import TransactionsTable from './pages/TransactionsTable';
// import ProfileModal from './pages/ProfileModal';
// import CampaignForm from './pages/CampaignForm';

// const CryptoCrowdDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [profileImage, setProfileImage] = useState('');
//   const [campaigns, setCampaigns] = useState([
//     {
//       id: 1,
//       title: 'Solar Energy for Rural Areas',
//       description: 'Support clean energy with decentralized projects.',
//       status: 'active',
//       donations: 12000,
//       isMine: false,
//       category: 'environment'
//     },
//     {
//       id: 2,
//       title: 'Wind Power in Coastal Regions',
//       description: 'Help establish wind energy farms in coastal communities.',
//       status: 'active',
//       donations: 8000,
//       isMine: false,
//       category: 'environment'
//     },
//     {
//       id: 3,
//       title: 'AI for Healthcare Innovation',
//       description: 'Back AI solutions to improve patient care and diagnostics.',
//       status: 'active',
//       donations: 5000,
//       isMine: true,
//       category: 'technology'
//     },
//     {
//       id: 4,
//       title: 'Clean Water Initiative',
//       description: 'Provide clean drinking water to underserved communities.',
//       status: 'pending',
//       donations: 0,
//       isMine: true,
//       category: 'social'
//     }
//   ]);

//   const [transactions, setTransactions] = useState([
//     { id: 1, campaign: 'Wind Power in Coastal Regions', amount: 1500, date: '2025-07-18', currency: '¥' },
//     { id: 2, campaign: 'Solar Energy for Rural Areas', amount: 2000, date: '2025-07-15', currency: '¥' },
//     { id: 3, campaign: 'AI for Healthcare Innovation', amount: 1000, date: '2025-07-10', currency: 'ETH', cryptoAmount: 0.02 }
//   ]);

//   const [activeTab, setActiveTab] = useState('all');
//   const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');

//         const res = await fetch('http://localhost:8082/api/users/me', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           const errorText = await res.text();
//           throw new Error(`Fetch failed: ${errorText}`);
//         }

//         const data = await res.json();
//         setUser(data);

//         if (data.profilePicture) {
//           setProfileImage(`http://localhost:8082${data.profilePicture}`);
//         }
//       } catch (err) {
//         console.error('Error fetching profile:', err.message);
//       }
//     };

//     fetchUser();
//   }, []);

//   const totalDonations = campaigns.reduce((sum, camp) => sum + camp.donations, 0);
//   const approvedCampaigns = campaigns.filter(camp => camp.status === 'active').length;
//   const myCampaigns = campaigns.filter(camp => camp.isMine).length;

//   const handleDonate = (campaignId, amount) => {
//     alert(`Donated ${amount} to campaign ${campaignId}`);
//   };

//   const handleCreateCampaign = (newCampaign) => {
//     const newCamp = {
//       id: campaigns.length + 1,
//       ...newCampaign,
//       status: 'pending',
//       donations: 0,
//       isMine: true
//     };
//     setCampaigns([...campaigns, newCamp]);
//     setShowNewCampaignForm(false);
//   };

//   const handleProfileUpdate = async (updatedProfile, newImageFile) => {
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
//     formData.append('fullName', updatedProfile.fullName);
//     formData.append('email', updatedProfile.email);
//     formData.append('mobile', updatedProfile.mobile);
//     if (newImageFile) {
//       formData.append('profilePicture', newImageFile);
//     }

//     try {
//       const response = await fetch('http://localhost:8082/api/users/update-profile', {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         const updatedUser = await response.json();
//         setUser(updatedUser);
//         if (updatedUser.profilePicture) {
//           setProfileImage(`http://localhost:8082${updatedUser.profilePicture}`);
//         }
//         alert('Profile updated successfully!');
//       } else {
//         alert('Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Update failed:', error);
//     }

//     setShowProfileModal(false);
//   };

//   const handlePasswordChange = async (currentPassword, newPassword) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch('http://localhost:8082/api/users/change-password', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ currentPassword, newPassword }),
//       });

//       if (response.ok) {
//         alert('Password changed successfully!');
//       } else {
//         const msg = await response.text();
//         alert(`Failed: ${msg}`);
//       }
//     } catch (err) {
//       console.error('Error changing password:', err);
//     }
//   };

//   if (!user) {
//     return <div>Loading dashboard...</div>;
//   }

//   return (
//     <div className="dashboard">
//       <UserHeader
//         user={user}
//         profileImage={profileImage}
//         onEditProfile={() => setShowProfileModal(true)}
//       />

//       <StatsCards
//         user={user}
//         totalDonations={totalDonations}
//         myCampaigns={myCampaigns}
//         approvedCampaigns={approvedCampaigns}
//       />

//       <div className="main-content">
//         <CampaignList
//           campaigns={campaigns}
//           user={user}
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           onCreateCampaign={() => setShowNewCampaignForm(true)}
//           onDonate={handleDonate}
//         />

//         {showNewCampaignForm && (
//           <CampaignForm
//             onCancel={() => setShowNewCampaignForm(false)}
//             onCreate={handleCreateCampaign}
//           />
//         )}

//         <TransactionsTable transactions={transactions} />
//       </div>

//       {showProfileModal && (
//         <ProfileModal
//           user={user}
//           profileImage={profileImage}
//           onClose={() => setShowProfileModal(false)}
//           onSaveProfile={handleProfileUpdate}
//           onChangePassword={handlePasswordChange}
//         />
//       )}
//     </div>
//   );
// };


// export default CryptoCrowdDashboard;
import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import UserHeader from './pages/UserHeader';
import ProfileModal from './pages/ProfileModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CryptoCrowdDashboard = () => {
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:8082/api/users/me');
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch profile');
      }

      return response.user;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  };

  const loadProfile = async () => {
    setLoading(true);
    try {
      const userData = await fetchUserProfile();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [navigate]);

  const handleProfileUpdate = async (updatedProfile, newImageFile) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('fullName', updatedProfile.fullName);
      formData.append('email', updatedProfile.email);
      formData.append('mobile', updatedProfile.mobile);
      
      if (newImageFile) {
        formData.append('profilePicture', newImageFile);
      }

      const response = await fetch('http://localhost:8082/api/users/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setShowProfileModal(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  const handlePasswordChange = async (currentPassword, newPassword) => {
    try {
      await fetchWithAuth('http://localhost:8082/api/users/change-password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword })
      });
      toast.success('Password changed successfully!');
      return true;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button 
          className="retry-button" 
          onClick={loadProfile}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-container">
        <div className="error-message">No user data available</div>
        <button 
          className="retry-button" 
          onClick={loadProfile}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="profile-dashboard">
      <UserHeader
        user={user}
        onEditProfile={() => setShowProfileModal(true)}
      />

      {showProfileModal && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfileModal(false)}
          onSaveProfile={handleProfileUpdate}
          onChangePassword={handlePasswordChange}
        />
      )}
    </div>
  );
};

export default CryptoCrowdDashboard;