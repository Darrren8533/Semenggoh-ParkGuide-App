import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ParkGuideSidebar.css';

const ParkGuideSidebar = ({ activeLink }) => {
  const [user, setUser] = useState({ username: 'User', role: 'Guide' });
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        username: parsedUser.username || 'User',
        role: parsedUser.userRole || 'Guide'
      });
    }
  }, []);
  
  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar"></div>
        <div className="profile-info">
          <h3>{user.username}</h3>
          <span>{user.role}</span>
        </div>
      </div>
      
      <div className="sidebar-section">
        <ul className="sidebar-menu">
          <li className={activeLink === 'dashboard' ? 'active' : ''}>
            <Link to="/parkguide/dashboard" className="menu-item">
            <i class="icon fa-solid fa-house"></i>
            <span>Dashboard</span>
            </Link>
          </li>
          <li className={activeLink === 'certifications' ? 'active' : ''}>
            <Link to="/parkguide/certifications" className="menu-item">
            <i class="icon fa-solid fa-certificate"></i>
            <span>Certifications</span>
            </Link>
          </li>
          <li className={activeLink === 'notifications' ? 'active' : ''}>
            <Link to="/parkguide/notifications" className="menu-item">
            <i class="icon fa-solid fa-bell"></i>
              <span>Notifications</span>
            </Link>
          </li>
          <li className={activeLink === 'settings' ? 'active' : ''}>
            <Link to="/parkguide/settings" className="menu-item">
            <i class="icon fa-solid fa-gear"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="logout-container">
        <Link to="/signin" className="logout-button">
          <i className="icon logout-icon"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default ParkGuideSidebar; 