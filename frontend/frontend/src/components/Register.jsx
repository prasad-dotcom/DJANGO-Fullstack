import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return alert('Please select a role.');
    if (formData.password !== formData.confirmPassword) return alert('Passwords do not match.');

    const payload = {
      email: formData.email,
      name: formData.username, // <-- Fix here
      role: selectedRole,
      password: formData.password,
      password2: formData.confirmPassword,
      tc: formData.agreeToTerms    // boolean; backend may accept true/false or "true"/"false"
    };

    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/accounts/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // show server validation errors or message
        const errMsg = data.detail || JSON.stringify(data);
        throw new Error(errMsg);
      }

      // store tokens if returned
      if (data.token?.access) localStorage.setItem('accessToken', data.token.access);
      if (data.token?.refresh) localStorage.setItem('refreshToken', data.token.refresh);

      alert('Registration successful');
      window.location.href = '/login'; // or redirect to dashboard
    } catch (err) {
      alert(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1 className="register-title">Join FreelanceConnect</h1>
          <p className="register-subtitle">Create your account and start your journey</p>
        </div>

        {!selectedRole ? (
          <div className="role-selection">
            <h2 className="role-selection-title">Choose Your Role</h2>
            <div className="role-options">
              <button
                className="role-option freelancer"
                onClick={() => handleRoleSelection('freelancer')}
                type="button"
              >
                <div className="role-icon">💼</div>
                <h3>Register as Freelancer</h3>
                <p>Find amazing projects and build your portfolio</p>
              </button>

              <button
                className="role-option recruiter"
                onClick={() => handleRoleSelection('recruiter')}
                type="button"
              >
                <div className="role-icon">🔍</div>
                <h3>Register as Recruiter</h3>
                <p>Hire talented professionals for your projects</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="register-form fade-in">
            <div className="selected-role">
              <span className="role-badge">{selectedRole}</span>
              <button
                className="change-role-btn"
                onClick={() => setSelectedRole(null)}
                type="button"
              >
                Change Role
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a secure password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="checkmark"></span>
                  I agree to the Terms and Conditions
                </label>
              </div>

              <div className="button-container">
                <button type="submit" className="register-button" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>

            <div className="register-footer">
              <p>Already have an account? <Link to="/login">Sign in here</Link></p>
              <Link to="/" className="back-home">← Back to Home</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
