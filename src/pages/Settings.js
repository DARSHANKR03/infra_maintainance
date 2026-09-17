import React from 'react';
import './PlaceholderPage.css';

const Settings = () => {
  return (
    <div className="placeholder-page">
      <div className="page-header">
        <h1>⚙️ Settings</h1>
        <p>Configure system preferences and user settings</p>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h3>🔐 Account Settings</h3>
          <ul className="feature-list">
            <li>Profile information</li>
            <li>Change password</li>
            <li>Security settings</li>
            <li>Two-factor authentication</li>
          </ul>
        </div>

        <div className="settings-section">
          <h3>🔔 Notification Preferences</h3>
          <ul className="feature-list">
            <li>Email notifications</li>
            <li>SMS alerts</li>
            <li>Push notifications</li>
            <li>Alert frequency settings</li>
          </ul>
        </div>

        <div className="settings-section">
          <h3>🎨 Display Settings</h3>
          <ul className="feature-list">
            <li>Theme preferences</li>
            <li>Language selection</li>
            <li>Date and time format</li>
            <li>Dashboard layout</li>
          </ul>
        </div>

        <div className="settings-section">
          <h3>📊 Data Management</h3>
          <ul className="feature-list">
            <li>Export data</li>
            <li>Import assets</li>
            <li>Backup settings</li>
            <li>Data retention policies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
