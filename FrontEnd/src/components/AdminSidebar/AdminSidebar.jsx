import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = ({ activeLink, setActiveLink }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=80&h=80&auto=format&fit=crop" alt="ParkGuide Logo" className="logo" />
          <div>
            <h1>ParkGuide</h1>
            <p>Admin Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <Link 
          to="/admin/dashboard" 
          className={`nav-item ${activeLink === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveLink('dashboard')}
        >
          <i className="fas fa-home"></i> <span>Dashboard</span>
        </Link>
        <Link 
          to="/admin/certificate" 
          className={`nav-item ${activeLink === 'certifications' ? 'active' : ''}`}
          onClick={() => setActiveLink('certifications')}
        >
          <i className="fas fa-certificate"></i> <span>Certifications</span>
        </Link>
        <Link 
          to="/admin/users" 
          className={`nav-item ${activeLink === 'users' ? 'active' : ''}`}
          onClick={() => setActiveLink('users')}
        >
          <i className="fas fa-users"></i> <span>Users</span>
        </Link>
        <Link 
          to="/admin/notifications" 
          className={`nav-item ${activeLink === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveLink('notifications')}
        >
          <i className="fas fa-file-alt"></i> <span>Notifications</span>
        </Link>
        <Link 
          to="/admin/application" 
          className={`nav-item ${activeLink === 'application' ? 'active' : ''}`}
          onClick={() => setActiveLink('application')}
        >
          <i className="fas fa-chart-line"></i> <span>Application</span>
        </Link>
        <Link 
          to="/admin/settings" 
          className={`nav-item ${activeLink === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveLink('settings')}
        >
          <i className="fas fa-cog"></i> <span>Settings</span>
        </Link>
      </nav>
      
      <div className="sidebar-footer">
        <Link to="/logout" className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar; 