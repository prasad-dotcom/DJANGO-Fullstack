import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const { uid, token } = useParams();  // Get uid and token from URL params
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!uid || !token) {
      setError('Invalid reset link');
    }
  }, [uid, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Frontend validation
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/accounts/reset/${uid}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: newPassword,
          password2: confirmPassword
        })
      });
      const data = await res.json();
      if (res.ok) {
        // Show success popup
        setShowSuccess(true);
        
        // Hide success popup after 2 seconds and show back button
        setTimeout(() => {
          setShowSuccess(false);
          setShowBackButton(true);
        }, 2000);
      } else {
        console.log('Error response:', data);  // Add this
        setError(data.message || data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
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

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
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
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Resetting...' : 'Submit'}
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
