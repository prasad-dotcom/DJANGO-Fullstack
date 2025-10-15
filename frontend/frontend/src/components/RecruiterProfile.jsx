import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecruiterProfile.css';

const PROFILE_API = 'http://127.0.0.1:8000/api/v1/accounts/recruiter_profile/';
const API_BASE = 'http://127.0.0.1:8000/api/v1/recruiters/';


const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token') || localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}`, Accept: 'application/json' } : { Accept: 'application/json' };
};
const userId = localStorage.getItem('userId');

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);
  const [profileData, setProfileData] = useState({
    companyLogo: '',
    recruiterName: '',
    companyName: '',
    aboutUs: '',
    contactEmail: '',
    companyMotive: '',
    linkedin: '',
    instagram: ''
  });
  const [editingSections, setEditingSections] = useState({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordSuccessModal, setShowPasswordSuccessModal] = useState(false);
  const [selectedLogoFile, setSelectedLogoFile] = useState(null);
  const [userId, setUserId] = useState('');
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch profile data on mount
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    const fetchProfile = async () => {
      const headers = getAuthHeaders();
      const res = await fetch(PROFILE_API, { method: 'GET', headers });
      if (!res.ok) return;
      const data = await res.json();
      const uid = data.user?.id || data.user?.user_id || localStorage.getItem('userId');
      setUserId(uid);
      // Always set user fields
      setProfileData(prev => ({
        ...prev,
        recruiterName: data.user?.name ?? '',
        contactEmail: data.user?.email ?? '',
        aboutUs: data.recruiter?.about_us ?? '',
        companyLogo: data.recruiter?.company_logo ?? '',
        companyName: data.recruiter?.company_name ?? '',
        companyMotive: data.recruiter?.company_motive ?? '',
        instagram: data.recruiter?.instagram ?? '',
        linkedin: data.recruiter?.linkedin ?? ''
      }));
    };
    fetchProfile();
  }, []); // Only runs once on mount

  // Controlled input handler
  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Edit/save section logic
  const handleSectionEdit = (section) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: true
    }));
  };

  const handleSectionSave = async (section) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: false
    }));
    setShowSaveModal(true);
    setTimeout(() => setShowSaveModal(false), 2000);

    if (!userId) {
      alert('User ID not found. Cannot save.');
      return;
    }

    const headers = getAuthHeaders();
    const bodyFields = {
      about_us: profileData.aboutUs,
      company_logo: profileData.companyLogo,
      company_name: profileData.companyName,
      contact_email: profileData.contactEmail,
      company_motive: profileData.companyMotive,
      instagram: profileData.instagram,
      linkedin: profileData.linkedin
    };

    const url = `${API_BASE}${userId}/`;

    const fd = new FormData();
    if (selectedLogoFile instanceof File) {
      fd.append('company_logo', selectedLogoFile);
    }
    fd.append('company_name', profileData.companyName);
    fd.append('about_us', profileData.aboutUs);
    fd.append('company_motive', profileData.companyMotive);
    fd.append('contact_email', profileData.contactEmail);
    fd.append('linkedin', profileData.linkedin);
    fd.append('instagram', profileData.instagram);
    fd.append('recruiter_name', profileData.recruiterName);

    const res = await fetch(url, {
      method: 'PATCH',
      headers: getAuthHeaders(), // Do NOT set 'Content-Type'
      body: fd
    });

    if (res.ok) {
      const updated = await res.json();
      setProfileData(prev => ({
        ...prev,
        recruiterName: prev.recruiterName,  // User name doesn't change
        contactEmail: prev.contactEmail,    // User email doesn't change
        companyLogo: updated.company_logo ?? prev.companyLogo,
        companyName: updated.company_name ?? prev.companyName,
        aboutUs: updated.about_us ?? prev.aboutUs,
        companyMotive: updated.company_motive ?? prev.companyMotive,
        linkedin: updated.linkedin ?? prev.linkedin,
        instagram: updated.instagram ?? prev.instagram
      }));
      setSelectedLogoFile(null);
    } else {
      alert('Failed to save changes.');
    }
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

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePassword = async () => {
    // Frontend validation
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all fields!');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('New password must be at least 8 characters!');
      return;
    }

    try {
      const headers = getAuthHeaders();
      const res = await fetch('http://127.0.0.1:8000/api/v1/accounts/passwordchange/', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: passwordData.newPassword,
          password2: passwordData.confirmPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        setShowPasswordModal(false);
        setShowPasswordSuccessModal(true);
        setTimeout(() => setShowPasswordSuccessModal(false), 2000);
        setPasswordData({ newPassword: '', confirmPassword: '' });
      } else {
        alert(data.message || 'Failed to change password');
      }
    } catch (err) {
      alert('Network error');
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
            Personal Info
          </button>
          <button onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}>
            About Us
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
            {/* Personal Info Section */}
            <div id="company-info-section" className="company-info-grid">
              <div className="company-info-header">
                <h2 className="profile-heading">Personal Information</h2>
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
                    {profileData.companyLogo && (
                      <img
                        src={profileData.companyLogo}
                        alt="Company Logo"
                        style={{ width: '90px', height: '90px', borderRadius: '50%' }}
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="company-logo-input"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) setSelectedLogoFile(file);
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
                  <label>Recruiter Name</label>
                  <input
                    type="text"
                    value={profileData.recruiterName || ''}
                    onChange={(e) => handleInputChange('recruiterName', e.target.value)}
                    disabled={!editingSections.companyInfo}
                    className="profile-input"
                    placeholder="Enter recruiter name"
                  />
                </div>
                <div className="input-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={profileData.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    disabled={!editingSections.companyInfo}
                    className="profile-input"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="input-group">
                  <label>Official Email</label>
                  <input
                    type="email"
                    value={profileData.contactEmail || ''}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    disabled={!editingSections.companyInfo}
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
                  value={profileData.aboutUs || ''}
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
                  value={profileData.companyMotive || ''}
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
                    value={profileData.linkedin || ''}
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
                    value={profileData.instagram || ''}
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

