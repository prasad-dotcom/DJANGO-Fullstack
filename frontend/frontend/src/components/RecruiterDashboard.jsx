import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [recentProjects, setRecentProjects] = useState([]); // State for latest projects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  // Helper function to get authentication headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token') || localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}`, Accept: 'application/json' } : { Accept: 'application/json' };
  };

  // Function to fetch the latest two projects from the API
  const fetchRecentProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/accounts/jobs/', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        // Sort jobs by creation date and take the latest two
        const sortedProjects = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecentProjects(sortedProjects.slice(0, 2)); // Take the latest two projects
      } else if (response.status === 401) {
        setError('Session expired. Please log in.');
        navigate('/login'); // Redirect to login
      } else {
        setError('Failed to fetch recent projects.');
      }
    } catch (err) {
      setError('Network error fetching recent projects.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent projects on component mount
  useEffect(() => {
    fetchRecentProjects();
  }, [navigate]);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/accounts/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (!res.ok) throw new Error('Logout failed');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/');
    } catch (err) {
      alert(err.message);
      navigate('/');
    }
  };

  const handleProfile = () => {
    navigate('/recruiter-profile');
  };

  const handlePostProject = () => {
    navigate('/post-project');
  };

  const handleViewAllProjects = () => {
    navigate('/all-projects');
  };

  const handleContactProject = (project) => {
    console.log(`Contacting ${project.freelancer}`);
  };

  return (
    <div className="recruiter-dashboard-page">
      {/* Header Section */}
      <header className="recruiter-header">
        <div className="welcome-text">
          <h1>Welcome! Recruiter</h1>
        </div>
        <div className="header-buttons">
          <button className="header-btn" onClick={handlePostProject}>
            Post
          </button>
          <button className="header-btn" onClick={handleProfile}>
            Profile
          </button>
          <button className="header-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="recruiter-content">
        {/* Top Section: Analytics and Current Projects */}
        <div className="recruiter-top-section">
          {/* Analytics Section */}
          <div className="analytics-section">
            <h2 className="section-title">Monthly Analytics</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <div className="analytics-label">Money Spent</div>
                <div className="analytics-value">₹80,000</div>
              </div>
              <div className="analytics-card">
                <div className="analytics-label">Projects Completed</div>
                <div className="analytics-value">10</div>
              </div>
            </div>
          </div>

          {/* Current Projects Section */}
          <div className="current-projects-section">
            <div className="current-projects-header">
              <h2 className="section-title">Current Projects</h2>
              <button className="view-all-btn" onClick={handleViewAllProjects}>
                View All
              </button>
            </div>

            <div className="current-projects-list">
              {loading ? (
                <div className="loading">Loading recent projects...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : recentProjects.length === 0 ? (
                <div className="no-projects">No recent projects found.</div>
              ) : (
                recentProjects.map((project) => (
                  <div key={project.id} className="current-project-card">
                    <div className="project-details">
                      <div className="project-field">
                        <span className="field-label">Project:</span>
                        <span className="field-value">{project.job_role}</span>
                      </div>
                      <div className="project-field">
                        <span className="field-label">Freelancer:</span>
                        <span className="field-value">{project.freelancer || 'Not assigned'}</span>
                      </div>
                      <div className="project-field">
                        <span className="field-label">Pay:</span>
                        <span className="field-value pay-amount">{project.salary || 'Not specified'}</span>
                      </div>
                    </div>
                    <button
                      className="contact-btn"
                      onClick={() => handleContactProject(project)}
                    >
                      Contact
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Post A Project Section */}
        <div className="post-project-compact-section">
          <h2 className="post-project-title">POST A PROJECT !</h2>
          <button className="glow-post-btn" onClick={handlePostProject}>
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;