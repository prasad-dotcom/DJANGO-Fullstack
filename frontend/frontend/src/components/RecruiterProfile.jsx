import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecruiterProfile.css';

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const [editingSections, setEditingSections] = useState({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordSuccessModal, setShowPasswordSuccessModal] = useState(false);
  
  const [profileData, setProfileData] = useState({
    companyLogo: '',
    companyName: '',
    employeeSize: '',
    aboutUs: '',
    contactEmail: '',
    companyMotive: '',
    linkedin: '',
    instagram: ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSectionEdit = (section) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: true
    }));
  };

  const handleSectionSave = (section) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: false
    }));
    setShowSaveModal(true);
    setTimeout(() => setShowSaveModal(false), 2000);
    console.log(`${section} section saved:`, profileData);
  };

  const handleBackToDashboard = () => {
    navigate('/recruiter-dashboard');
  };

  const handleOpenPasswordModal = () => {
    setShowPasswordModal(true);
    setPasswordData({ newPassword: '', confirmPassword: '' });
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({ newPassword: '', confirmPassword: '' });
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword === passwordData.confirmPassword && passwordData.newPassword !== '') {
      console.log('Password changed successfully');
      setShowPasswordModal(false);
      setShowPasswordSuccessModal(true);
      setTimeout(() => setShowPasswordSuccessModal(false), 2000);
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } else {
      alert('Passwords do not match or are empty!');
    }
  };

  return (
    <div className="recruiter-profile">
      <div className="profile-container">
        {/* Header with Back and Change Password Buttons */}
        <div className="profile-header">
          <div className="header-buttons">
            <button className="change-password-btn" onClick={handleOpenPasswordModal}>
              Change Password
            </button>
            <button className="back-btn" onClick={handleBackToDashboard}>
              Back
            </button>
          </div>
        </div>

        {/* Save Confirmation Modal - Top of Screen */}
        {showSaveModal && (
          <div className="save-modal-top-overlay">
            <div className="save-modal-top">
              <div className="save-modal-top-content">
                <div className="save-modal-top-icon">✅</div>
                <p className="save-modal-top-text">Changes saved successfully!</p>
              </div>
            </div>
          </div>
        )}

        {/* Password Success Modal */}
        {showPasswordSuccessModal && (
          <div className="save-modal-top-overlay">
            <div className="save-modal-top">
              <div className="save-modal-top-content">
                <div className="save-modal-top-icon">✅</div>
                <p className="save-modal-top-text">Password Changed Successfully!</p>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="password-modal-overlay" onClick={handleClosePasswordModal}>
            <div className="password-modal" onClick={(e) => e.stopPropagation()}>
              <div className="password-modal-header">
                <h2>Change Password</h2>
                <button className="close-modal-btn" onClick={handleClosePasswordModal}>
                  ×
                </button>
              </div>
              <div className="password-modal-content">
                <div className="input-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="password-input"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="input-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="password-input"
                    placeholder="Confirm new password"
                  />
                </div>
                <button className="save-password-btn" onClick={handleSavePassword}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Bar */}
        <div className="profile-nav">
          <button onClick={() => document.getElementById('company-info-section').scrollIntoView({ behavior: 'smooth' })}>
            Company Info
          </button>
          <button onClick={() => document.getElementById('employee-size-section').scrollIntoView({ behavior: 'smooth' })}>
            Employee Size
          </button>
          <button onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}>
            About Us
          </button>
          <button onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}>
            Contact Details
          </button>
          <button onClick={() => document.getElementById('motive-section').scrollIntoView({ behavior: 'smooth' })}>
            Company Motive
          </button>
          <button onClick={() => document.getElementById('social-section').scrollIntoView({ behavior: 'smooth' })}>
            Social Media
          </button>
        </div>

        <div className="profile-grid">
          {/* LEFT COLUMN */}
          <div className="profile-left">
            {/* Company Info Section */}
            <div id="company-info-section" className="company-info-grid">
              <div className="company-info-header">
                <h2 className="profile-heading">Company Information</h2>
                {!editingSections.companyInfo ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('companyInfo')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('companyInfo')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="company-logo-section">
                <div className="company-logo-container">
                  <div className="company-logo-placeholder">
                    {profileData.companyLogo ? (
                      <img
                        src={profileData.companyLogo}
                        alt="Company Logo"
                        style={{ width: '90px', height: '90px', borderRadius: '50%' }}
                      />
                    ) : (
                      <div className="logo-upload-area">
                        <div className="logo-icon">🏢</div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="company-logo-input"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          handleInputChange('companyLogo', ev.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    disabled={!editingSections.companyInfo}
                  />
                  <button
                    className="upload-logo-btn"
                    disabled={!editingSections.companyInfo}
                    type="button"
                    onClick={() => document.getElementById('company-logo-input').click()}
                  >
                    Upload Logo
                  </button>
                </div>
              </div>
              <div className="company-info">
                <div className="input-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={profileData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    disabled={!editingSections.companyInfo}
                    className="profile-input"
                    placeholder="Enter company name"
                  />
                </div>
              </div>
            </div>

            {/* Employee Size Section */}
            <div id="employee-size-section" className="employee-size-grid">
              <div className="section-header">
                <h2 className="profile-heading">Employee Size</h2>
                {!editingSections.employeeSize ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('employeeSize')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('employeeSize')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="input-group">
                <label>Number of Employees</label>
                <input
                  type="number"
                  value={profileData.employeeSize}
                  onChange={(e) => handleInputChange('employeeSize', e.target.value)}
                  disabled={!editingSections.employeeSize}
                  className="profile-input"
                  placeholder="e.g., 50"
                />
              </div>
            </div>

            {/* Contact Details Section */}
            <div id="contact-section" className="contact-details-grid">
              <div className="contact-details-header">
                <h2 className="profile-heading">Contact Details</h2>
                {!editingSections.contact ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('contact')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('contact')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="contact-fields">
                <div className="input-group">
                  <label>Official Email</label>
                  <input
                    type="email"
                    value={profileData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    disabled={!editingSections.contact}
                    className="profile-input"
                    placeholder="company@example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="profile-content">
            {/* About Us Section */}
            <div id="about-section" className="about-section">
              <div className="section-header">
                <h3 className="section-title">About Us</h3>
                {!editingSections.about ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('about')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('about')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="input-group">
                <textarea
                  value={profileData.aboutUs}
                  onChange={(e) => handleInputChange('aboutUs', e.target.value)}
                  disabled={!editingSections.about}
                  className="profile-textarea"
                  rows="5"
                  placeholder="Tell us about your company..."
                />
              </div>
            </div>

            {/* Company Motive Section */}
            <div id="motive-section" className="motive-section">
              <div className="section-header">
                <h3 className="section-title">Company Motive</h3>
                {!editingSections.motive ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('motive')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('motive')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="input-group">
                <textarea
                  value={profileData.companyMotive}
                  onChange={(e) => handleInputChange('companyMotive', e.target.value)}
                  disabled={!editingSections.motive}
                  className="profile-textarea"
                  rows="5"
                  placeholder="What drives your company..."
                />
              </div>
            </div>

            {/* Social Media Section */}
            <div id="social-section" className="social-section">
              <div className="section-header">
                <h3 className="section-title">Social Media</h3>
                {!editingSections.social ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('social')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('social')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="social-grid">
                <div className="input-group">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    disabled={!editingSections.social}
                    className="profile-input"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
                <div className="input-group">
                  <label>Instagram</label>
                  <input
                    type="url"
                    value={profileData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    disabled={!editingSections.social}
                    className="profile-input"
                    placeholder="https://instagram.com/yourcompany"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;

