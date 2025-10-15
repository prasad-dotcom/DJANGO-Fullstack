import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/accounts/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (!res.ok) throw new Error('Logout failed');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/');
    } catch (err) {
      alert(err.message);
      navigate('/');
    }
  };


  const handleProfile = () => {
    console.log('Navigating to profile...');
    navigate('/recruiter-profile');
  };

  const handleContact = (freelancerName) => {
    console.log(`Contacting ${freelancerName}`);
  };

  const handlePostProject = () => {
    console.log('Navigating to post project page...');
    navigate('/post-project');
  };

  return (
    <div className="recruiter-dashboard-page">
      {/* Header Section */}
      <header className="recruiter-header">
        <div className="welcome-text">
          <h1>Welcome! Recruiter</h1>
        </div>
        <div className="header-buttons">
          <button className="header-btn" onClick={handlePostProject}>
            Post
          </button>
          <button className="header-btn" onClick={handleProfile}>
            Profile
          </button>
          <button className="header-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="recruiter-content">
        {/* Top Section: Analytics and Current Projects */}
        <div className="recruiter-top-section">
          {/* Analytics Section (Left) */}
          <div className="analytics-section">
            <h2 className="section-title">Monthly Analytics</h2>
            
            <div className="analytics-grid">
              <div className="analytics-card">
                <div className="analytics-label">Money Spent</div>
                <div className="analytics-value">₹80,000</div>
              </div>
              
              <div className="analytics-card">
                <div className="analytics-label">Projects Completed</div>
                <div className="analytics-value">10</div>
              </div>
            </div>
          </div>

          {/* Current Projects Section (Right) */}
          <div className="current-projects-section">
            <h2 className="section-title">Current Projects</h2>
            
            <div className="current-projects-list">
              <div className="current-project-card">
                <div className="project-details">
                  <div className="project-field">
                    <span className="field-label">Project:</span>
                    <span className="field-value">Web Dev</span>
                  </div>
                  <div className="project-field">
                    <span className="field-label">Freelancer:</span>
                    <span className="field-value">XYZ</span>
                  </div>
                  <div className="project-field">
                    <span className="field-label">Pay:</span>
                    <span className="field-value pay-amount">₹4000</span>
                  </div>
                </div>
                <button 
                  className="contact-btn"
                  onClick={() => handleContact('XYZ')}
                >
                  Contact
                </button>
              </div>
              
              <div className="current-project-card">
                <div className="project-details">
                  <div className="project-field">
                    <span className="field-label">Project:</span>
                    <span className="field-value">DBA</span>
                  </div>
                  <div className="project-field">
                    <span className="field-label">Freelancer:</span>
                    <span className="field-value">ABC</span>
                  </div>
                  <div className="project-field">
                    <span className="field-label">Pay:</span>
                    <span className="field-value pay-amount">₹4000</span>
                  </div>
                </div>
                <button 
                  className="contact-btn"
                  onClick={() => handleContact('ABC')}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Post A Project Section (Compact) */}
        <div className="post-project-compact-section">
          <h2 className="post-project-title">POST A PROJECT !</h2>
          <button className="glow-post-btn" onClick={handlePostProject}>
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;