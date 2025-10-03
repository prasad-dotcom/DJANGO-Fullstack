import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './Profile.css';

// Modal Components
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

const EditProfileModal = ({ isOpen, onClose, profileData, onSave, onChange, user }) => {
  const [formData, setFormData] = useState(profileData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.location && formData.location.length < 2) {
      newErrors.location = 'Location must be at least 2 characters';
    }
    
    if (formData.website && !formData.website.match(/^https?:\/\/.+/)) {
      newErrors.website = 'Website must be a valid URL starting with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input 
            type="text" 
            className={`form-input ${errors.name ? 'error' : ''}`}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-input"
            value={user?.email || ''}
            readOnly
            style={{ background: '#f1f5f9', color: '#64748b' }}
          />
          <small style={{ color: '#64748b', fontSize: '0.8rem' }}>
            Email cannot be changed. Contact support if needed.
          </small>
        </div>

        <div className="form-group">
          <label className="form-label">Role</label>
          <input 
            type="text" 
            className="form-input"
            value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
            readOnly
            style={{ background: '#f1f5f9', color: '#64748b' }}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Location</label>
            <input 
              type="text" 
              className={`form-input ${errors.location ? 'error' : ''}`}
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, Country"
            />
            {errors.location && <span className="error-text">{errors.location}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Website</label>
            <input 
              type="url" 
              className={`form-input ${errors.website ? 'error' : ''}`}
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
            />
            {errors.website && <span className="error-text">{errors.website}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea 
            className="form-input"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself..."
            rows="4"
            style={{ resize: 'vertical', minHeight: '100px' }}
          />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

const ChangePasswordModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await onSave(formData);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      onClose();
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label className="form-label">Current Password *</label>
          <input 
            type="password" 
            className={`form-input ${errors.currentPassword ? 'error' : ''}`}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            placeholder="Enter your current password"
            required
          />
          {errors.currentPassword && <span className="error-text">{errors.currentPassword}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">New Password *</label>
          <input 
            type="password" 
            className={`form-input ${errors.newPassword ? 'error' : ''}`}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter new password (min 8 characters)"
            required
            minLength="8"
          />
          {errors.newPassword && <span className="error-text">{errors.newPassword}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Confirm New Password *</label>
          <input 
            type="password" 
            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your new password"
            required
            minLength="8"
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>

        <div className="password-requirements">
          <h4>Password Requirements:</h4>
          <ul>
            <li>At least 8 characters long</li>
            <li>Must be different from current password</li>
            <li>Use a combination of letters, numbers, and symbols for better security</li>
          </ul>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    hourly_rate: '',
    availability: 'available'
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        hourly_rate: user.hourly_rate || '',
        availability: user.availability || 'available'
      });
    }
  }, [isAuthenticated, loading, navigate, user]);

  const handleProfileUpdate = async (formData) => {
    setError('');
    setMessage('');

    try {
      const response = await axios.put('/api/v1/accounts/profile/', formData);
      setMessage('Profile updated successfully!');
      setProfileData(formData);
      setShowEditModal(false);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update profile');
    }
  };

  const handlePasswordChange = async (formData) => {
    setError('');
    setMessage('');

    try {
      await axios.post('/api/v1/accounts/passwordchange/', {
        old_password: formData.currentPassword,
        password: formData.newPassword,
        password2: formData.confirmPassword
      });
      setMessage('Password changed successfully!');
      setShowPasswordModal(false);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to change password');
      throw error; // Re-throw to handle in modal
    }
  };

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${user?.id}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      setMessage('Profile link copied to clipboard!');
    }).catch(() => {
      setError('Failed to copy profile link');
    });
  };

  const clearMessages = () => {
    setMessage('');
    setError('');
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getRoleIcon = (role) => {
    return role === 'freelancer' ? '💼' : '🏢';
  };

  const getRoleColor = (role) => {
    return role === 'freelancer' ? '#6366f1' : '#8b5cf6';
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <nav className="profile-nav">
              <button 
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span className="nav-icon">📊</span>
                Overview
              </button>
              <button 
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <span className="nav-icon">⚙️</span>
                Settings
              </button>
              <button 
                className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <span className="nav-icon">🔒</span>
                Security
              </button>
            </nav>
          </div>

          <div className="profile-main">
            {activeTab === 'overview' && (
              <div className="profile-overview">
                <div className="welcome-section">
                  <div className="welcome-content">
                    <div className="user-avatar">
                      <span className="avatar-icon">{getRoleIcon(user.role)}</span>
                    </div>
                    <div className="user-info">
                      <h2>Welcome back, {user.name}!</h2>
                      <p className="user-role">
                        <span 
                          className="role-badge"
                          style={{ backgroundColor: getRoleColor(user.role) }}
                        >
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="profile-settings">
                <div className="settings-header">
                  <h3>Profile Settings</h3>
                  <div className="settings-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowEditModal(true)}
                    >
                      ✏️ Edit Profile
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={handleShareProfile}
                    >
                      🔗 Share Profile
                    </button>
                  </div>
                </div>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <div className="profile-info-grid">
                  <div className="info-card">
                    <div className="info-header">
                      <span className="info-icon">👤</span>
                      <h4>Personal Information</h4>
                    </div>
                    <div className="info-content">
                      <div className="info-item">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{profileData.name || 'Not set'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{profileData.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Role:</span>
                        <span className="info-value">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Not set'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-header">
                      <span className="info-icon">📍</span>
                      <h4>Location & Contact</h4>
                    </div>
                    <div className="info-content">
                      <div className="info-item">
                        <span className="info-label">Location:</span>
                        <span className="info-value">{profileData.location || 'Not set'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Website:</span>
                        <span className="info-value">
                          {profileData.website ? (
                            <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="info-link">
                              {profileData.website}
                            </a>
                          ) : (
                            'Not set'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {profileData.bio && (
                    <div className="info-card bio-card">
                      <div className="info-header">
                        <span className="info-icon">📝</span>
                        <h4>Bio</h4>
                      </div>
                      <div className="info-content">
                        <p className="bio-text">{profileData.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="profile-security">
                <div className="security-header">
                  <h3>Security Settings</h3>
                  <p>Manage your account security and password</p>
                </div>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <div className="security-sections">
                  <div className="security-section">
                    <div className="security-card">
                      <div className="security-card-header">
                        <span className="security-icon">🔒</span>
                        <div>
                          <h4>Password Security</h4>
                          <p>Keep your account secure with a strong password</p>
                        </div>
                      </div>
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowPasswordModal(true)}
                      >
                        🔑 Change Password
                      </button>
                    </div>
                  </div>

                  <div className="security-section">
                    <div className="security-card">
                      <div className="security-card-header">
                        <span className="security-icon">🛡️</span>
                        <div>
                          <h4>Account Security</h4>
                          <p>Your account is protected with industry-standard security</p>
                        </div>
                      </div>
                      <div className="security-status">
                        <span className="status-indicator active">🟢</span>
                        <span>Account Secure</span>
                      </div>
                    </div>
                  </div>

                  <div className="security-section">
                    <div className="security-card">
                      <div className="security-card-header">
                        <span className="security-icon">📧</span>
                        <div>
                          <h4>Email Verification</h4>
                          <p>Your email address is verified and secure</p>
                        </div>
                      </div>
                      <div className="security-status">
                        <span className="status-indicator active">🟢</span>
                        <span>Email Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          clearMessages();
        }}
        profileData={profileData}
        onSave={handleProfileUpdate}
        user={user}
      />

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          clearMessages();
        }}
        onSave={handlePasswordChange}
      />
    </div>
  );
};

export default Profile;