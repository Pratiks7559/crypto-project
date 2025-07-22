// import React, { useState, useEffect } from 'react';
// import '../styles/AdminDashboard.css';

// const AdminDashboard = () => {
//   const [pendingCampaigns, setPendingCampaigns] = useState([]);
//   const [myCampaigns, setMyCampaigns] = useState([]);
//   const [stats, setStats] = useState({
//     totalDonations: 0,
//     totalUsers: 0,
//     totalCampaigns: 0,
//     activeCampaigns: 0
//   });

//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;
//   const [isLoading, setIsLoading] = useState(true);
//   const [socket, setSocket] = useState(null);

//   // Simulated API functions - replace with actual API calls
//   const fetchData = async () => {
//     try {
//       // Simulate API calls with timeout
//       setIsLoading(true);
      
//       // Fetch users
//       const usersResponse = await simulateAPICall('/api/users', {
//         data: generateMockUsers(50),
//         delay: 800
//       });
//       setUsers(usersResponse.data);
//       setFilteredUsers(usersResponse.data);
      
//       // Fetch campaigns
//       const campaignsResponse = await simulateAPICall('/api/campaigns', {
//         data: generateMockCampaigns(),
//         delay: 600
//       });
//       setMyCampaigns(campaignsResponse.data.myCampaigns);
//       setPendingCampaigns(campaignsResponse.data.pendingCampaigns);
      
//       // Fetch stats
//       const statsResponse = await simulateAPICall('/api/stats', {
//         data: {
//           totalDonations: 4200000,
//           totalUsers: usersResponse.data.length,
//           totalCampaigns: campaignsResponse.data.myCampaigns.length + 
//                          campaignsResponse.data.pendingCampaigns.length,
//           activeCampaigns: campaignsResponse.data.myCampaigns.filter(c => c.status === 'active').length
//         },
//         delay: 400
//       });
//       setStats(statsResponse.data);
      
//       setIsLoading(false);
      
//       // Set up WebSocket for real-time updates
//       setupWebSocket();
      
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setIsLoading(false);
//     }
//   };

//   // Simulate WebSocket connection
//   const setupWebSocket = () => {
//     // In a real app, you would connect to your WebSocket server
//     console.log('Setting up WebSocket connection...');
//     const ws = {
//       onmessage: null,
//       close: () => console.log('WebSocket closed')
//     };
    
//     // Simulate receiving real-time updates
//     const interval = setInterval(() => {
//       if (ws.onmessage) {
//         const randomUpdate = generateRandomUpdate();
//         ws.onmessage({ data: JSON.stringify(randomUpdate) });
//       }
//     }, 5000);
    
//     setSocket({
//       ...ws,
//       close: () => {
//         clearInterval(interval);
//         console.log('WebSocket closed');
//       }
//     });
    
//     return () => {
//       clearInterval(interval);
//       ws.close();
//     };
//   };

//   // Handle WebSocket messages
//   const handleWebSocketMessage = (message) => {
//     const data = JSON.parse(message.data);
//     console.log('WebSocket update:', data);
    
//     if (data.type === 'new_user') {
//       setUsers(prev => [data.user, ...prev]);
//       setFilteredUsers(prev => [data.user, ...prev]);
//       setStats(prev => ({
//         ...prev,
//         totalUsers: prev.totalUsers + 1
//       }));
//     }
    
//     if (data.type === 'campaign_approved') {
//       setPendingCampaigns(prev => prev.filter(c => c.id !== data.campaignId));
//       setMyCampaigns(prev => [
//         ...prev,
//         data.campaign
//       ]);
//       setStats(prev => ({
//         ...prev,
//         activeCampaigns: prev.activeCampaigns + 1
//       }));
//     }
//   };

//   useEffect(() => {
//     fetchData();
    
//     return () => {
//       if (socket) {
//         socket.close();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.onmessage = handleWebSocketMessage;
//     }
//   }, [socket, users, pendingCampaigns, myCampaigns]);

//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredUsers(users);
//     } else {
//       const filtered = users.filter(user =>
//         user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.mobile.includes(searchTerm)
//       );
//       setFilteredUsers(filtered);
//     }
//     setCurrentPage(1);
//   }, [searchTerm, users]);

//   const handleApprove = async (campaignId) => {
//     try {
//       // Simulate API call
//       await simulateAPICall(`/api/campaigns/${campaignId}/approve`, {
//         data: { success: true },
//         delay: 500
//       });
      
//       const approvedCampaign = pendingCampaigns.find(c => c.id === campaignId);
//       setPendingCampaigns(pendingCampaigns.filter(camp => camp.id !== campaignId));
//       setMyCampaigns(prev => [
//         ...prev,
//         {
//           ...approvedCampaign,
//           status: 'active',
//           raised: 0
//         }
//       ]);
//       setStats(prev => ({
//         ...prev,
//         activeCampaigns: prev.activeCampaigns + 1
//       }));
      
//       alert(`Campaign ${campaignId} approved`);
//     } catch (error) {
//       alert(`Failed to approve campaign: ${error.message}`);
//     }
//   };

//   const handleReject = async (campaignId) => {
//     try {
//       // Simulate API call
//       await simulateAPICall(`/api/campaigns/${campaignId}/reject`, {
//         data: { success: true },
//         delay: 500
//       });
      
//       setPendingCampaigns(pendingCampaigns.filter(camp => camp.id !== campaignId));
//       alert(`Campaign ${campaignId} rejected`);
//     } catch (error) {
//       alert(`Failed to reject campaign: ${error.message}`);
//     }
//   };

//   // Pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="admin-dashboard">
//       <header className="dashboard-header">
//         <div className="logo">
//           <h1>Crypto-Crowd</h1>
//           <span>Admin Dashboard</span>
//         </div>
//         <div className="user-info">
//           <span>Welcome, Admin!</span>
//           <button className="logout-btn">Logout</button>
//         </div>
//       </header>

//       <div className="dashboard-subheader">
//         <p>Here's an overview of the key statistics and campaign approvals.</p>
//         {socket && <span className="realtime-badge">Realtime Updates Active</span>}
//       </div>

//       <div className="stats-container">
//         <div className="stat-card">
//           <h3>Total Donations</h3>
//           <p>₹ {stats.totalDonations.toLocaleString('en-IN')}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Total Users</h3>
//           <p>{stats.totalUsers.toLocaleString('en-IN')}</p>
//           {stats.totalUsers > 0 && (
//             <small>+{Math.floor(stats.totalUsers / 20)} new today</small>
//           )}
//         </div>
//         <div className="stat-card">
//           <h3>Total Campaigns</h3>
//           <p>{stats.totalCampaigns.toLocaleString('en-IN')}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Active Campaigns</h3>
//           <p>{stats.activeCampaigns.toLocaleString('en-IN')}</p>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="pending-approvals">
//           <h2>Pending Campaign Approvals</h2>
//           {isLoading ? (
//             <div className="loading-spinner"></div>
//           ) : pendingCampaigns.length === 0 ? (
//             <p className="no-pending">No pending campaigns for approval</p>
//           ) : (
//             pendingCampaigns.map(campaign => (
//               <div key={campaign.id} className="approval-card">
//                 <div className="campaign-info">
//                   <h3>{campaign.title}</h3>
//                   <p>{campaign.description}</p>
//                   <span className="category-badge">{campaign.category}</span>
//                 </div>
//                 <div className="approval-actions">
//                   <button 
//                     className="approve-btn"
//                     onClick={() => handleApprove(campaign.id)}
//                   >
//                     Approve
//                   </button>
//                   <button 
//                     className="reject-btn"
//                     onClick={() => handleReject(campaign.id)}
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="my-campaigns">
//           <h2>My Campaigns</h2>
//           {isLoading ? (
//             <div className="loading-spinner"></div>
//           ) : (
//             <table className="campaigns-table">
//               <thead>
//                 <tr>
//                   <th>Campaign</th>
//                   <th>Raised</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {myCampaigns.map(campaign => (
//                   <tr key={campaign.id}>
//                     <td>{campaign.title}</td>
//                     <td>₹ {campaign.raised.toLocaleString('en-IN')}</td>
//                     <td>
//                       <span className={`status-badge ${campaign.status}`}>
//                         {campaign.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       <div className="users-section">
//         <div className="section-header">
//           <h2>Registered Users ({stats.totalUsers})</h2>
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search users by name, email or mobile"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               disabled={isLoading}
//             />
//             <span className="search-icon">🔍</span>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="loading-spinner"></div>
//         ) : (
//           <>
//             <div className="table-container">
//               <table className="users-table">
//                 <thead>
//                   <tr>
//                     <th>Profile</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Mobile</th>
//                     <th>Joined</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentUsers.length > 0 ? (
//                     currentUsers.map(user => (
//                       <tr key={user.id}>
//                         <td>
//                           <img 
//                             src={user.profile_picture} 
//                             alt={user.full_name} 
//                             className="user-avatar"
//                           />
//                         </td>
//                         <td>{user.full_name}</td>
//                         <td>{user.email}</td>
//                         <td>{user.mobile}</td>
//                         <td>{new Date(user.created_at).toLocaleDateString()}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="no-results">
//                         No users found matching your search
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {filteredUsers.length > usersPerPage && (
//               <div className="pagination">
//                 <button 
//                   onClick={() => paginate(currentPage - 1)} 
//                   disabled={currentPage === 1}
//                 >
//                   Previous
//                 </button>
//                 {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//                   // Show only 5 pages at a time
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (currentPage >= totalPages - 2) {
//                     pageNum = totalPages - 4 + i;
//                   } else {
//                     pageNum = currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => paginate(pageNum)}
//                       className={currentPage === pageNum ? 'active' : ''}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//                 <button 
//                   onClick={() => paginate(currentPage + 1)} 
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // Helper functions for simulation
// const simulateAPICall = (endpoint, { data, delay = 500 }) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`API call to ${endpoint} succeeded`);
//       resolve({ data });
//     }, delay);
//   });
// };

// const generateMockUsers = (count) => {
//   const mockUsers = [];
//   for (let i = 1; i <= count; i++) {
//     const gender = Math.random() > 0.5 ? 'men' : 'women';
//     mockUsers.push({
//       id: i,
//       full_name: `User ${i}`,
//       email: `user${i}@example.com`,
//       mobile: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
//       profile_picture: `https://randomuser.me/api/portraits/${gender}/${i % 100}.jpg`,
//       created_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
//     });
//   }
//   return mockUsers;
// };

// const generateMockCampaigns = () => {
//   const categories = ['environment', 'technology', 'education', 'health', 'social'];
//   const myCampaigns = [];
//   const pendingCampaigns = [];
  
//   for (let i = 1; i <= 8; i++) {
//     const category = categories[Math.floor(Math.random() * categories.length)];
//     myCampaigns.push({
//       id: i,
//       title: `Campaign ${i}`,
//       raised: Math.floor(Math.random() * 2000000),
//       status: 'active',
//       category
//     });
//   }
  
//   for (let i = 9; i <= 12; i++) {
//     const category = categories[Math.floor(Math.random() * categories.length)];
//     pendingCampaigns.push({
//       id: i,
//       title: `Pending Campaign ${i}`,
//       description: `This is a description for pending campaign ${i}`,
//       category
//     });
//   }
  
//   return { myCampaigns, pendingCampaigns };
// };

// const generateRandomUpdate = () => {
//   const updateTypes = ['new_user', 'campaign_approved'];
//   const type = updateTypes[Math.floor(Math.random() * updateTypes.length)];
  
//   if (type === 'new_user') {
//     const gender = Math.random() > 0.5 ? 'men' : 'women';
//     const id = Math.floor(Math.random() * 1000) + 100;
//     return {
//       type,
//       user: {
//         id,
//         full_name: `New User ${id}`,
//         email: `newuser${id}@example.com`,
//         mobile: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
//         profile_picture: `https://randomuser.me/api/portraits/${gender}/${id % 100}.jpg`,
//         created_at: new Date().toISOString()
//       }
//     };
//   } else {
//     const categories = ['environment', 'technology', 'education', 'health', 'social'];
//     const category = categories[Math.floor(Math.random() * categories.length)];
//     const id = Math.floor(Math.random() * 1000) + 100;
//     return {
//       type,
//       campaignId: id,
//       campaign: {
//         id,
//         title: `New Campaign ${id}`,
//         raised: 0,
//         status: 'active',
//         category
//       }
//     };
//   }
// };

// export default AdminDashboard;


import React, { useState, useEffect, useCallback } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import '../styles/AdminDashboard.css';
import { format } from 'date-fns';

Chart.register(...registerables);

const AdminDashboard = () => {
  // State for all dashboard data
  const [dashboardData, setDashboardData] = useState({
    pendingCampaigns: [],
    myCampaigns: [],
    stats: {
      totalDonations: 0,
      totalUsers: 0,
      totalCampaigns: 0,
      activeCampaigns: 0,
      pendingApprovals: 0,
      recentDonations: 0,
      avgDonation: 0
    },
    users: [],
    donations: [],
    transactions: [],
    analytics: {
      userGrowth: [],
      donationTrends: [],
      campaignPerformance: []
    }
  });

  // UI and filter states
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignSearchTerm, setCampaignSearchTerm] = useState('');
  const [transactionSearchTerm, setTransactionSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentCampaignPage, setCurrentCampaignPage] = useState(1);
  const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [userFilter, setUserFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });

  // Fetch all dashboard data
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Simulate fetching all data with Promise.all
      const [
        usersResponse, 
        campaignsResponse, 
        statsResponse,
        donationsResponse,
        transactionsResponse,
        analyticsResponse
      ] = await Promise.all([
        simulateAPICall('/api/users', {
          data: generateMockUsers(150),
          delay: 800
        }),
        simulateAPICall('/api/campaigns', {
          data: generateMockCampaigns(),
          delay: 600
        }),
        simulateAPICall('/api/stats', {
          data: generateStats(),
          delay: 400
        }),
        simulateAPICall('/api/donations', {
          data: generateMockDonations(200),
          delay: 500
        }),
        simulateAPICall('/api/transactions', {
          data: generateMockTransactions(300),
          delay: 500
        }),
        simulateAPICall('/api/analytics', {
          data: generateAnalyticsData(),
          delay: 600
        })
      ]);

      setDashboardData({
        pendingCampaigns: campaignsResponse.data.pendingCampaigns,
        myCampaigns: campaignsResponse.data.myCampaigns,
        stats: statsResponse.data,
        users: usersResponse.data,
        donations: donationsResponse.data,
        transactions: transactionsResponse.data,
        analytics: analyticsResponse.data
      });

      setFilteredUsers(usersResponse.data);
      setFilteredCampaigns(campaignsResponse.data.myCampaigns);
      setFilteredTransactions(transactionsResponse.data);
      
      setIsLoading(false);
      
      // Set up WebSocket for real-time updates
      setupWebSocket();
      
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('Failed to load dashboard data', 'error');
      setIsLoading(false);
    }
  }, []);

  // WebSocket setup
  const setupWebSocket = () => {
    console.log('Setting up WebSocket connection...');
    const ws = {
      onmessage: null,
      close: () => console.log('WebSocket closed')
    };
    
    // Simulate receiving real-time updates
    const interval = setInterval(() => {
      if (ws.onmessage) {
        const randomUpdate = generateRandomUpdate();
        ws.onmessage({ data: JSON.stringify(randomUpdate) });
        
        // Show notification for important updates
        if (randomUpdate.type === 'new_donation' && randomUpdate.amount > 50000) {
          showNotification(`New large donation: ₹${randomUpdate.amount.toLocaleString('en-IN')} to ${randomUpdate.campaignTitle}`, 'success');
        }
      }
    }, 5000);
    
    setSocket({
      ...ws,
      close: () => {
        clearInterval(interval);
        console.log('WebSocket closed');
      }
    });
    
    return () => {
      clearInterval(interval);
      ws.close();
    };
  };

  // Handle WebSocket messages
  const handleWebSocketMessage = (message) => {
    const data = JSON.parse(message.data);
    console.log('WebSocket update:', data);
    
    setDashboardData(prev => {
      const newData = {...prev};
      
      if (data.type === 'new_user') {
        newData.users = [data.user, ...prev.users];
        newData.stats.totalUsers += 1;
        showNotification(`New user registered: ${data.user.full_name}`, 'info');
      }
      
      if (data.type === 'campaign_approved') {
        newData.pendingCampaigns = prev.pendingCampaigns.filter(c => c.id !== data.campaignId);
        newData.myCampaigns = [...prev.myCampaigns, data.campaign];
        newData.stats.activeCampaigns += 1;
      }
      
      if (data.type === 'new_donation') {
        newData.donations = [data.donation, ...prev.donations];
        newData.transactions = [data.transaction, ...prev.transactions];
        newData.stats.totalDonations += data.donation.amount;
        newData.stats.recentDonations += 1;
        
        // Update campaign raised amount
        newData.myCampaigns = prev.myCampaigns.map(campaign => {
          if (campaign.id === data.donation.campaignId) {
            return {
              ...campaign,
              raised: campaign.raised + data.donation.amount
            };
          }
          return campaign;
        });
      }
      
      return newData;
    });
  };

  // Notification system
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Filter handlers
  const applyFilters = useCallback(() => {
    // Filter users
    let usersResult = dashboardData.users;
    if (searchTerm.trim() !== '') {
      usersResult = usersResult.filter(user =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile.includes(searchTerm)
      );
    }
    if (userFilter !== 'all') {
      usersResult = usersResult.filter(user => user.status === userFilter);
    }
    setFilteredUsers(usersResult);
    setCurrentUserPage(1);

    // Filter campaigns
    let campaignsResult = dashboardData.myCampaigns;
    if (campaignSearchTerm.trim() !== '') {
      campaignsResult = campaignsResult.filter(campaign =>
        campaign.title.toLowerCase().includes(campaignSearchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(campaignSearchTerm.toLowerCase())
      );
    }
    if (campaignFilter !== 'all') {
      campaignsResult = campaignsResult.filter(campaign => campaign.status === campaignFilter);
    }
    setFilteredCampaigns(campaignsResult);
    setCurrentCampaignPage(1);

    // Filter transactions
    let transactionsResult = dashboardData.transactions;
    if (transactionSearchTerm.trim() !== '') {
      transactionsResult = transactionsResult.filter(transaction =>
        transaction.id.toString().includes(transactionSearchTerm) ||
        transaction.userName.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
        transaction.campaignTitle.toLowerCase().includes(transactionSearchTerm.toLowerCase())
      );
    }
    if (transactionFilter !== 'all') {
      transactionsResult = transactionsResult.filter(transaction => transaction.status === transactionFilter);
    }
    // Date range filter
    transactionsResult = transactionsResult.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setFilteredTransactions(transactionsResult);
    setCurrentTransactionPage(1);
  }, [
    dashboardData, 
    searchTerm, 
    campaignSearchTerm, 
    transactionSearchTerm, 
    userFilter, 
    campaignFilter, 
    transactionFilter,
    dateRange
  ]);

  // Initialize and apply filters when data or filters change
  useEffect(() => {
    if (dashboardData.users.length > 0) {
      applyFilters();
    }
  }, [dashboardData, applyFilters]);

  // Initialize data and clean up
  useEffect(() => {
    fetchData();
    
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [fetchData]);

  // Set up WebSocket message handler
  useEffect(() => {
    if (socket) {
      socket.onmessage = handleWebSocketMessage;
    }
  }, [socket]);

  // Campaign approval handlers
  const handleApprove = async (campaignId) => {
    try {
      await simulateAPICall(`/api/campaigns/${campaignId}/approve`, {
        data: { success: true },
        delay: 500
      });
      
      const approvedCampaign = dashboardData.pendingCampaigns.find(c => c.id === campaignId);
      
      setDashboardData(prev => ({
        ...prev,
        pendingCampaigns: prev.pendingCampaigns.filter(camp => camp.id !== campaignId),
        myCampaigns: [
          ...prev.myCampaigns,
          {
            ...approvedCampaign,
            status: 'active',
            raised: 0
          }
        ],
        stats: {
          ...prev.stats,
          activeCampaigns: prev.stats.activeCampaigns + 1,
          pendingApprovals: prev.stats.pendingApprovals - 1
        }
      }));
      
      showNotification(`Campaign "${approvedCampaign.title}" approved`, 'success');
    } catch (error) {
      showNotification(`Failed to approve campaign: ${error.message}`, 'error');
    }
  };

  const handleReject = async (campaignId) => {
    try {
      await simulateAPICall(`/api/campaigns/${campaignId}/reject`, {
        data: { success: true },
        delay: 500
      });
      
      setDashboardData(prev => ({
        ...prev,
        pendingCampaigns: prev.pendingCampaigns.filter(camp => camp.id !== campaignId),
        stats: {
          ...prev.stats,
          pendingApprovals: prev.stats.pendingApprovals - 1
        }
      }));
      
      showNotification('Campaign rejected', 'success');
    } catch (error) {
      showNotification(`Failed to reject campaign: ${error.message}`, 'error');
    }
  };

  const handleSuspendCampaign = async (campaignId) => {
    try {
      await simulateAPICall(`/api/campaigns/${campaignId}/suspend`, {
        data: { success: true },
        delay: 500
      });
      
      setDashboardData(prev => ({
        ...prev,
        myCampaigns: prev.myCampaigns.map(camp => 
          camp.id === campaignId ? { ...camp, status: 'suspended' } : camp
        ),
        stats: {
          ...prev.stats,
          activeCampaigns: prev.stats.activeCampaigns - 1
        }
      }));
      
      showNotification('Campaign suspended', 'success');
    } catch (error) {
      showNotification(`Failed to suspend campaign: ${error.message}`, 'error');
    }
  };

  const handleFeatureCampaign = async (campaignId, featured) => {
    try {
      await simulateAPICall(`/api/campaigns/${campaignId}/feature`, {
        data: { featured },
        delay: 500
      });
      
      setDashboardData(prev => ({
        ...prev,
        myCampaigns: prev.myCampaigns.map(camp => 
          camp.id === campaignId ? { ...camp, featured } : camp
        )
      }));
      
      showNotification(
        `Campaign ${featured ? 'added to' : 'removed from'} featured list`, 
        'success'
      );
    } catch (error) {
      showNotification(`Failed to update campaign: ${error.message}`, 'error');
    }
  };

  // User management handlers
  const handleSuspendUser = async (userId, suspend) => {
    try {
      await simulateAPICall(`/api/users/${userId}/status`, {
        data: { active: !suspend },
        delay: 500
      });
      
      setDashboardData(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === userId ? { ...user, status: suspend ? 'active' : 'suspended' } : user
        )
      }));
      
      showNotification(
        `User ${suspend ? 'reactivated' : 'suspended'}`,
        'success'
      );
    } catch (error) {
      showNotification(`Failed to update user: ${error.message}`, 'error');
    }
  };

  // Pagination calculations
  const indexOfLastUser = currentUserPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const indexOfLastCampaign = currentCampaignPage * itemsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);
  const totalCampaignPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

  const indexOfLastTransaction = currentTransactionPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalTransactionPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Pagination handlers
  const paginateUsers = (pageNumber) => setCurrentUserPage(pageNumber);
  const paginateCampaigns = (pageNumber) => setCurrentCampaignPage(pageNumber);
  const paginateTransactions = (pageNumber) => setCurrentTransactionPage(pageNumber);

  // Chart data preparation
  const prepareChartData = () => {
    // User growth chart
    const userGrowthData = {
      labels: dashboardData.analytics.userGrowth.map(item => item.month),
      datasets: [
        {
          label: 'New Users',
          data: dashboardData.analytics.userGrowth.map(item => item.count),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };

    // Donation trends chart
    const donationTrendsData = {
      labels: dashboardData.analytics.donationTrends.map(item => item.week),
      datasets: [
        {
          label: 'Donations (₹)',
          data: dashboardData.analytics.donationTrends.map(item => item.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    // Campaign performance chart
    const topCampaigns = [...dashboardData.myCampaigns]
      .sort((a, b) => b.raised - a.raised)
      .slice(0, 5);
    
    const campaignPerformanceData = {
      labels: topCampaigns.map(campaign => campaign.title),
      datasets: [
        {
          label: 'Funds Raised (₹)',
          data: topCampaigns.map(campaign => campaign.raised),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    // Categories distribution
    const categories = {};
    dashboardData.myCampaigns.forEach(campaign => {
      categories[campaign.category] = (categories[campaign.category] || 0) + 1;
    });
    
    const categoriesData = {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderWidth: 1
        }
      ]
    };

    return {
      userGrowthData,
      donationTrendsData,
      campaignPerformanceData,
      categoriesData
    };
  };

  const {
    userGrowthData,
    donationTrendsData,
    campaignPerformanceData,
    categoriesData
  } = prepareChartData();

  // Render the dashboard
  return (
    <div className="admin-dashboard">
      {/* Notification system */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">
          <h1>Crypto-Crowd</h1>
          <span>Admin Dashboard</span>
        </div>
        <div className="header-controls">
          <div className="realtime-indicator">
            {socket ? (
              <>
                <span className="indicator active"></span>
                <span>Realtime Active</span>
              </>
            ) : (
              <>
                <span className="indicator inactive"></span>
                <span>Realtime Offline</span>
              </>
            )}
          </div>
          <div className="user-info">
            <img 
              src="https://randomuser.me/api/portraits/men/1.jpg" 
              alt="Admin" 
              className="admin-avatar"
            />
            <span>Admin User</span>
            <div className="dropdown">
              <button className="dropdown-btn">▼</button>
              <div className="dropdown-content">
                <a href="#profile">Profile</a>
                <a href="#settings">Settings</a>
                <button className="logout-btn">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main navigation */}
      <nav className="dashboard-nav">
        <button 
          className={currentTab === 'dashboard' ? 'active' : ''}
          onClick={() => setCurrentTab('dashboard')}
        >
          <i className="icon-dashboard"></i> Dashboard
        </button>
        <button 
          className={currentTab === 'campaigns' ? 'active' : ''}
          onClick={() => setCurrentTab('campaigns')}
        >
          <i className="icon-campaigns"></i> Campaigns
        </button>
        <button 
          className={currentTab === 'users' ? 'active' : ''}
          onClick={() => setCurrentTab('users')}
        >
          <i className="icon-users"></i> Users
        </button>
        <button 
          className={currentTab === 'transactions' ? 'active' : ''}
          onClick={() => setCurrentTab('transactions')}
        >
          <i className="icon-transactions"></i> Transactions
        </button>
        <button 
          className={currentTab === 'reports' ? 'active' : ''}
          onClick={() => setCurrentTab('reports')}
        >
          <i className="icon-reports"></i> Reports
        </button>
        <button 
          className={currentTab === 'settings' ? 'active' : ''}
          onClick={() => setCurrentTab('settings')}
        >
          <i className="icon-settings"></i> Settings
        </button>
      </nav>

      {/* Main content area */}
      <main className="dashboard-content">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Dashboard Overview Tab */}
            {currentTab === 'dashboard' && (
              <div className="dashboard-overview">
                <div className="dashboard-subheader">
                  <h2>Platform Overview</h2>
                  <p>Key metrics and recent activity across the platform</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-container">
                  <div className="stat-card primary">
                    <div className="stat-icon">₹</div>
                    <div className="stat-info">
                      <h3>Total Donations</h3>
                      <p>₹ {dashboardData.stats.totalDonations.toLocaleString('en-IN')}</p>
                      <small>+{dashboardData.stats.recentDonations} this week</small>
                    </div>
                  </div>
                  <div className="stat-card success">
                    <div className="stat-icon"><i className="icon-users"></i></div>
                    <div className="stat-info">
                      <h3>Total Users</h3>
                      <p>{dashboardData.stats.totalUsers.toLocaleString('en-IN')}</p>
                      <small>+{Math.floor(dashboardData.stats.totalUsers / 20)} new today</small>
                    </div>
                  </div>
                  <div className="stat-card warning">
                    <div className="stat-icon"><i className="icon-campaigns"></i></div>
                    <div className="stat-info">
                      <h3>Campaigns</h3>
                      <p>{dashboardData.stats.totalCampaigns.toLocaleString('en-IN')}</p>
                      <small>{dashboardData.stats.activeCampaigns} active</small>
                    </div>
                  </div>
                  <div className="stat-card danger">
                    <div className="stat-icon"><i className="icon-pending"></i></div>
                    <div className="stat-info">
                      <h3>Pending Approvals</h3>
                      <p>{dashboardData.stats.pendingApprovals}</p>
                      <small>Require attention</small>
                    </div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="charts-row">
                  <div className="chart-container">
                    <h3>User Growth</h3>
                    <Line 
                      data={userGrowthData} 
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top'
                          }
                        }
                      }} 
                    />
                  </div>
                  <div className="chart-container">
                    <h3>Donation Trends</h3>
                    <Bar 
                      data={donationTrendsData} 
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top'
                          }
                        }
                      }} 
                    />
                  </div>
                </div>

                {/* Second Charts Row */}
                <div className="charts-row">
                  <div className="chart-container">
                    <h3>Top Campaigns</h3>
                    <Bar 
                      data={campaignPerformanceData} 
                      options={{
                        indexAxis: 'y',
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top'
                          }
                        }
                      }} 
                    />
                  </div>
                  <div className="chart-container">
                    <h3>Categories Distribution</h3>
                    <Pie 
                      data={categoriesData} 
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'right'
                          }
                        }
                      }} 
                    />
                  </div>
                </div>

                {/* Recent Activity Sections */}
                <div className="activity-sections">
                  {/* Pending Approvals */}
                  <div className="activity-section">
                    <h3>Pending Campaign Approvals ({dashboardData.pendingCampaigns.length})</h3>
                    {dashboardData.pendingCampaigns.length === 0 ? (
                      <p className="no-data">No pending campaigns for approval</p>
                    ) : (
                      <div className="approval-cards">
                        {dashboardData.pendingCampaigns.slice(0, 3).map(campaign => (
                          <div key={campaign.id} className="approval-card">
                            <div className="campaign-info">
                              <h4>{campaign.title}</h4>
                              <p className="truncate">{campaign.description}</p>
                              <div className="meta">
                                <span className="category-badge">{campaign.category}</span>
                                <span>Created: {format(new Date(campaign.created_at), 'MMM d, yyyy')}</span>
                              </div>
                            </div>
                            <div className="approval-actions">
                              <button 
                                className="approve-btn"
                                onClick={() => handleApprove(campaign.id)}
                              >
                                Approve
                              </button>
                              <button 
                                className="reject-btn"
                                onClick={() => handleReject(campaign.id)}
                              >
                                Reject
                              </button>
                              <button 
                                className="details-btn"
                                onClick={() => {
                                  setSelectedCampaign(campaign);
                                  setShowCampaignModal(true);
                                }}
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        ))}
                        {dashboardData.pendingCampaigns.length > 3 && (
                          <button className="view-all-btn">
                            View All ({dashboardData.pendingCampaigns.length})
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Recent Donations */}
                  <div className="activity-section">
                    <h3>Recent Large Donations</h3>
                    {dashboardData.donations.filter(d => d.amount > 50000).length === 0 ? (
                      <p className="no-data">No recent large donations</p>
                    ) : (
                      <table className="recent-table">
                        <thead>
                          <tr>
                            <th>Amount</th>
                            <th>Campaign</th>
                            <th>Donor</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dashboardData.donations
                            .filter(d => d.amount > 50000)
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .slice(0, 5)
                            .map(donation => (
                              <tr key={donation.id}>
                                <td className="amount">₹{donation.amount.toLocaleString('en-IN')}</td>
                                <td>
                                  {dashboardData.myCampaigns.find(c => c.id === donation.campaignId)?.title || 'Unknown'}
                                </td>
                                <td>
                                  {dashboardData.users.find(u => u.id === donation.userId)?.full_name || 'Anonymous'}
                                </td>
                                <td>{format(new Date(donation.date), 'MMM d, h:mm a')}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Campaigns Management Tab */}
            {currentTab === 'campaigns' && (
              <div className="campaigns-management">
                <div className="section-header">
                  <h2>Campaign Management</h2>
                  <div className="controls">
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={campaignSearchTerm}
                        onChange={(e) => setCampaignSearchTerm(e.target.value)}
                      />
                      <span className="search-icon">🔍</span>
                    </div>
                    <select
                      value={campaignFilter}
                      onChange={(e) => setCampaignFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button className="export-btn">Export Data</button>
                  </div>
                </div>

                {/* Campaigns Table */}
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Campaign</th>
                        <th>Category</th>
                        <th>Raised</th>
                        <th>Goal</th>
                        <th>Status</th>
                        <th>Featured</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCampaigns.length > 0 ? (
                        currentCampaigns.map(campaign => (
                          <tr key={campaign.id}>
                            <td>
                              <div className="campaign-title">
                                {campaign.featured && <span className="featured-badge">★</span>}
                                {campaign.title}
                              </div>
                            </td>
                            <td>
                              <span className="category-badge">{campaign.category}</span>
                            </td>
                            <td>₹ {campaign.raised.toLocaleString('en-IN')}</td>
                            <td>₹ {campaign.goal?.toLocaleString('en-IN') || 'N/A'}</td>
                            <td>
                              <span className={`status-badge ${campaign.status}`}>
                                {campaign.status}
                              </span>
                            </td>
                            <td>
                              <label className="toggle-switch">
                                <input
                                  type="checkbox"
                                  checked={campaign.featured || false}
                                  onChange={(e) => handleFeatureCampaign(campaign.id, e.target.checked)}
                                />
                                <span className="slider"></span>
                              </label>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button 
                                  className="view-btn"
                                  onClick={() => {
                                    setSelectedCampaign(campaign);
                                    setShowCampaignModal(true);
                                  }}
                                >
                                  View
                                </button>
                                {campaign.status === 'active' && (
                                  <button 
                                    className="suspend-btn"
                                    onClick={() => handleSuspendCampaign(campaign.id)}
                                  >
                                    Suspend
                                  </button>
                                )}
                                {campaign.status === 'suspended' && (
                                  <button 
                                    className="approve-btn"
                                    onClick={() => handleApprove(campaign.id)}
                                  >
                                    Reactivate
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="no-data">
                            No campaigns found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredCampaigns.length > itemsPerPage && (
                  <div className="pagination">
                    <button 
                      onClick={() => paginateCampaigns(currentCampaignPage - 1)} 
                      disabled={currentCampaignPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(totalCampaignPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalCampaignPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentCampaignPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentCampaignPage >= totalCampaignPages - 2) {
                        pageNum = totalCampaignPages - 4 + i;
                      } else {
                        pageNum = currentCampaignPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginateCampaigns(pageNum)}
                          className={currentCampaignPage === pageNum ? 'active' : ''}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button 
                      onClick={() => paginateCampaigns(currentCampaignPage + 1)} 
                      disabled={currentCampaignPage === totalCampaignPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Users Management Tab */}
            {currentTab === 'users' && (
              <div className="users-management">
                <div className="section-header">
                  <h2>User Management ({dashboardData.stats.totalUsers})</h2>
                  <div className="controls">
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search users by name, email or mobile"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="search-icon">🔍</span>
                    </div>
                    <select
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="verified">Verified</option>
                      <option value="unverified">Unverified</option>
                    </select>
                    <button className="export-btn">Export Data</button>
                  </div>
                </div>

                {/* Users Table */}
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.length > 0 ? (
                        currentUsers.map(user => (
                          <tr key={user.id}>
                            <td>
                              <img 
                                src={user.profile_picture} 
                                alt={user.full_name} 
                                className="user-avatar"
                              />
                            </td>
                            <td>{user.full_name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                              <span className={`status-badge ${user.status}`}>
                                {user.status}
                              </span>
                            </td>
                            <td>{format(new Date(user.created_at), 'MMM d, yyyy')}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="view-btn">View</button>
                                <button 
                                  className={user.status === 'suspended' ? 'approve-btn' : 'suspend-btn'}
                                  onClick={() => handleSuspendUser(user.id, user.status === 'suspended')}
                                >
                                  {user.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="no-data">
                            No users found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredUsers.length > itemsPerPage && (
                  <div className="pagination">
                    <button 
                      onClick={() => paginateUsers(currentUserPage - 1)} 
                      disabled={currentUserPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(totalUserPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalUserPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentUserPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentUserPage >= totalUserPages - 2) {
                        pageNum = totalUserPages - 4 + i;
                      } else {
                        pageNum = currentUserPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginateUsers(pageNum)}
                          className={currentUserPage === pageNum ? 'active' : ''}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button 
                      onClick={() => paginateUsers(currentUserPage + 1)} 
                      disabled={currentUserPage === totalUserPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Transactions Management Tab */}
            {currentTab === 'transactions' && (
              <div className="transactions-management">
                <div className="section-header">
                  <h2>Transaction History</h2>
                  <div className="controls">
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search transactions by ID, user or campaign"
                        value={transactionSearchTerm}
                        onChange={(e) => setTransactionSearchTerm(e.target.value)}
                      />
                      <span className="search-icon">🔍</span>
                    </div>
                    <div className="date-range">
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      />
                      <span>to</span>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      />
                    </div>
                    <select
                      value={transactionFilter}
                      onChange={(e) => setTransactionFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                    <button className="export-btn">Export Data</button>
                  </div>
                </div>

                {/* Transactions Table */}
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>User</th>
                        <th>Campaign</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTransactions.length > 0 ? (
                        currentTransactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td>#{transaction.id}</td>
                            <td>{format(new Date(transaction.date), 'MMM d, yyyy')}</td>
                            <td>{transaction.userName}</td>
                            <td>{transaction.campaignTitle}</td>
                            <td className="amount">₹{transaction.amount.toLocaleString('en-IN')}</td>
                            <td>
                              <span className={`method-badge ${transaction.method}`}>
                                {transaction.method}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${transaction.status}`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="view-btn">Details</button>
                                {transaction.status === 'completed' && (
                                  <button className="refund-btn">Refund</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="no-data">
                            No transactions found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredTransactions.length > itemsPerPage && (
                  <div className="pagination">
                    <button 
                      onClick={() => paginateTransactions(currentTransactionPage - 1)} 
                      disabled={currentTransactionPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(totalTransactionPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalTransactionPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentTransactionPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentTransactionPage >= totalTransactionPages - 2) {
                        pageNum = totalTransactionPages - 4 + i;
                      } else {
                        pageNum = currentTransactionPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginateTransactions(pageNum)}
                          className={currentTransactionPage === pageNum ? 'active' : ''}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button 
                      onClick={() => paginateTransactions(currentTransactionPage + 1)} 
                      disabled={currentTransactionPage === totalTransactionPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Reports Tab */}
            {currentTab === 'reports' && (
              <div className="reports-section">
                <div className="section-header">
                  <h2>Analytics Reports</h2>
                  <div className="controls">
                    <div className="date-range">
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      />
                      <span>to</span>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      />
                    </div>
                    <button className="generate-btn">Generate Report</button>
                    <button className="export-btn">Export PDF</button>
                  </div>
                </div>

                <div className="report-content">
                  <div className="report-summary">
                    <h3>Platform Summary</h3>
                    <div className="summary-cards">
                      <div className="summary-card">
                        <h4>Total Revenue</h4>
                        <p>₹ {(dashboardData.stats.totalDonations * 0.05).toLocaleString('en-IN')}</p>
                        <small>(5% platform fee)</small>
                      </div>
                      <div className="summary-card">
                        <h4>Avg. Donation</h4>
                        <p>₹ {dashboardData.stats.avgDonation.toLocaleString('en-IN')}</p>
                        <small>per transaction</small>
                      </div>
                      <div className="summary-card">
                        <h4>Success Rate</h4>
                        <p>98.7%</p>
                        <small>completed transactions</small>
                      </div>
                    </div>
                  </div>

                  <div className="detailed-charts">
                    <div className="chart-container large">
                      <h3>Donations by Category</h3>
                      <Bar 
                        data={{
                          labels: ['Environment', 'Health', 'Education', 'Technology', 'Social'],
                          datasets: [{
                            label: 'Donations (₹)',
                            data: [1250000, 980000, 750000, 620000, 450000],
                            backgroundColor: 'rgba(54, 162, 235, 0.7)'
                          }]
                        }} 
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              display: false
                            }
                          }
                        }} 
                      />
                    </div>
                    <div className="chart-container large">
                      <h3>User Activity</h3>
                      <Line 
                        data={{
                          labels: dashboardData.analytics.userGrowth.map(item => item.month),
                          datasets: [
                            {
                              label: 'New Users',
                              data: dashboardData.analytics.userGrowth.map(item => item.count),
                              borderColor: 'rgba(54, 162, 235, 1)',
                              backgroundColor: 'rgba(54, 162, 235, 0.1)',
                              tension: 0.3
                            },
                            {
                              label: 'Active Users',
                              data: dashboardData.analytics.userGrowth.map(item => Math.floor(item.count * 0.7)),
                              borderColor: 'rgba(75, 192, 192, 1)',
                              backgroundColor: 'rgba(75, 192, 192, 0.1)',
                              tension: 0.3
                            }
                          ]
                        }} 
                        options={{
                          responsive: true
                        }} 
                      />
                    </div>
                  </div>

                  <div className="data-export">
                    <h3>Export Data</h3>
                    <div className="export-options">
                      <div className="export-option">
                        <h4>Campaign Data</h4>
                        <p>Export all campaign information including status, funds raised, and performance metrics.</p>
                        <button className="export-btn">Export CSV</button>
                      </div>
                      <div className="export-option">
                        <h4>User Data</h4>
                        <p>Export user information including registration date, activity status, and donation history.</p>
                        <button className="export-btn">Export CSV</button>
                      </div>
                      <div className="export-option">
                        <h4>Transaction Data</h4>
                        <p>Export complete transaction records with filters applied.</p>
                        <button className="export-btn">Export CSV</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {currentTab === 'settings' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Admin Settings</h2>
                </div>

                <div className="settings-tabs">
                  <div className="settings-sidebar">
                    <button className="active">General</button>
                    <button>Security</button>
                    <button>Notifications</button>
                    <button>API Keys</button>
                    <button>Maintenance</button>
                  </div>
                  <div className="settings-content">
                    <div className="settings-group">
                      <h3>General Settings</h3>
                      <div className="setting-item">
                        <label>Platform Name</label>
                        <input type="text" defaultValue="Crypto-Crowd" />
                      </div>
                      <div className="setting-item">
                        <label>Admin Email</label>
                        <input type="email" defaultValue="admin@crypto-crowd.com" />
                      </div>
                      <div className="setting-item">
                        <label>Default Currency</label>
                        <select defaultValue="INR">
                          <option value="INR">Indian Rupee (₹)</option>
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                        </select>
                      </div>
                    </div>

                    <div className="settings-group">
                      <h3>Campaign Settings</h3>
                      <div className="setting-item">
                        <label>Auto-approve Campaigns</label>
                        <label className="toggle-switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="setting-item">
                        <label>Minimum Campaign Duration (days)</label>
                        <input type="number" defaultValue="7" min="1" />
                      </div>
                      <div className="setting-item">
                        <label>Platform Fee (%)</label>
                        <input type="number" defaultValue="5" min="0" max="20" step="0.5" />
                      </div>
                    </div>

                    <div className="settings-group">
                      <h3>Notification Settings</h3>
                      <div className="setting-item">
                        <label>Email Notifications</label>
                        <label className="toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="setting-item">
                        <label>Web Notifications</label>
                        <label className="toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="setting-item">
                        <label>Large Donation Threshold (₹)</label>
                        <input type="number" defaultValue="50000" min="1000" />
                      </div>
                    </div>

                    <div className="settings-actions">
                      <button className="save-btn">Save Changes</button>
                      <button className="reset-btn">Reset to Defaults</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Campaign Detail Modal */}
      {showCampaignModal && selectedCampaign && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedCampaign.title}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCampaignModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="campaign-details">
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${selectedCampaign.status}`}>
                    {selectedCampaign.status}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="category-badge">{selectedCampaign.category}</span>
                </div>
                {selectedCampaign.raised !== undefined && (
                  <div className="detail-row">
                    <span className="detail-label">Raised:</span>
                    <span>₹ {selectedCampaign.raised.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {selectedCampaign.goal && (
                  <div className="detail-row">
                    <span className="detail-label">Goal:</span>
                    <span>₹ {selectedCampaign.goal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Description:</span>
                  <p>{selectedCampaign.description}</p>
                </div>
                {selectedCampaign.creator && (
                  <div className="detail-row">
                    <span className="detail-label">Creator:</span>
                    <div className="creator-info">
                      <img 
                        src={selectedCampaign.creator.profile_picture} 
                        alt={selectedCampaign.creator.full_name}
                        className="creator-avatar"
                      />
                      <span>{selectedCampaign.creator.full_name}</span>
                    </div>
                  </div>
                )}
              </div>

              {selectedCampaign.status === 'pending' && (
                <div className="modal-actions">
                  <button 
                    className="approve-btn"
                    onClick={() => {
                      handleApprove(selectedCampaign.id);
                      setShowCampaignModal(false);
                    }}
                  >
                    Approve Campaign
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => {
                      handleReject(selectedCampaign.id);
                      setShowCampaignModal(false);
                    }}
                  >
                    Reject Campaign
                  </button>
                </div>
              )}

              {selectedCampaign.status === 'active' && (
                <div className="modal-actions">
                  <button 
                    className="suspend-btn"
                    onClick={() => {
                      handleSuspendCampaign(selectedCampaign.id);
                      setShowCampaignModal(false);
                    }}
                  >
                    Suspend Campaign
                  </button>
                  <label className="feature-toggle">
                    <input
                      type="checkbox"
                      checked={selectedCampaign.featured || false}
                      onChange={(e) => handleFeatureCampaign(selectedCampaign.id, e.target.checked)}
                    />
                    <span>Featured Campaign</span>
                  </label>
                </div>
              )}

              {selectedCampaign.status === 'suspended' && (
                <div className="modal-actions">
                  <button 
                    className="approve-btn"
                    onClick={() => {
                      handleApprove(selectedCampaign.id);
                      setShowCampaignModal(false);
                    }}
                  >
                    Reactivate Campaign
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for simulation
const simulateAPICall = (endpoint, { data, delay = 500 }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`API call to ${endpoint} succeeded`);
      resolve({ data });
    }, delay);
  });
};

const generateMockUsers = (count) => {
  const statuses = ['active', 'suspended', 'active', 'active', 'verified', 'unverified'];
  const mockUsers = [];
  for (let i = 1; i <= count; i++) {
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    mockUsers.push({
      id: i,
      full_name: `User ${i}`,
      email: `user${i}@example.com`,
      mobile: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      profile_picture: `https://randomuser.me/api/portraits/${gender}/${i % 100}.jpg`,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  return mockUsers;
};

const generateMockCampaigns = () => {
  const categories = ['environment', 'technology', 'education', 'health', 'social'];
  const statuses = ['active', 'active', 'active', 'pending', 'suspended', 'completed'];
  const myCampaigns = [];
  const pendingCampaigns = [];
  
  for (let i = 1; i <= 15; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const goal = Math.floor(Math.random() * 5000000) + 500000;
    const raised = status === 'pending' ? 0 : Math.floor(Math.random() * goal);
    
    const campaign = {
      id: i,
      title: `Campaign ${i}: Support ${category} initiative`,
      description: `This is a detailed description for the ${category} campaign number ${i}. The goal is to raise funds for this important cause.`,
      category,
      status,
      goal,
      raised,
      featured: Math.random() > 0.7,
      creator: {
        id: i,
        full_name: `Creator ${i}`,
        profile_picture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${i % 100}.jpg`
      },
      created_at: new Date(Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)).toISOString()
    };
    
    if (status === 'pending') {
      pendingCampaigns.push(campaign);
    } else {
      myCampaigns.push(campaign);
    }
  }
  
  return { myCampaigns, pendingCampaigns };
};

const generateStats = () => {
  return {
    totalDonations: 4200000 + Math.floor(Math.random() * 2000000),
    totalUsers: 150 + Math.floor(Math.random() * 50),
    totalCampaigns: 25 + Math.floor(Math.random() * 10),
    activeCampaigns: 12 + Math.floor(Math.random() * 5),
    pendingApprovals: 5 + Math.floor(Math.random() * 3),
    recentDonations: 24 + Math.floor(Math.random() * 10),
    avgDonation: 2500 + Math.floor(Math.random() * 1500)
  };
};

const generateMockDonations = (count) => {
  const donations = [];
  for (let i = 1; i <= count; i++) {
    donations.push({
      id: i,
      campaignId: Math.floor(Math.random() * 15) + 1,
      userId: Math.floor(Math.random() * 150) + 1,
      amount: Math.floor(Math.random() * 50000) + 500,
      date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      message: i % 3 === 0 ? `Supporting this great cause! #${i}` : null
    });
  }
  return donations;
};

const generateMockTransactions = (count) => {
  const methods = ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'];
  const statuses = ['completed', 'completed', 'completed', 'pending', 'failed', 'refunded'];
  const transactions = [];
  
  for (let i = 1; i <= count; i++) {
    const method = methods[Math.floor(Math.random() * methods.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.floor(Math.random() * 50000) + 500;
    
    transactions.push({
      id: i,
      userId: Math.floor(Math.random() * 150) + 1,
      userName: `User ${Math.floor(Math.random() * 150) + 1}`,
      campaignId: Math.floor(Math.random() * 15) + 1,
      campaignTitle: `Campaign ${Math.floor(Math.random() * 15) + 1}`,
      amount,
      method,
      status,
      date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      fee: Math.floor(amount * 0.05)
    });
  }
  
  return transactions;
};

const generateAnalyticsData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const userGrowth = months.map((month, index) => ({
    month,
    count: Math.floor(20 + Math.random() * 30 * (index + 1))
  }));
  
  const donationTrends = Array.from({ length: 12 }, (_, i) => ({
    week: `Week ${i + 1}`,
    amount: Math.floor(500000 + Math.random() * 1000000)
  }));
  
  return {
    userGrowth,
    donationTrends,
    campaignPerformance: []
  };
};

const generateRandomUpdate = () => {
  const updateTypes = ['new_user', 'campaign_approved', 'new_donation'];
  const type = updateTypes[Math.floor(Math.random() * updateTypes.length)];
  
  if (type === 'new_user') {
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const id = Math.floor(Math.random() * 1000) + 200;
    return {
      type,
      user: {
        id,
        full_name: `New User ${id}`,
        email: `newuser${id}@example.com`,
        mobile: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        profile_picture: `https://randomuser.me/api/portraits/${gender}/${id % 100}.jpg`,
        created_at: new Date().toISOString(),
        status: 'active'
      }
    };
  } else if (type === 'campaign_approved') {
    const categories = ['environment', 'technology', 'education', 'health', 'social'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const id = Math.floor(Math.random() * 1000) + 200;
    return {
      type,
      campaignId: id,
      campaign: {
        id,
        title: `New Campaign ${id}`,
        description: `Description for new campaign ${id}`,
        category,
        raised: 0,
        status: 'active',
        goal: Math.floor(Math.random() * 5000000) + 500000,
        created_at: new Date().toISOString()
      }
    };
  } else {
    const amount = Math.floor(Math.random() * 100000) + 500;
    const campaignId = Math.floor(Math.random() * 15) + 1;
    const userId = Math.floor(Math.random() * 150) + 1;
    return {
      type: 'new_donation',
      donation: {
        id: Math.floor(Math.random() * 1000) + 200,
        campaignId,
        userId,
        amount,
        date: new Date().toISOString()
      },
      transaction: {
        id: Math.floor(Math.random() * 1000) + 200,
        userId,
        campaignId,
        amount,
        method: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'][Math.floor(Math.random() * 5)],
        status: 'completed',
        date: new Date().toISOString(),
        fee: Math.floor(amount * 0.05)
      },
      amount,
      campaignTitle: `Campaign ${campaignId}`
    };
  }
};

export default AdminDashboard;