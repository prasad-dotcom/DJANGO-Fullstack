import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Frontend validation (no backend logic)
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      // Show success popup
      setShowSuccess(true);
      
      // Hide success popup after 2 seconds and show back button
      setTimeout(() => {
        setShowSuccess(false);
        setShowBackButton(true);
      }, 2000);
    } else {
      alert('Passwords do not match or are empty!');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="reset-password-container">
      {/* Background Logo */}
      <div className="background-logo"></div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-popup">
          <span className="success-icon">✓</span>
          Password Changed Successfully
        </div>
      )}

      {/* Main Dialog Box */}
      <div className="reset-dialog">
        <h2 className="reset-title">Reset Password</h2>
        <p className="reset-subtitle">Enter your new password below</p>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>

          {!showBackButton ? (
            <button type="submit" className="submit-btn">
              Submit
            </button>
          ) : (
            <button type="button" className="back-btn" onClick={handleBackToLogin}>
              Back to Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
