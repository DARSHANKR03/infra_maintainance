import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedType, 
  setSelectedType, 
  selectedCondition, 
  setSelectedCondition,
  selectedPriority,
  setSelectedPriority,
  selectedStatus,
  setSelectedStatus
}) => {
  return (
    <div className="filter-panel">
      <div className="filter-section">
        <label>🔍 Search</label>
        <input
          type="text"
          placeholder="Search by name, location, department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <label>Asset Type</label>
        <select 
          value={selectedType} 
          onChange={(e) => setSelectedType(e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="Road">Road</option>
          <option value="Bridge">Bridge</option>
          <option value="Utility">Utility</option>
          <option value="Building">Building</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Condition</label>
        <select 
          value={selectedCondition} 
          onChange={(e) => setSelectedCondition(e.target.value)}
          className="filter-select"
        >
          <option value="">All Conditions</option>
          <option value="Good">Good</option>
          <option value="Moderate">Moderate</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Priority</label>
        <select 
          value={selectedPriority} 
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="filter-select"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Status</label>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>

      <button 
        className="clear-filters-btn"
        onClick={() => {
          setSearchQuery('');
          setSelectedType('');
          setSelectedCondition('');
          setSelectedPriority('');
          setSelectedStatus('');
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel;
