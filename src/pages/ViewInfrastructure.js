import React, { useState, useMemo } from 'react';
import AssetGrid from '../components/AssetGrid';
import FilterPanel from '../components/FilterPanel';
import EditAssetModal from '../components/EditAssetModal';
import './ViewInfrastructure.css';

const ViewInfrastructure = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedCondition,
  setSelectedCondition,
  selectedPriority,
  setSelectedPriority,
  selectedStatus,
  setSelectedStatus,
  filteredAssets,
  selectedAsset,
  setSelectedAsset,
  allAssets,
  updateAsset,
  deleteAsset
}) => {
  const [viewType, setViewType] = useState('table'); // 'table' or 'grid'
  const [sortBy, setSortBy] = useState('assetName'); // 'assetName', 'priority', 'condition', 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [editingAsset, setEditingAsset] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Sort assets
  const sortedAssets = useMemo(() => {
    const sorted = [...filteredAssets];
    sorted.sort((a, b) => {
      let compareA, compareB;

      switch (sortBy) {
        case 'assetName':
          compareA = a.assetName.toLowerCase();
          compareB = b.assetName.toLowerCase();
          break;
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          compareA = priorityOrder[a.priorityLevel] || 0;
          compareB = priorityOrder[b.priorityLevel] || 0;
          break;
        case 'condition':
          const conditionOrder = { 'Critical': 3, 'Moderate': 2, 'Good': 1 };
          compareA = conditionOrder[a.condition] || 0;
          compareB = conditionOrder[b.condition] || 0;
          break;
        case 'date':
          compareA = new Date(a.lastMaintenanceDate || 0);
          compareB = new Date(b.lastMaintenanceDate || 0);
          break;
        case 'year':
          compareA = a.constructionYear;
          compareB = b.constructionYear;
          break;
        default:
          compareA = a[sortBy];
          compareB = b[sortBy];
      }

      if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredAssets, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
  };

  const handleDelete = (asset) => {
    setDeleteConfirm(asset);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteAsset(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const getConditionColor = (condition) => {
    const colors = {
      'Good': '#10b981',
      'Moderate': '#f59e0b',
      'Critical': '#ef4444'
    };
    return colors[condition] || '#6b7280';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': '#ef4444',
      'Medium': '#f59e0b',
      'Low': '#10b981'
    };
    return colors[priority] || '#6b7280';
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1>📋 View Infrastructure Assets</h1>
          <p>Browse, search, and manage all infrastructure assets</p>
        </div>
        <div className="view-controls">
          <button 
            className={`view-toggle-btn ${viewType === 'table' ? 'active' : ''}`}
            onClick={() => setViewType('table')}
            title="Table View"
          >
            📊 Table
          </button>
          <button 
            className={`view-toggle-btn ${viewType === 'grid' ? 'active' : ''}`}
            onClick={() => setViewType('grid')}
            title="Grid View"
          >
            🔲 Grid
          </button>
        </div>
      </div>

      <FilterPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCondition={selectedCondition}
        setSelectedCondition={setSelectedCondition}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <div className="results-info">
        <h2>All Assets</h2>
        <div className="results-meta">
          <span className="count-badge">
            Showing {sortedAssets.length} of {allAssets.length} assets
          </span>
          {viewType === 'table' && (
            <div className="sort-controls">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="assetName">Name</option>
                <option value="priority">Priority</option>
                <option value="condition">Condition</option>
                <option value="date">Last Maintenance</option>
                <option value="year">Construction Year</option>
                <option value="location">Location</option>
              </select>
              <button 
                className="sort-order-btn"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          )}
        </div>
      </div>

      {viewType === 'grid' ? (
        <AssetGrid assets={sortedAssets} onAssetClick={setSelectedAsset} />
      ) : (
        <div className="table-container">
          <table className="assets-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('assetName')} className="sortable">
                  Asset Name {sortBy === 'assetName' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('assetType')} className="sortable">
                  Type {sortBy === 'assetType' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('location')} className="sortable">
                  Location {sortBy === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('condition')} className="sortable">
                  Condition {sortBy === 'condition' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('priority')} className="sortable">
                  Priority {sortBy === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th onClick={() => handleSort('date')} className="sortable">
                  Last Maintenance {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAssets.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-results">
                    <div className="no-results-content">
                      <span className="no-results-icon">🔍</span>
                      <p>No assets found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="asset-name-cell">
                      <strong>{asset.assetName}</strong>
                      <span className="asset-id">ID: #{asset.id}</span>
                    </td>
                    <td>
                      <span className="type-badge">
                        {asset.assetType === 'Road' && '🛣️'}
                        {asset.assetType === 'Bridge' && '🌉'}
                        {asset.assetType === 'Utility' && '⚡'}
                        {asset.assetType === 'Building' && '🏢'}
                        {' '}{asset.assetType}
                      </span>
                    </td>
                    <td>{asset.location}</td>
                    <td>
                      <span 
                        className="condition-badge"
                        style={{ backgroundColor: getConditionColor(asset.condition) }}
                      >
                        {asset.condition}
                      </span>
                    </td>
                    <td>
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(asset.priorityLevel) }}
                      >
                        {asset.priorityLevel}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${asset.status === 'Active' ? 'status-active' : 'status-maintenance'}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td>{asset.lastMaintenanceDate || 'N/A'}</td>
                    <td className="actions-cell">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => setSelectedAsset(asset)}
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(asset)}
                        title="Edit Asset"
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(asset)}
                        title="Delete Asset"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Asset Modal */}
      {editingAsset && (
        <EditAssetModal
          asset={editingAsset}
          onClose={() => setEditingAsset(null)}
          onSave={updateAsset}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="delete-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">⚠️</div>
            <h3>Delete Infrastructure Asset?</h3>
            <p>
              Are you sure you want to delete <strong>{deleteConfirm.assetName}</strong>?
              <br />
              This action cannot be undone.
            </p>
            <div className="delete-modal-actions">
              <button 
                className="btn-delete-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="btn-delete-confirm"
                onClick={confirmDelete}
              >
                🗑️ Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInfrastructure;
