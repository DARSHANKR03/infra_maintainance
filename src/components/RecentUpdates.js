import React from 'react';
import './RecentUpdates.css';

const RecentUpdates = ({ assets }) => {
  // Get assets sorted by lastMaintenanceDate (most recent first)
  const getRecentUpdates = () => {
    return [...assets]
      .filter(asset => asset.lastMaintenanceDate)
      .sort((a, b) => new Date(b.lastMaintenanceDate) - new Date(a.lastMaintenanceDate))
      .slice(0, 5); // Get top 5 most recent
  };

  const recentUpdates = getRecentUpdates();

  const getStatusColor = (status) => {
    return status === 'Active' ? '#10b981' : '#f59e0b';
  };

  const getConditionColor = (condition) => {
    const colors = {
      'Good': '#10b981',
      'Moderate': '#f59e0b',
      'Critical': '#ef4444'
    };
    return colors[condition] || '#6b7280';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="recent-updates">
      <div className="recent-updates-header">
        <h2>📅 Recent Updates</h2>
        <span className="updates-count">{recentUpdates.length} recent activities</span>
      </div>
      
      <div className="updates-list">
        {recentUpdates.length === 0 ? (
          <div className="no-updates">
            <p>No recent maintenance activities found.</p>
          </div>
        ) : (
          recentUpdates.map((asset) => (
            <div key={asset.id} className="update-item">
              <div className="update-icon">
                {asset.assetType === 'Road' && '🛣️'}
                {asset.assetType === 'Bridge' && '🌉'}
                {asset.assetType === 'Utility' && '⚡'}
                {asset.assetType === 'Building' && '🏢'}
              </div>
              
              <div className="update-content">
                <div className="update-header">
                  <h3>{asset.assetName}</h3>
                  <span 
                    className="update-condition"
                    style={{ backgroundColor: getConditionColor(asset.condition) }}
                  >
                    {asset.condition}
                  </span>
                </div>
                
                <div className="update-info">
                  <span className="update-location">📍 {asset.location}</span>
                  <span className="update-department">🏛️ {asset.department}</span>
                </div>
                
                <div className="update-footer">
                  <span className="update-date">
                    Last maintained: {formatDate(asset.lastMaintenanceDate)}
                  </span>
                  <span 
                    className="update-status"
                    style={{ color: getStatusColor(asset.status) }}
                  >
                    {asset.status === 'Active' ? '✓ Active' : '🔧 Under Maintenance'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentUpdates;
