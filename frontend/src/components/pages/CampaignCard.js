import React from 'react';
import '../../styles/Dashboard.css'

const CampaignCard = ({ campaign, user, onDonate }) => {
  return (
    <div className={`campaign-card ${campaign.status}`}>
      <div className="campaign-info">
        <h3>{campaign.title}</h3>
        <p>{campaign.description}</p>
        <div className="campaign-stats">
          <span>Raised: {user.currency} {campaign.donations.toLocaleString()}</span>
          {campaign.isMine && <span className="my-campaign-badge">My Campaign</span>}
          {campaign.status === 'pending' && <span className="pending-badge">Pending Approval</span>}
          {campaign.status === 'active' && <span className="blockchain-badge-small">On Blockchain</span>}
        </div>
      </div>
      <div className="campaign-actions">
        <button className="donate-btn" onClick={() => onDonate(campaign.id, 1000)}>
          Donate
        </button>
        <div className="donate-options">
          <span>Donate in:</span>
          <button className="small">¥</button>
          <button className="small">ETH</button>
          <button className="small">BTC</button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;