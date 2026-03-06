import React from 'react';
import './AssetCard.css';

const AssetCard = ({ asset, onClick }) => {
  const getConditionClass = (condition) => {
    switch(condition) {
      case 'Good': return 'condition-good';
      case 'Moderate': return 'condition-moderate';
      case 'Critical': return 'condition-critical';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Road': return '🛣️';
      case 'Bridge': return '🌉';
      case 'Utility': return '⚡';
      case 'Building': return '🏢';
      default: return '📍';
    }
  };

  const getStatusBadge = (status) => {
    return status === 'Active' ? '✅ Active' : '🔧 Under Maintenance';
  };

  return (
    <div className="asset-card" onClick={() => onClick(asset)}>
      <div className="asset-card-header">
        <span className="asset-type-icon">{getTypeIcon(asset.assetType)}</span>
        <span className="asset-type-badge">{asset.assetType}</span>
      </div>
      
      <h3 className="asset-name">{asset.assetName}</h3>
      
      <div className="asset-location">
        📍 {asset.location}
      </div>

      <div className="asset-department">
        🏢 {asset.department}
      </div>

      <div className="asset-details">
        <div className="detail-row">
          <span className="detail-label">Condition:</span>
          <span className={`condition-badge ${getConditionClass(asset.condition)}`}>
            {asset.condition}
          </span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Priority:</span>
          <span className={`priority-badge ${getPriorityClass(asset.priorityLevel)}`}>
            {asset.priorityLevel}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span className="status-text">{getStatusBadge(asset.status)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Last Maintenance:</span>
          <span>{new Date(asset.lastMaintenanceDate).toLocaleDateString()}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Built:</span>
          <span>{asset.constructionYear}</span>
        </div>
      </div>

      <button className="view-details-btn">View Details →</button>
    </div>
  );
};

export default AssetCard;
