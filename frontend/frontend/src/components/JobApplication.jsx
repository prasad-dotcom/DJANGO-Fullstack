import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './JobApplication.css';

const JobApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Default job data structure
  const defaultJobData = {
    id: 1,
    title: "Senior Software Development Engineer Test",
    company: "Zodnik Solutions",
    location: "Hyderabad, India",
    jobType: "Hybrid",
    experience: "4-7 years",
    salary: "₹8-12 LPA",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "AWS"],
    responsibilities: [
      "Design and develop scalable web applications using React and Node.js",
      "Collaborate with cross-functional teams to deliver high-quality software",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and technical discussions",
      "Mentor junior developers and contribute to team growth",
      "Implement best practices for testing and deployment"
    ],
    description: "We are looking for a passionate Senior Software Development Engineer to join our dynamic team. You will be responsible for developing and maintaining high-quality web applications, working with modern technologies, and contributing to our product's success. The ideal candidate should have strong problem-solving skills, excellent communication abilities, and a passion for creating innovative solutions."
  };

  // Merge passed job data with default data to ensure all required fields exist
  const jobData = {
    ...defaultJobData,
    ...location.state?.jobData,
    skills: location.state?.jobData?.skills || defaultJobData.skills,
    responsibilities: location.state?.jobData?.responsibilities || defaultJobData.responsibilities
  };

  const handleBackToJobSearch = () => {
    navigate('/job-search');
  };

  const handleApply = () => {
    // Simulate application process
    console.log(`Applied for ${jobData.title} at ${jobData.company}`);
    
    // Show success popup
    setShowSuccessPopup(true);
    
    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  return (
    <div className="job-application-page">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <div className="popup-icon">✓</div>
            <h3>Applied Successfully!</h3>
            <p>Your application has been submitted to {jobData.company}</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="application-header">
        <div className="header-content">
          <button className="back-btn" onClick={handleBackToJobSearch}>
            <span className="back-icon">←</span>
            Back to Job Search
          </button>
          <h1 className="header-title">Job Application</h1>
        </div>
      </header>

      <div className="application-container">
        {/* Job Details Card */}
        <div className="job-details-card">
          <div className="card-header">
            <div className="job-header-info">
              <h2 className="job-title">{jobData.title}</h2>
              <div className="company-info">
                <span className="company-icon">🏢</span>
                <span className="company-name">{jobData.company}</span>
              </div>
            </div>
            <div className="job-status-badge">
              <span className="status-dot"></span>
              Active
            </div>
          </div>

          {/* Job Overview */}
          <div className="job-overview">
            <div className="overview-grid">
              <div className="overview-item">
                <span className="overview-icon">📍</span>
                <div className="overview-content">
                  <span className="overview-label">Location</span>
                  <span className="overview-value">{jobData.location}</span>
                </div>
              </div>
              
              <div className="overview-item">
                <span className="overview-icon">💼</span>
                <div className="overview-content">
                  <span className="overview-label">Job Type</span>
                  <span className="overview-value">{jobData.jobType}</span>
                </div>
              </div>
              
              <div className="overview-item">
                <span className="overview-icon">⏰</span>
                <div className="overview-content">
                  <span className="overview-label">Experience</span>
                  <span className="overview-value">{jobData.experience}</span>
                </div>
              </div>
              
              <div className="overview-item">
                <span className="overview-icon">💰</span>
                <div className="overview-content">
                  <span className="overview-label">Salary</span>
                  <span className="overview-value">{jobData.salary}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Required */}
          <div className="job-section">
            <h3 className="section-title">
              <span className="section-icon">🛠️</span>
              Skills Required
            </h3>
            <div className="skills-container">
              {(jobData.skills || []).map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Key Responsibilities */}
          <div className="job-section">
            <h3 className="section-title">
              <span className="section-icon">📋</span>
              Key Responsibilities
            </h3>
            <ul className="responsibilities-list">
              {(jobData.responsibilities || []).map((responsibility, index) => (
                <li key={index} className="responsibility-item">
                  <span className="responsibility-bullet">•</span>
                  <span className="responsibility-text">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Description */}
          <div className="job-section">
            <h3 className="section-title">
              <span className="section-icon">📝</span>
              Job Description
            </h3>
            <div className="job-description">
              <p>{jobData.description}</p>
            </div>
          </div>

          {/* Application Section */}
          <div className="application-section">
            <div className="application-info">
              <h3 className="application-title">Ready to Apply?</h3>
              <p className="application-subtitle">
                Click the apply button below to submit your application for this position.
              </p>
            </div>
            
            <button className="apply-button" onClick={handleApply}>
              <span className="apply-icon">⚡</span>
              Apply Now
            </button>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="additional-info-card">
          <h3 className="card-title">Application Tips</h3>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">💡</span>
              <span className="tip-text">Make sure your profile is up to date</span>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📄</span>
              <span className="tip-text">Attach your latest resume</span>
            </div>
            <div className="tip-item">
              <span className="tip-icon">✍️</span>
              <span className="tip-text">Write a compelling cover letter</span>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🎯</span>
              <span className="tip-text">Highlight relevant experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;