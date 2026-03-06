import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>🏙️ Urban Infrastructure Data Portal</h1>
        <p className="header-subtitle">City Infrastructure Management System</p>
      </div>
      <div className="header-info">
        <span className="current-date">
          {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>
    </header>
  );
};

export default Header;
