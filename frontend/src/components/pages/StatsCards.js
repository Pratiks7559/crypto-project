import React from 'react';
import '../../styles/Dashboard.css'
const StatsCards = ({ user, totalDonations, myCampaigns, approvedCampaigns }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Donations</h3>
        <p>{user.currency} {totalDonations.toLocaleString()}</p>
      </div>
      <div className="stat-card">
        <h3>Campaigns Created</h3>
        <p>{myCampaigns}</p>
      </div>
      <div className="stat-card">
        <h3>Approved Campaigns</h3>
        <p>{approvedCampaigns}</p>
      </div>
    </div>
  );
};

export default StatsCards;