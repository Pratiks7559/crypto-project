import React from 'react';
import CampaignCard from './CampaignCard';
import '../../styles/Dashboard.css'

const CampaignList = ({ 
  campaigns, 
  user, 
  activeTab, 
  onTabChange, 
  onCreateCampaign, 
  onDonate 
}) => {
  const filteredCampaigns = campaigns.filter(camp => {
    if (activeTab === 'all') return true;
    if (activeTab === 'my') return camp.isMine;
    if (activeTab === 'pending') return camp.status === 'pending';
    return camp.category === activeTab;
  });

  return (
    <div className="campaigns-section">
      <div className="section-header">
        <h2>Campaigns</h2>
        <div className="tabs">
          <button 
            className={activeTab === 'all' ? 'active' : ''} 
            onClick={() => onTabChange('all')}
          >
            All Campaigns
          </button>
          <button 
            className={activeTab === 'my' ? 'active' : ''} 
            onClick={() => onTabChange('my')}
          >
            My Campaigns
          </button>
          <button 
            className={activeTab === 'pending' ? 'active' : ''} 
            onClick={() => onTabChange('pending')}
          >
            Pending
          </button>
          <button 
            className={activeTab === 'environment' ? 'active' : ''} 
            onClick={() => onTabChange('environment')}
          >
            Environment
          </button>
          <button 
            className={activeTab === 'technology' ? 'active' : ''} 
            onClick={() => onTabChange('technology')}
          >
            Technology
          </button>
        </div>
        <button className="new-campaign-btn" onClick={onCreateCampaign}>
          + Start New Campaign
        </button>
      </div>

      <div className="campaigns-list">
        {filteredCampaigns.map(campaign => (
          <CampaignCard 
            key={campaign.id} 
            campaign={campaign} 
            user={user}
            onDonate={onDonate}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignList;