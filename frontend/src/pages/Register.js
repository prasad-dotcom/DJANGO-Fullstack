import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const [step, setStep] = useState('role'); // 'role', 'freelancer', 'recruiter'
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    password2: '',
    tc: false,
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setFormData(prev => ({ ...prev, role }));
    setStep(role);
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
    setLoading(true);
    setError('');

    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.tc) {
      setError('Please accept the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Join FreelanceHub</h1>
          <p>Choose your role to get started</p>
        </div>
        
        <div className="role-selection">
          <div 
            className="role-card freelancer"
            onClick={() => handleRoleSelection('freelancer')}
          >
            <div className="role-icon">💼</div>
            <h3>I'm a Freelancer</h3>
            <p>Looking for projects and opportunities to showcase my skills</p>
            <div className="role-features">
              <span>✓ Find projects</span>
              <span>✓ Build portfolio</span>
              <span>✓ Connect with clients</span>
            </div>
          </div>
          
          <div 
            className="role-card recruiter"
            onClick={() => handleRoleSelection('recruiter')}
          >
            <div className="role-icon">🏢</div>
            <h3>I'm a Recruiter</h3>
            <p>Looking to hire talented freelancers for my projects</p>
            <div className="role-features">
              <span>✓ Post projects</span>
              <span>✓ Find talent</span>
              <span>✓ Manage teams</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRegistrationForm = () => (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <button 
            className="back-button"
            onClick={() => setStep('role')}
          >
            ← Back
          </button>
          <h1>Create Your Account</h1>
          <p>Join as a {formData.role}</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Create a strong password"
              minLength="8"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Confirm your password"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="tc"
                checked={formData.tc}
                onChange={handleInputChange}
                required
              />
              <span className="checkmark"></span>
              I agree to the <a href="/terms" className="terms-link">Terms and Conditions</a>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary submit-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="register-page">
      {step === 'role' ? renderRoleSelection() : renderRegistrationForm()}
    </div>
  );
};

export default Register;



