import React, { useState, useEffect } from 'react';
import './EditAssetModal.css';

const EditAssetModal = ({ asset, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    assetName: '',
    assetType: '',
    location: '',
    department: '',
    constructionYear: '',
    condition: '',
    priorityLevel: '',
    status: '',
    lastMaintenanceDate: '',
    length: '',
    cost: '',
    description: ''
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        assetName: asset.assetName || '',
        assetType: asset.assetType || '',
        location: asset.location || '',
        department: asset.department || '',
        constructionYear: asset.constructionYear || '',
        condition: asset.condition || '',
        priorityLevel: asset.priorityLevel || '',
        status: asset.status || '',
        lastMaintenanceDate: asset.lastMaintenanceDate || '',
        length: asset.length || '',
        cost: asset.cost || '',
        description: asset.description || ''
      });
    }
  }, [asset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(asset.id, formData);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'edit-modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="edit-modal-overlay" onClick={handleOverlayClick}>
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2>✏️ Edit Infrastructure Asset</h2>
          <button className="edit-modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-asset-form">
          <div className="edit-form-grid">
            <div className="edit-form-group">
              <label htmlFor="edit-assetName">Asset Name *</label>
              <input
                type="text"
                id="edit-assetName"
                name="assetName"
                value={formData.assetName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-assetType">Asset Type *</label>
              <select
                id="edit-assetType"
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="Road">Road</option>
                <option value="Bridge">Bridge</option>
                <option value="Utility">Utility</option>
                <option value="Building">Building</option>
              </select>
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-location">Location *</label>
              <input
                type="text"
                id="edit-location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-department">Department *</label>
              <input
                type="text"
                id="edit-department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-constructionYear">Construction Year *</label>
              <input
                type="number"
                id="edit-constructionYear"
                name="constructionYear"
                value={formData.constructionYear}
                onChange={handleChange}
                required
                min="1900"
                max="2026"
              />
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-condition">Condition *</label>
              <select
                id="edit-condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="">Select condition</option>
                <option value="Good">Good</option>
                <option value="Moderate">Moderate</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-priorityLevel">Priority Level *</label>
              <select
                id="edit-priorityLevel"
                name="priorityLevel"
                value={formData.priorityLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-status">Status *</label>
              <select
                id="edit-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-lastMaintenanceDate">Last Maintenance Date</label>
              <input
                type="date"
                id="edit-lastMaintenanceDate"
                name="lastMaintenanceDate"
                value={formData.lastMaintenanceDate}
                onChange={handleChange}
              />
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-length">Length/Size</label>
              <input
                type="text"
                id="edit-length"
                name="length"
                value={formData.length}
                onChange={handleChange}
              />
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-cost">Estimated Maintenance Cost</label>
              <input
                type="text"
                id="edit-cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
              />
            </div>

            <div className="edit-form-group full-width">
              <label htmlFor="edit-description">Description</label>
              <textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>

          <div className="edit-form-actions">
            <button type="button" className="btn-edit-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-edit-save">
              💾 Save Changes
            </button>
          </div>
        </form>

        <div className="edit-asset-info">
          <span className="asset-id-badge">Asset ID: #{asset.id}</span>
        </div>
      </div>
    </div>
  );
};

export default EditAssetModal;
