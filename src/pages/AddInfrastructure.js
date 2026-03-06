import React, { useState } from 'react';
import './AddInfrastructure.css';

const AddInfrastructure = ({ addAsset, setActiveMenu }) => {
  const [formData, setFormData] = useState({
    assetName: '',
    assetType: '',
    location: '',
    department: '',
    constructionYear: '',
    condition: '',
    priorityLevel: '',
    status: 'Active',
    lastMaintenanceDate: '',
    length: '',
    cost: '',
    description: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [newAssetId, setNewAssetId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add the new asset
    const newAsset = addAsset(formData);
    setNewAssetId(newAsset.id);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      assetName: '',
      assetType: '',
      location: '',
      department: '',
      constructionYear: '',
      condition: '',
      priorityLevel: '',
      status: 'Active',
      lastMaintenanceDate: '',
      length: '',
      cost: '',
      description: ''
    });

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleViewAll = () => {
    setActiveMenu('view-infrastructure');
  };

  const handleAddAnother = () => {
    setShowSuccess(false);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>➕ Add New Infrastructure Asset</h1>
        <p>Fill in the details to register a new infrastructure asset</p>
      </div>

      {showSuccess && (
        <div className="success-notification">
          <div className="success-icon">✅</div>
          <div className="success-content">
            <h3>Infrastructure Asset Added Successfully!</h3>
            <p>Asset ID #{newAssetId} has been added to the system.</p>
            <div className="success-actions">
              <button onClick={handleAddAnother} className="btn-success-secondary">
                ➕ Add Another Asset
              </button>
              <button onClick={handleViewAll} className="btn-success-primary">
                👁️ View All Assets
              </button>
            </div>
          </div>
          <button onClick={() => setShowSuccess(false)} className="success-close">
            ✕
          </button>
        </div>
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="add-asset-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="assetName">Asset Name *</label>
              <input
                type="text"
                id="assetName"
                name="assetName"
                value={formData.assetName}
                onChange={handleChange}
                required
                placeholder="Enter asset name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="assetType">Asset Type *</label>
              <select
                id="assetType"
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

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter location"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                placeholder="Enter department"
              />
            </div>

            <div className="form-group">
              <label htmlFor="constructionYear">Construction Year *</label>
              <input
                type="number"
                id="constructionYear"
                name="constructionYear"
                value={formData.constructionYear}
                onChange={handleChange}
                required
                min="1900"
                max="2026"
                placeholder="Enter year"
              />
            </div>

            <div className="form-group">
              <label htmlFor="condition">Condition *</label>
              <select
                id="condition"
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

            <div className="form-group">
              <label htmlFor="priorityLevel">Priority Level *</label>
              <select
                id="priorityLevel"
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

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="lastMaintenanceDate">Last Maintenance Date</label>
              <input
                type="date"
                id="lastMaintenanceDate"
                name="lastMaintenanceDate"
                value={formData.lastMaintenanceDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="length">Length/Size</label>
              <input
                type="text"
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                placeholder="e.g., 5.2 km or N/A"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cost">Estimated Maintenance Cost</label>
              <input
                type="text"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="e.g., $125,000"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter detailed description of the asset"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => window.history.back()}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Infrastructure Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInfrastructure;
