import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostJob.css';

const PostJob = () => {
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    role: '',
    organizationName: '',
    location: '',
    jobType: '',
    experience: '',
    skillsRequired: '',
    keyResponsibilities: '',
    jobDescription: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      role: '',
      organizationName: '',
      location: '',
      jobType: '',
      experience: '',
      skillsRequired: '',
      keyResponsibilities: '',
      jobDescription: ''
    });
  };

  // Post job
  const handlePost = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.role || !formData.organizationName || !formData.location || 
        !formData.jobType || !formData.experience || !formData.skillsRequired || 
        !formData.keyResponsibilities || !formData.jobDescription) {
      alert('Please fill in all fields!');
      return;
    }

    // Log data to console
    console.log('Job Posted:', formData);

    // Show success popup
    setShowSuccessPopup(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      handleReset();
    }, 2000);

    // Hide popup after 3 seconds and navigate back
    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate('/recruiter-dashboard');
    }, 3000);
  };

  const handleBackToDashboard = () => {
    navigate('/recruiter-dashboard');
  };

  return (
    <div className="post-job-page">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <div className="success-icon">✅</div>
            <h2 className="success-message">JOB POSTED SUCCESSFULLY !!!</h2>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="post-job-container">
        {/* Header */}
        <div className="post-job-header">
          <h1 className="post-job-title">Post Job</h1>
          <button className="back-to-dashboard-btn" onClick={handleBackToDashboard}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Form */}
        <form className="post-job-form" onSubmit={handlePost}>
          {/* Role */}
          <div className="form-field">
            <label htmlFor="role">Role *</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g., Full-Stack Developer"
              required
            />
          </div>

          {/* Organization Name */}
          <div className="form-field">
            <label htmlFor="organizationName">Organization Name *</label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              placeholder="e.g., TechCorp Inc."
              required
            />
          </div>

          {/* Location */}
          <div className="form-field">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Mumbai, India"
              required
            />
          </div>

          {/* Job Type */}
          <div className="form-field">
            <label htmlFor="jobType">Job Type *</label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Job Type</option>
              <option value="On Site">On Site</option>
              <option value="Work From Home">Work From Home</option>
            </select>
          </div>

          {/* Experience */}
          <div className="form-field">
            <label htmlFor="experience">Experience *</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Experience Range</option>
              <option value="0-2 years">0–2 years</option>
              <option value="2-4 years">2–4 years</option>
              <option value="4-6 years">4–6 years</option>
              <option value="6-8 years">6–8 years</option>
              <option value="8-10 years">8–10 years</option>
            </select>
          </div>

          {/* Skills Required */}
          <div className="form-field">
            <label htmlFor="skillsRequired">Skills Required *</label>
            <input
              type="text"
              id="skillsRequired"
              name="skillsRequired"
              value={formData.skillsRequired}
              onChange={handleInputChange}
              placeholder="e.g., React, Node.js, MongoDB"
              required
            />
          </div>

          {/* Key Responsibilities */}
          <div className="form-field">
            <label htmlFor="keyResponsibilities">Key Responsibilities *</label>
            <input
              type="text"
              id="keyResponsibilities"
              name="keyResponsibilities"
              value={formData.keyResponsibilities}
              onChange={handleInputChange}
              placeholder="e.g., Develop and maintain web applications"
              required
            />
          </div>

          {/* Job Description */}
          <div className="form-field">
            <label htmlFor="jobDescription">Job Description *</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Provide a detailed description of the job role, expectations, and requirements..."
              rows="6"
              required
            />
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="post-btn-green">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
