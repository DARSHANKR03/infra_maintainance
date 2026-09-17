import React, { useState, useMemo } from 'react';
import './MaintenanceManagement.css';

const MaintenanceManagement = ({ 
  allAssets, 
  maintenanceRecords, 
  addMaintenanceRecord, 
  updateMaintenanceRecord,
  deleteMaintenanceRecord 
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, schedule, history
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    assetId: '',
    assetName: '',
    type: 'Preventive',
    scheduledDate: '',
    description: '',
    cost: '',
    technician: '',
    status: 'Scheduled'
  });

  // Calculate assets requiring maintenance
  const assetsRequiringMaintenance = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return allAssets.filter(asset => {
      const lastMaintenanceDate = new Date(asset.lastMaintenanceDate);
      const daysSinceLastMaintenance = Math.floor((new Date() - lastMaintenanceDate) / (1000 * 60 * 60 * 24));
      
      return (
        asset.condition === 'Critical' ||
        asset.status === 'Under Maintenance' ||
        daysSinceLastMaintenance > 90 // More than 90 days since last maintenance
      );
    });
  }, [allAssets]);

  // Filter and search maintenance records
  const filteredRecords = useMemo(() => {
    return maintenanceRecords.filter(record => {
      const matchesStatus = !statusFilter || record.status === statusFilter;
      const matchesType = !typeFilter || record.type === typeFilter;
      const matchesSearch = !searchQuery || 
        record.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.technician.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [maintenanceRecords, statusFilter, typeFilter, searchQuery]);

  // Sort records by date
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      const dateA = new Date(a.scheduledDate);
      const dateB = new Date(b.scheduledDate);
      return dateB - dateA;
    });
  }, [filteredRecords]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = maintenanceRecords.length;
    const scheduled = maintenanceRecords.filter(r => r.status === 'Scheduled').length;
    const inProgress = maintenanceRecords.filter(r => r.status === 'In Progress').length;
    const completed = maintenanceRecords.filter(r => r.status === 'Completed').length;
    
    const totalCost = maintenanceRecords.reduce((sum, record) => {
      const cost = typeof record.cost === 'string' 
        ? parseFloat(record.cost.replace(/[$,]/g, '')) 
        : record.cost;
      return sum + (isNaN(cost) ? 0 : cost);
    }, 0);

    return { total, scheduled, inProgress, completed, totalCost };
  }, [maintenanceRecords]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-fill asset name when asset is selected
    if (name === 'assetId') {
      const asset = allAssets.find(a => a.id === parseInt(value));
      if (asset) {
        setFormData(prev => ({ ...prev, assetName: asset.assetName }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingRecord) {
      updateMaintenanceRecord(editingRecord.id, formData);
    } else {
      addMaintenanceRecord(formData);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      assetId: '',
      assetName: '',
      type: 'Preventive',
      scheduledDate: '',
      description: '',
      cost: '',
      technician: '',
      status: 'Scheduled'
    });
    setShowAddModal(false);
    setEditingRecord(null);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData(record);
    setShowAddModal(true);
  };

  const handleDelete = (recordId) => {
    if (window.confirm('Are you sure you want to delete this maintenance record?')) {
      deleteMaintenanceRecord(recordId);
    }
  };

  const handleStatusUpdate = (recordId, newStatus) => {
    const updates = { status: newStatus };
    if (newStatus === 'Completed') {
      updates.completedDate = new Date().toISOString().split('T')[0];
    }
    updateMaintenanceRecord(recordId, updates);
  };

  const formatCurrency = (amount) => {
    if (typeof amount === 'string') {
      return amount;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return '#3b82f6';
      case 'In Progress': return '#f59e0b';
      case 'Completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Preventive': return '#3b82f6';
      case 'Corrective': return '#f59e0b';
      case 'Emergency': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="maintenance-management">
      <div className="maintenance-header">
        <h2>Maintenance Management</h2>
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          <span className="icon">+</span> Schedule Maintenance
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="maintenance-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#3b82f6' }}>📋</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Records</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f59e0b' }}>📅</div>
          <div className="stat-content">
            <h3>{stats.scheduled}</h3>
            <p>Scheduled</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#8b5cf6' }}>🔧</div>
          <div className="stat-content">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#10b981' }}>✓</div>
          <div className="stat-content">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#ef4444' }}>⚠️</div>
          <div className="stat-content">
            <h3>{assetsRequiringMaintenance.length}</h3>
            <p>Needs Attention</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#059669' }}>💰</div>
          <div className="stat-content">
            <h3>${stats.totalCost.toLocaleString()}</h3>
            <p>Total Cost</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="maintenance-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      {/* Filters */}
      <div className="maintenance-filters">
        <input
          type="text"
          placeholder="Search by asset, technician, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="Preventive">Preventive</option>
          <option value="Corrective">Corrective</option>
          <option value="Emergency">Emergency</option>
        </select>
      </div>

      {/* Assets Requiring Maintenance Alert */}
      {assetsRequiringMaintenance.length > 0 && activeTab === 'overview' && (
        <div className="maintenance-alert">
          <div className="alert-header">
            <span className="alert-icon">⚠️</span>
            <h3>Assets Requiring Maintenance</h3>
          </div>
          <div className="assets-list">
            {assetsRequiringMaintenance.map(asset => (
              <div key={asset.id} className="alert-asset-item">
                <div className="asset-info">
                  <strong>{asset.assetName}</strong>
                  <span className="asset-category">{asset.category}</span>
                </div>
                <div className="asset-status">
                  <span 
                    className="condition-badge"
                    style={{ 
                      backgroundColor: asset.condition === 'Critical' ? '#ef4444' : '#f59e0b',
                      color: 'white'
                    }}
                  >
                    {asset.condition}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Maintenance Records Table */}
      <div className="maintenance-records">
        {sortedRecords.length === 0 ? (
          <div className="no-records">
            <p>No maintenance records found.</p>
            {maintenanceRecords.length > 0 && (
              <p className="sub-text">Try adjusting your filters</p>
            )}
          </div>
        ) : (
          <table className="maintenance-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Scheduled Date</th>
                <th>Description</th>
                <th>Technician</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.map(record => (
                <tr key={record.id}>
                  <td>
                    <strong>{record.assetName}</strong>
                  </td>
                  <td>
                    <span 
                      className="type-badge"
                      style={{ 
                        backgroundColor: getTypeColor(record.type),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}
                    >
                      {record.type}
                    </span>
                  </td>
                  <td>{new Date(record.scheduledDate).toLocaleDateString()}</td>
                  <td>{record.description}</td>
                  <td>{record.technician}</td>
                  <td>{formatCurrency(record.cost)}</td>
                  <td>
                    <select
                      value={record.status}
                      onChange={(e) => handleStatusUpdate(record.id, e.target.value)}
                      className="status-select"
                      style={{ 
                        backgroundColor: getStatusColor(record.status),
                        color: 'white'
                      }}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEdit(record)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(record.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => !editingRecord && resetForm()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingRecord ? 'Edit Maintenance Record' : 'Schedule Maintenance'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="maintenance-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Asset *</label>
                  <select
                    name="assetId"
                    value={formData.assetId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Asset</option>
                    {allAssets.map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.assetName} - {asset.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Maintenance Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Preventive">Preventive</option>
                    <option value="Corrective">Corrective</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Scheduled Date *</label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estimated Cost *</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Technician *</label>
                <input
                  type="text"
                  name="technician"
                  value={formData.technician}
                  onChange={handleInputChange}
                  placeholder="Technician name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the maintenance work..."
                  rows="4"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingRecord ? 'Update' : 'Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceManagement;
