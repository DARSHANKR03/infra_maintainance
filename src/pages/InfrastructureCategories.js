import React, { useMemo } from 'react';
import './InfrastructureCategories.css';

const InfrastructureCategories = ({ allAssets, stats, setActiveMenu, setSelectedType }) => {
  // Calculate category statistics dynamically
  const categories = useMemo(() => {
    const categoryData = [
      {
        id: 1,
        name: 'Roads',
        type: 'Road',
        icon: '🛣️',
        description: 'Highway and street infrastructure',
        color: '#3b82f6'
      },
      {
        id: 2,
        name: 'Bridges',
        type: 'Bridge',
        icon: '🌉',
        description: 'Crossing structures and overpasses',
        color: '#8b5cf6'
      },
      {
        id: 3,
        name: 'Utilities',
        type: 'Utility',
        icon: '⚡',
        description: 'Water, power, gas, and sewage facilities',
        color: '#f59e0b'
      },
      {
        id: 4,
        name: 'Public Buildings',
        type: 'Building',
        icon: '🏢',
        description: 'Public facilities and administrative buildings',
        color: '#10b981'
      },
      {
        id: 5,
        name: 'Parks & Recreation',
        type: 'Park',
        icon: '🌳',
        description: 'Parks, playgrounds, and recreational areas',
        color: '#14b8a6'
      }
    ];

    // Calculate statistics for each category
    return categoryData.map(category => {
      const categoryAssets = allAssets.filter(asset => asset.assetType === category.type);
      const count = categoryAssets.length;
      
      // Calculate condition breakdown
      const conditions = {
        good: categoryAssets.filter(a => a.condition === 'Good').length,
        moderate: categoryAssets.filter(a => a.condition === 'Moderate').length,
        critical: categoryAssets.filter(a => a.condition === 'Critical').length
      };

      // Calculate priority breakdown
      const priorities = {
        high: categoryAssets.filter(a => a.priorityLevel === 'High').length,
        medium: categoryAssets.filter(a => a.priorityLevel === 'Medium').length,
        low: categoryAssets.filter(a => a.priorityLevel === 'Low').length
      };

      // Calculate total cost for category
      const totalCost = categoryAssets.reduce((sum, asset) => {
        if (asset.cost) {
          const costValue = typeof asset.cost === 'string' 
            ? parseInt(asset.cost.replace(/[$,]/g, '')) 
            : asset.cost;
          return sum + (isNaN(costValue) ? 0 : costValue);
        }
        return sum;
      }, 0);

      // Count assets under maintenance
      const underMaintenance = categoryAssets.filter(a => a.status === 'Under Maintenance').length;

      return {
        ...category,
        count,
        conditions,
        priorities,
        totalCost,
        underMaintenance,
        healthPercentage: count > 0 ? Math.round((conditions.good / count) * 100) : 0
      };
    });
  }, [allAssets]);

  const handleCategoryClick = (categoryType) => {
    // Set the filter and navigate to view infrastructure page
    setSelectedType(categoryType);
    setActiveMenu('view-infrastructure');
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>🏗️ Infrastructure Categories</h1>
        <p>Manage and view infrastructure assets by category</p>
      </div>

      <div className="categories-overview">
        <div className="overview-stat">
          <div className="stat-label">Total Categories</div>
          <div className="stat-value">{categories.filter(c => c.count > 0).length}</div>
        </div>
        <div className="overview-stat">
          <div className="stat-label">Total Assets</div>
          <div className="stat-value">{allAssets.length}</div>
        </div>
        <div className="overview-stat">
          <div className="stat-label">Critical Assets</div>
          <div className="stat-value">{allAssets.filter(a => a.condition === 'Critical').length}</div>
        </div>
        <div className="overview-stat">
          <div className="stat-label">Under Maintenance</div>
          <div className="stat-value">{allAssets.filter(a => a.status === 'Under Maintenance').length}</div>
        </div>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id} 
            className={`category-card ${category.count === 0 ? 'empty-category' : ''}`}
            onClick={() => category.count > 0 && handleCategoryClick(category.type)}
            style={{ borderLeftColor: category.color, cursor: category.count > 0 ? 'pointer' : 'default' }}
          >
            <div className="category-icon" style={{ backgroundColor: `${category.color}20` }}>
              <span style={{ fontSize: '2.5rem' }}>{category.icon}</span>
            </div>
            <div className="category-content">
              <div className="category-header">
                <h3>{category.name}</h3>
                <span 
                  className="asset-count-badge" 
                  style={{ backgroundColor: category.color }}
                >
                  {category.count}
                </span>
              </div>
              <p className="category-description">{category.description}</p>
              
              {category.count > 0 ? (
                <>
                  <div className="category-details">
                    <div className="detail-row">
                      <span className="detail-label">Health Score:</span>
                      <div className="health-bar">
                        <div 
                          className="health-fill" 
                          style={{ 
                            width: `${category.healthPercentage}%`,
                            backgroundColor: category.healthPercentage >= 70 ? '#10b981' : category.healthPercentage >= 40 ? '#f59e0b' : '#ef4444'
                          }}
                        ></div>
                        <span className="health-text">{category.healthPercentage}%</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Condition:</span>
                      <div className="condition-badges">
                        <span className="mini-badge good">{category.conditions.good} Good</span>
                        <span className="mini-badge moderate">{category.conditions.moderate} Moderate</span>
                        <span className="mini-badge critical">{category.conditions.critical} Critical</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Priority:</span>
                      <div className="priority-badges">
                        <span className="mini-badge priority-high">{category.priorities.high} High</span>
                        <span className="mini-badge priority-medium">{category.priorities.medium} Medium</span>
                        <span className="mini-badge priority-low">{category.priorities.low} Low</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Total Value:</span>
                      <span className="detail-value">{formatCurrency(category.totalCost)}</span>
                    </div>

                    {category.underMaintenance > 0 && (
                      <div className="maintenance-alert">
                        ⚠️ {category.underMaintenance} asset{category.underMaintenance > 1 ? 's' : ''} under maintenance
                      </div>
                    )}
                  </div>

                  <button 
                    className="view-category-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.type);
                    }}
                    style={{ backgroundColor: category.color }}
                  >
                    View All {category.name} →
                  </button>
                </>
              ) : (
                <div className="empty-category-message">
                  No assets in this category yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfrastructureCategories;
