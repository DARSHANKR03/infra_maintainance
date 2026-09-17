import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import './DataVisualization.css';

const DataVisualization = ({ stats }) => {
  const [timeRange, setTimeRange] = useState('30D');

  const getPercentage = (value, total) => {
    return ((value / total) * 100).toFixed(1);
  };

  // Data for Health Distribution - Donut Chart
  const healthData = [
    { 
      name: 'Healthy', 
      value: stats.byCondition['Good'] || 0, 
      color: '#10b981',
      percentage: getPercentage(stats.byCondition['Good'] || 0, stats.total)
    },
    { 
      name: 'At Risk', 
      value: stats.byCondition['Moderate'] || 0, 
      color: '#f59e0b',
      percentage: getPercentage(stats.byCondition['Moderate'] || 0, stats.total)
    },
    { 
      name: 'Critical', 
      value: stats.byCondition['Critical'] || 0, 
      color: '#ef4444',
      percentage: getPercentage(stats.byCondition['Critical'] || 0, stats.total)
    }
  ];

  // Data for Health Trend Over Time - Line Chart
  // Generate mock trend data based on time range
  const generateTrendData = (range) => {
    const dataPoints = range === '7D' ? 7 : range === '30D' ? 30 : 90;
    const data = [];
    const baseHealth = 85;
    
    for (let i = 0; i < dataPoints; i++) {
      const variation = (Math.random() - 0.5) * 2; // Random variation +-1
      const health = Math.min(95, Math.max(80, baseHealth + variation + (i * 0.02)));
      data.push({
        day: i + 1,
        health: parseFloat(health.toFixed(1))
      });
    }
    return data;
  };

  const [trendData] = useState({
    '7D': generateTrendData('7D'),
    '30D': generateTrendData('30D'),
    '90D': generateTrendData('90D')
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.name}</p>
          <p className="tooltip-value">
            Count: <strong>{payload[0].value}</strong>
          </p>
          <p className="tooltip-percent">
            {payload[0].payload.percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const TrendTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-value">
            Health: <strong>{payload[0].value}%</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-visualizations">
      <div className="viz-grid-new">
        {/* Health Distribution - Donut Chart */}
        <div className="viz-card-new">
          <h3 className="viz-card-title">Health Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={healthData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {healthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="health-legend">
            {healthData.map((item, index) => (
              <div key={index} className="legend-item">
                <span 
                  className="legend-color" 
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="legend-label">{item.name}</span>
                <span className="legend-value">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Health Trend Over Time - Line Chart */}
        <div className="viz-card-new">
          <div className="viz-card-header">
            <h3 className="viz-card-title">Health Trend Over Time</h3>
            <div className="time-range-selector">
              <button 
                className={`time-btn ${timeRange === '7D' ? 'active' : ''}`}
                onClick={() => setTimeRange('7D')}
              >
                7D
              </button>
              <button 
                className={`time-btn ${timeRange === '30D' ? 'active' : ''}`}
                onClick={() => setTimeRange('30D')}
              >
                30D
              </button>
              <button 
                className={`time-btn ${timeRange === '90D' ? 'active' : ''}`}
                onClick={() => setTimeRange('90D')}
              >
                90D
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData[timeRange]} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                domain={[75, 95]}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip content={<TrendTooltip />} />
              <Line 
                type="monotone" 
                dataKey="health" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
