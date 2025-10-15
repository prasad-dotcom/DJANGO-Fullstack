import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobSearch.css';

const JobSearch = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('recommended');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: '',
    salary: '',
    location: '',
    experience: ''
  });

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  const handleBackToDashboard = () => {
    navigate('/freelancer-dashboard');
  };

  const handleApply = (jobTitle) => {
    console.log(`Applied for ${jobTitle}`);
  };

  const handleSave = (jobTitle) => {
    console.log(`Saved ${jobTitle}`);
  };

  const handleSelectAll = () => {
    const allJobIds = jobs.map(job => job.id);
    setSelectedJobs(selectedJobs.length === allJobIds.length ? [] : allJobIds);
  };

  const handleJobSelect = (jobId) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Static job data
  const jobs = [
    {
      id: 1,
      title: "Senior Software Development Engineer Test",
      company: "Zodnik Solutions",
      experience: "4-7 yrs",
      location: "Hyderabad, India",
      salary: "₹8-12 LPA",
      postedDate: "Posted 16 days ago",
      isEarlyApplicant: true
    },
    {
      id: 2,
      title: "Application Development Lead Analyst",
      company: "Manipal Cigna Insurance Group",
      experience: "5-8 yrs",
      location: "Hyderabad",
      salary: "₹10-15 LPA",
      postedDate: "Posted a month ago",
      isEarlyApplicant: true
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "TechCorp Solutions",
      experience: "3-6 yrs",
      location: "Bangalore, India",
      salary: "₹6-10 LPA",
      postedDate: "Posted 3 days ago",
      isEarlyApplicant: false
    },
    {
      id: 4,
      title: "React Developer",
      company: "Digital Innovations",
      experience: "2-5 yrs",
      location: "Mumbai, India",
      salary: "₹5-8 LPA",
      postedDate: "Posted 1 week ago",
      isEarlyApplicant: true
    },
    {
      id: 5,
      title: "Python Developer",
      company: "DataTech Labs",
      experience: "3-7 yrs",
      location: "Chennai, India",
      salary: "₹7-12 LPA",
      postedDate: "Posted 5 days ago",
      isEarlyApplicant: false
    }
  ];

  return (
    <div className="job-search-page">
      {/* Header Section */}
      <header className="job-search-header">
        <div className="header-left">
          <button className="back-btn" onClick={handleBackToDashboard}>
            ← Back to Dashboard
          </button>
          <h1>Find Your Dream Job</h1>
        </div>
        <div className="header-right">
          <button className="header-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="job-search-content">
        {/* Filter Sidebar */}
        <div className="filter-sidebar">
          <div className="filter-card">
            <h3 className="filter-title">Filters</h3>
            
            <div className="filter-group">
              <label className="filter-label">Job Type</label>
              <select 
                className="filter-select"
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Salary Range</label>
              <select 
                className="filter-select"
                value={filters.salary}
                onChange={(e) => handleFilterChange('salary', e.target.value)}
              >
                <option value="">All Salaries</option>
                <option value="0-5">₹0-5 LPA</option>
                <option value="5-10">₹5-10 LPA</option>
                <option value="10-15">₹10-15 LPA</option>
                <option value="15+">₹15+ LPA</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Location</label>
              <select 
                className="filter-select"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="bangalore">Bangalore</option>
                <option value="mumbai">Mumbai</option>
                <option value="chennai">Chennai</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Experience</label>
              <select 
                className="filter-select"
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="0-2">0-2 years</option>
                <option value="2-5">2-5 years</option>
                <option value="5-8">5-8 years</option>
                <option value="8+">8+ years</option>
              </select>
            </div>

            <button className="clear-filters-btn">Clear All Filters</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Navigation Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button 
                className={`tab ${selectedTab === 'recommended' ? 'active' : ''}`}
                onClick={() => setSelectedTab('recommended')}
              >
                Recommended jobs
              </button>
              <button 
                className={`tab ${selectedTab === 'saved' ? 'active' : ''}`}
                onClick={() => setSelectedTab('saved')}
              >
                Saved jobs
              </button>
              <button 
                className={`tab ${selectedTab === 'applied' ? 'active' : ''}`}
                onClick={() => setSelectedTab('applied')}
              >
                Applied jobs
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="job-listings">
            <div className="job-listings-header">
              <span className="job-count">Showing {jobs.length} jobs</span>
              <label className="select-all-container">
                <input 
                  type="checkbox" 
                  checked={selectedJobs.length === jobs.length && jobs.length > 0}
                  onChange={handleSelectAll}
                />
                Select all (upto 15 quick apply jobs)
              </label>
            </div>

            <div className="jobs-section">
              <h2 className="section-heading">Jobs based on preferences</h2>
              
              <div className="jobs-grid">
                {jobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-card-content">
                      <div className="job-main-info">
                        <h3 className="job-title">{job.title}</h3>
                        <div className="job-company">
                          <span className="company-name">{job.company}</span>
                          <div className="company-logo">🏢</div>
                        </div>
                        
                        <div className="job-details">
                          <div className="job-detail-item">
                            <span className="detail-icon">💼</span>
                            <span className="detail-text">{job.experience}</span>
                          </div>
                          <div className="job-detail-item">
                            <span className="detail-icon">📍</span>
                            <span className="detail-text">{job.location}</span>
                          </div>
                        </div>

                        <div className="job-status">
                          <span className="status-icon">🕐</span>
                          <span className="status-text">Early Applicant</span>
                        </div>

                        <div className="job-posted">{job.postedDate}</div>
                      </div>

                      <div className="job-actions">
                        <button 
                          className="save-btn"
                          onClick={() => handleSave(job.title)}
                        >
                          <span className="btn-icon">🔖</span>
                          Save
                        </button>
                        <button 
                          className="apply-btn"
                          onClick={() => handleApply(job.title)}
                        >
                          <span className="btn-icon">⚡</span>
                          Quick Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          {/* Preferences Card */}
          <div className="preferences-card">
            <div className="card-header">
              <h3 className="card-title">Make sure your preferences are correct!</h3>
              <button className="edit-btn">✏️</button>
            </div>
            <div className="preferences-content">
              <div className="preference-item">
                <span className="preference-label">Preferred Role:</span>
                <span className="preference-value">Software Developer, Full Stack</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Preferred Location:</span>
                <span className="preference-value">Hyderabad / Secunderabad, Telangana</span>
              </div>
            </div>
          </div>

          {/* App Promotion Card */}
          <div className="app-promotion-card">
            <h3 className="card-title">Real-time notifications</h3>
            <p className="card-description">
              Discover new jobs, get recruiter notifications, track applications & more with the TalentLoop App.
            </p>
            <div className="app-buttons">
              <button className="app-store-btn">
                <span className="store-icon">🍎</span>
                Download on the App Store
              </button>
              <button className="google-play-btn">
                <span className="store-icon">📱</span>
                Get it on Google Play
              </button>
            </div>
            <div className="qr-section">
              <div className="qr-code">
                <div className="qr-placeholder">📱</div>
              </div>
              <p className="qr-text">Scan to download TalentLoop App</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
