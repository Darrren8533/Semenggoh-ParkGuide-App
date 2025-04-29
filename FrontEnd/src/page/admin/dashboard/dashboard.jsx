import React, { useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState('dashboard');
  
  // Sample data for activity feed
  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Created a new certificate', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150' },
    { id: 2, user: 'Jane Smith', action: 'Updated certification requirements', time: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { id: 3, user: 'Robert Johnson', action: 'Deleted an expired certificate', time: 'Yesterday', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150' },
    { id: 4, user: 'Emily Davis', action: 'Approved 3 pending certificates', time: 'Yesterday', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
    { id: 5, user: 'Michael Wilson', action: 'Modified certificate template', time: '2 days ago', avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150' }
  ];

  // Sample data for certificate types
  const certificateTypes = [
    { type: 'Park Ranger', count: 45, color: '#4F46E5' },
    { type: 'Tour Guide', count: 32, color: '#10B981' },
    { type: 'Wildlife Specialist', count: 28, color: '#F59E0B' },
    { type: 'Conservation Expert', count: 15, color: '#EC4899' },
    { type: 'Other', count: 8, color: '#6B7280' }
  ];

  // Calculate total certificates for percentage calculation
  const totalCertificates = certificateTypes.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar Component */}
      <AdminSidebar activeLink={activeLink} setActiveLink={setActiveLink} />
      
      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to the ParkGuide Admin Dashboard</p>
          </div>
          <div className="user-profile">
            <div className="notifications">
              <i className="far fa-bell"></i>
              <span className="notification-badge">3</span>
            </div>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&auto=format&fit=crop" alt="Admin" className="user-avatar" />
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card" data-label="certificates">
            <div className="stat-info">
              <h3>Total Certificates</h3>
              <h2>128</h2>
              <p className="stat-change positive">
                <i className="fas fa-arrow-up"></i> +14% from last month
              </p>
            </div>
            <div className="stat-icon certificates">
              <i className="fas fa-certificate"></i>
            </div>
          </div>
          
          <div className="stat-card" data-label="users">
            <div className="stat-info">
              <h3>Active Users</h3>
              <h2>2,350</h2>
              <p className="stat-change positive">
                <i className="fas fa-arrow-up"></i> +5.2% from last month
              </p>
            </div>
            <div className="stat-icon users">
              <i className="fas fa-users"></i>
            </div>
          </div>
          
          <div className="stat-card" data-label="approvals">
            <div className="stat-info">
              <h3>Pending Approvals</h3>
              <h2>12</h2>
              <p className="stat-change negative">
                <i className="fas fa-arrow-down"></i> -3 from yesterday
              </p>
            </div>
            <div className="stat-icon approvals">
              <i className="fas fa-clipboard-check"></i>
            </div>
          </div>
          
          <div className="stat-card" data-label="expirations">
            <div className="stat-info">
              <h3>Upcoming Expirations</h3>
              <h2>24</h2>
              <p className="stat-expiring">
                <i className="fas fa-clock"></i> Expiring in next 30 days
              </p>
            </div>
            <div className="stat-icon expirations">
              <i className="fas fa-calendar-alt"></i>
            </div>
          </div>
        </div>
        
        {/* Activity and Certificate Types */}
        <div className="dashboard-panels">
          {/* Recent Activity */}
          <div className="panel activity-panel">
            <div className="panel-header">
              <h2>Recent Activity</h2>
              <div className="header-actions">
                <button className="view-all-btn">View All</button>
              </div>
            </div>
            
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-avatar">
                    <img src={activity.avatar} alt={activity.user} />
                  </div>
                  <div className="activity-details">
                    <h4>{activity.user}</h4>
                    <p>{activity.action}</p>
                  </div>
                  <div className="activity-time">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Certificate Types */}
          <div className="panel certificate-types-panel">
            <div className="panel-header">
              <h2>Certificate Types</h2>
              <div className="header-actions">
                <button className="view-all-btn">View All</button>
              </div>
            </div>
            
            <div className="certificate-types-list">
              {certificateTypes.map((cert, index) => (
                <div key={index} className="certificate-type-item">
                  <div className="cert-header">
                    <div className="cert-type-info">
                      <span className="cert-type-dot" style={{ backgroundColor: cert.color }}></span>
                      <span className="cert-type-name">{cert.type}</span>
                    </div>
                    <div className="cert-count">{cert.count}</div>
                  </div>
                  <div className="cert-progress-container">
                    <div 
                      className="cert-progress-bar" 
                      style={{ 
                        width: `${(cert.count / totalCertificates) * 100}%`,
                        backgroundColor: cert.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="bottom-section">
          <div className="panel park-map-panel">
            <div className="panel-header">
              <h2>Park Locations</h2>
              <div className="header-actions">
                <button className="view-all-btn">Explore</button>
              </div>
            </div>
            <div className="park-map">
              <img src="https://images.unsplash.com/photo-1578328624001-7ab53103932c?auto=format&fit=crop&w=1200" alt="Park Locations Map" className="map-image" />
              <div className="map-overlay">
                <button className="explore-btn">View Interactive Map</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;