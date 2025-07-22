import React, { useState } from 'react';
import '../../styles/Dashboard.css'
const CampaignForm = ({ onCancel, onCreate }) => {
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    category: 'environment'
  });

  const handleCreate = () => {
    if (!newCampaign.title || !newCampaign.description) {
      alert('Please fill all fields');
      return;
    }
    onCreate(newCampaign);
  };

  return (
    <div className="new-campaign-form">
      <h3>Create New Campaign</h3>
      <input
        type="text"
        placeholder="Campaign Title"
        value={newCampaign.title}
        onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
      />
      <textarea
        placeholder="Description"
        value={newCampaign.description}
        onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
      />
      <select
        value={newCampaign.category}
        onChange={(e) => setNewCampaign({...newCampaign, category: e.target.value})}
      >
        <option value="environment">Environment</option>
        <option value="technology">Technology</option>
        <option value="social">Social</option>
        <option value="healthcare">Healthcare</option>
      </select>
      <div className="form-actions">
        <button onClick={onCancel}>Cancel</button>
        <button className="primary" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default CampaignForm;