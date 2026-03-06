import React from 'react';
import './StatisticsCards.css';

const StatisticsCards = ({ stats, allAssets }) => {
  // Calculate healthy percentage
  const healthyCount = stats.byCondition['Good'] || 0;
  const healthyPercentage = stats.total > 0 ? ((healthyCount / stats.total) * 100).toFixed(1) : 0;
  
  // Calculate critical assets
  const criticalCount = stats.byCondition['Critical'] || 0;
  
  // Mock data for alerts (you can replace with actual data)
  const activeAlerts = 39;
  
  // Mock data for overdue inspections (you can replace with actual data)
  const overdueInspections = 18;

  return (
    <div className="statistics-grid">
      {/* Total Assets */}
      <div className="stat-card stat-total">
        <div className="stat-header">
          <span className="stat-label">TOTAL ASSETS</span>
        </div>
        <div className="stat-value">{stats.total.toLocaleString()}</div>
        <div className="stat-trend positive">
          <span className="trend-icon">↑</span>
          <span className="trend-text">+2.1% vs last month</span>
        </div>
        <div className="stat-indicator stat-indicator-green"></div>
      </div>

      {/* Healthy % */}
      <div className="stat-card stat-healthy">
        <div className="stat-header">
          <span className="stat-label">HEALTHY %</span>
        </div>
        <div className="stat-value">{healthyPercentage}%</div>
        <div className="stat-trend positive">
          <span className="trend-icon">↑</span>
          <span className="trend-text">+1.4% vs last month</span>
        </div>
        <div className="stat-indicator stat-indicator-green"></div>
      </div>

      {/* Critical Assets */}
      <div className="stat-card stat-critical">
        <div className="stat-header">
          <span className="stat-label">CRITICAL ASSETS</span>
        </div>
        <div className="stat-value">{criticalCount}</div>
        <div className="stat-trend negative">
          <span className="trend-icon">↓</span>
          <span className="trend-text">-6 this week</span>
        </div>
        <div className="stat-indicator stat-indicator-orange"></div>
      </div>

      {/* Active Alerts */}
      <div className="stat-card stat-alerts">
        <div className="stat-header">
          <span className="stat-label">ACTIVE ALERTS</span>
        </div>
        <div className="stat-value">{activeAlerts}</div>
        <div className="stat-trend warning">
          <span className="trend-icon">↑</span>
          <span className="trend-text">+5 in last 24h</span>
        </div>
        <div className="stat-indicator stat-indicator-blue"></div>
      </div>

      {/* Overdue Inspections */}
      <div className="stat-card stat-overdue">
        <div className="stat-header">
          <span className="stat-label">OVERDUE INSPECTIONS</span>
        </div>
        <div className="stat-value">{overdueInspections}</div>
        <div className="stat-trend warning">
          <span className="trend-icon">↑</span>
          <span className="trend-text">+2 this week</span>
        </div>
        <div className="stat-indicator stat-indicator-purple"></div>
      </div>
    </div>
  );
};

export default StatisticsCards;
