import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'add-infrastructure', label: 'Add Infrastructure', icon: '➕' },
    { id: 'view-infrastructure', label: 'View Infrastructure', icon: '📋' },
    { id: 'categories', label: 'Infrastructure Categories', icon: '🏗️' },
    { id: 'maintenance', label: 'Maintenance Management', icon: '🔧' },
    { id: 'issues', label: 'Issue Reports', icon: '⚠️' },
    { id: 'monitoring', label: 'Asset Status Monitoring', icon: '📈' },
    { id: 'reports', label: 'Reports & Analytics', icon: '📑' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏙️</span>
          <span className="logo-text">Urban Infra</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => setActiveMenu(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar;
