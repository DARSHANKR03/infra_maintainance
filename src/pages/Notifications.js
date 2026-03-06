import React from 'react';
import './PlaceholderPage.css';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      icon: '⚠️',
      title: 'Maintenance Due',
      message: 'Gas Distribution Hub requires scheduled maintenance',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'critical',
      icon: '🚨',
      title: 'Critical Condition Alert',
      message: 'Old Town Bridge condition has been marked as critical',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      icon: '✅',
      title: 'Maintenance Completed',
      message: 'Industrial Park Access Road maintenance completed successfully',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      icon: 'ℹ️',
      title: 'New Asset Added',
      message: 'Municipal Park Complex has been added to the system',
      time: '2 days ago',
      read: true
    }
  ];

  return (
    <div className="placeholder-page">
      <div className="page-header">
        <h1>🔔 Notifications</h1>
        <p>Stay updated with system alerts and notifications</p>
      </div>

      <div className="notifications-container">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
          >
            <div className="notification-icon">{notification.icon}</div>
            <div className="notification-content">
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            {!notification.read && <div className="unread-badge"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
