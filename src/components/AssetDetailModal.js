import React from 'react';
import './AssetDetailModal.css';

const AssetDetailModal = ({ asset, onClose }) => {
  if (!asset) return null;

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Road': return '🛣️';
      case 'Bridge': return '🌉';
      case 'Utility': return '⚡';
      case 'Building': return '🏢';
      default: return '📍';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <span className="modal-icon">{getTypeIcon(asset.assetType)}</span>
          <div>
            <h2>{asset.assetName}</h2>
            <p className="modal-type">{asset.assetType} • {asset.department}</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="info-section">
            <h3>General Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">📍 {asset.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Department</span>
                <span className="info-value">🏢 {asset.department}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Condition</span>
                <span className={`info-value condition-${asset.condition.toLowerCase()}`}>
                  {asset.condition}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Priority Level</span>
                <span className={`info-value priority-${asset.priorityLevel.toLowerCase()}`}>
                  {asset.priorityLevel}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value">
                  {asset.status === 'Active' ? '✅ Active' : '🔧 Under Maintenance'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Construction Year</span>
                <span className="info-value">🏗️ {asset.constructionYear}</span>
              </div>
              {asset.length !== 'N/A' && (
                <div className="info-item">
                  <span className="info-label">Length</span>
                  <span className="info-value">{asset.length}</span>
                </div>
              )}
            </div>
          </div>

          <div className="info-section">
            <h3>Maintenance Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Last Maintenance</span>
                <span className="info-value">
                  {new Date(asset.lastMaintenanceDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Days Since Maintenance</span>
                <span className="info-value">
                  {Math.floor((new Date() - new Date(asset.lastMaintenanceDate)) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Estimated Maintenance Cost</span>
                <span className="info-value cost-highlight">{asset.cost}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Asset Age</span>
                <span className="info-value">
                  {new Date().getFullYear() - asset.constructionYear} years
                </span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Description</h3>
            <p className="description-text">{asset.description}</p>
          </div>

          <div className="maintenance-timeline">
            <h3>Maintenance History</h3>
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-label">Last Maintenance Completed</span>
                  <span className="timeline-date">
                    {new Date(asset.lastMaintenanceDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="timeline-item current">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-label">Current Status</span>
                  <span className="timeline-date">{asset.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary">Schedule Maintenance</button>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailModal;
