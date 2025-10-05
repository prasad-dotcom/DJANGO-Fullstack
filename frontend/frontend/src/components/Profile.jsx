import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/freelancer-dashboard');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Freelancer Profile</h1>
          <p className="profile-subtitle">Manage your profile information</p>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <p>Profile page content coming soon...</p>
          </div>
        </div>

        <div className="profile-footer">
          <button className="back-btn" onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

