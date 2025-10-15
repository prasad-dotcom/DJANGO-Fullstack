import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobSearch.css';

const JobSearch = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('recommended');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: '',
    salary: '',
    location: '',
    experience: ''
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token') || localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}`, Accept: 'application/json' } : { Accept: 'application/json' };
  };

  // Separate function for fetching jobs data
  const fetchJobsData = async () => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token') || localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Starting job fetch...');
      const response = await fetch('http://127.0.0.1:8000/api/v1/accounts/jobs/', {
        method: 'GET',
        headers: getAuthHeaders()
      });
      console.log('Fetch response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched jobs data:', data);
        setJobs(data);
      } else if (response.status === 401) {
        console.log('Unauthorized: Removing token and redirecting to login');
        localStorage.removeItem('token');
        setError('Session expired. Please log in again.');
        navigate('/login');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.log('Fetch error data:', errorData);
        setError(`Failed to fetch jobs: ${response.status} - ${errorData.detail || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Network error during fetch:', err);
      setError('Network error: Check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobsData();
  }, [navigate]);

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  const handleBackToDashboard = () => {
    navigate('/freelancer-dashboard');
  };

  const handleApply = (job) => {
    console.log(`Navigating to apply for ${job.job_role}`);
    navigate('/job-application', { 
      state: { 
        jobData: job
      } 
    });
  };

  // Load applied jobs from localStorage on component mount
  useEffect(() => {
    const savedAppliedJobs = localStorage.getItem('appliedJobs');
    if (savedAppliedJobs) {
      setAppliedJobs(JSON.parse(savedAppliedJobs));
    }
  }, []);

  // Check for new applied jobs when window gains focus (returning from job application)
  useEffect(() => {
    const handleFocus = () => {
      const savedAppliedJobs = localStorage.getItem('appliedJobs');
      if (savedAppliedJobs) {
        setAppliedJobs(JSON.parse(savedAppliedJobs));
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleSave = (job) => {
    const isJobSaved = savedJobs.some(savedJob => savedJob.job_id === job.job_id);
    
    if (isJobSaved) {
      // Remove from saved jobs
      setSavedJobs(prev => prev.filter(savedJob => savedJob.job_id !== job.job_id));
      console.log(`Removed ${job.job_role} from saved jobs`);
    } else {
      // Add to saved jobs
      setSavedJobs(prev => [...prev, job]);
      console.log(`Added ${job.job_role} to saved jobs`);
    }
  };

  const handleSelectAll = () => {
    const allJobIds = jobs.map(job => job.job_id);
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

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
              <span className="job-count">
                Showing {
                  selectedTab === 'saved' ? savedJobs.length : 
                  selectedTab === 'applied' ? appliedJobs.length : 
                  jobs.length
                } jobs
              </span>
              {selectedTab === 'recommended' && (
                <label className="select-all-container">
                  <input 
                    type="checkbox" 
                    checked={selectedJobs.length === jobs.length && jobs.length > 0}
                    onChange={handleSelectAll}
                  />
                  Select all (upto 15 quick apply jobs)
                </label>
              )}
            </div>

            <div className="jobs-section">
              <h2 className="section-heading">
                {selectedTab === 'saved' ? 'Your Saved Jobs' : 
                 selectedTab === 'applied' ? 'Your Applied Jobs' : 
                 'Jobs based on preferences'}
              </h2>
              
              <div className="jobs-grid">
                {(selectedTab === 'saved' ? savedJobs : 
                  selectedTab === 'applied' ? appliedJobs : 
                  jobs).map(job => {
                  const isJobSaved = savedJobs.some(savedJob => savedJob.job_id === job.job_id);
                  const isJobApplied = appliedJobs.some(appliedJob => appliedJob.job_id === job.job_id);
                  
                  return (
                    <div key={job.job_id} className="job-card">
                      <div className="job-card-content">
                        <div className="job-main-info">
                          <h3 className="job-title">{job.job_role}</h3>
                          <div className="job-company">
                            <span className="company-name">{job.organization_name}</span>
                            <div className="company-logo">🏢</div>
                          </div>
                          
                          <div className="job-details">
                            <div className="job-detail-item">
                              <span className="detail-icon">💼</span>
                              <span className="detail-text">{job.experience_required}</span>
                            </div>
                            <div className="job-detail-item">
                              <span className="detail-icon">📍</span>
                              <span className="detail-text">{job.location}</span>
                            </div>
                            <div className="job-detail-item">
                              <span className="detail-icon">🏷️</span>
                              <span className="detail-text">{job.job_type}</span>
                            </div>
                          </div>

                          <div className="job-status">
                            <span className="status-icon">🕐</span>
                            <span className="status-text">
                              {selectedTab === 'applied' ? job.status || 'Applied' : 'Early Applicant'}
                            </span>
                          </div>

                          <div className="job-posted">
                            <p>Posted on: {new Date(job.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="job-actions">
                          {selectedTab !== 'applied' && (
                            <button 
                              className={`save-btn ${isJobSaved ? 'saved' : ''}`}
                              onClick={() => handleSave(job)}
                            >
                              <span className="btn-icon">{isJobSaved ? '❤️' : '🔖'}</span>
                              {isJobSaved ? 'Saved' : 'Save'}
                            </button>
                          )}
                          {selectedTab === 'applied' ? (
                            <button className="applied-btn" disabled>
                              <span className="btn-icon">✓</span>
                              Applied
                            </button>
                          ) : (
                            <button 
                              className={`apply-btn ${isJobApplied ? 'applied' : ''}`}
                              onClick={() => handleApply(job)}
                              disabled={isJobApplied}
                            >
                              <span className="btn-icon">{isJobApplied ? '✓' : '⚡'}</span>
                              {isJobApplied ? 'Applied' : 'Quick Apply'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {selectedTab === 'saved' && savedJobs.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">🔖</div>
                  <h3>No saved jobs yet</h3>
                  <p>Start saving jobs you're interested in by clicking the save button on any job listing.</p>
                  <button 
                    className="browse-jobs-btn"
                    onClick={() => setSelectedTab('recommended')}
                  >
                    Browse Jobs
                  </button>
                </div>
              )}

              {selectedTab === 'applied' && appliedJobs.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <h3>No applied jobs yet</h3>
                  <p>Start applying to jobs you're interested in by clicking the apply button on any job listing.</p>
                  <button 
                    className="browse-jobs-btn"
                    onClick={() => setSelectedTab('recommended')}
                  >
                    Browse Jobs
                  </button>
                </div>
              )}
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
