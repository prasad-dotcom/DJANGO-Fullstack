import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllProjects.css';

const AllProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);  // State for fetched projects
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState('');  // Error state

    // Helper function to get authentication headers with token from localStorage
    const getAuthHeaders = () => {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token') || localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}`, Accept: 'application/json' } : { Accept: 'application/json' };
    };

    // Function to fetch projects from the API
    const fetchProjects = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/accounts/jobs/', {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            if (response.ok) {
                const data = await response.json();
                // Map API response to project structure (adjust fields based on API response)
                const mappedProjects = data.map((job) => ({
                    id: job.job_id,
                    projectName: job.job_role || 'Unnamed Project',  // Use job_role as project name
                    location: job.location || 'Not specified',
                    
                    status: 'Not Started',  // Default status; update if API provides status
                    postedDate: job.created_at ? new Date(job.created_at).toLocaleDateString() : 'Unknown',
                }));
                setProjects(mappedProjects);
            } else if (response.status === 401) {
                setError('Session expired. Please log in.');
                navigate('/login');  // Redirect to login on auth failure
            } else {
                setError('Failed to fetch projects.');
            }
        } catch (err) {
            setError('Network error fetching projects.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch projects on component mount
    useEffect(() => {
        fetchProjects();
    }, [navigate]);

    // Handler to navigate back to dashboard
    const handleBackToDashboard = () => {
        navigate('/recruiter-dashboard');
    };

    // Function to get CSS class based on project status
    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed':
                return 'status-completed';
            case 'In Progress':
                return 'status-in-progress';
            case 'About to Start':
                return 'status-about-to-start';
            case 'Not Started':
                return 'status-not-started';
            default:
                return '';
        }
    };

    return (
    <div className="all-projects-page">
      {/* Header */}
      <div className="all-projects-header">
        <div className="header-content">
          <h1 className="page-title">All Posted Projects</h1>
          <p className="projects-count">Total Projects: {projects.length}</p>
        </div>
        <button className="back-dashboard-btn" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
      </div>

      {/* Projects Grid */}
      <div className="projects-container">
        {projects.length === 0 ? (
          <div className="no-projects">
            <h3>No projects posted yet!</h3>
            <p>Click the "Post" button to create your first project.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-card-header">
                  <h3 className="project-name">{project.projectName}</h3>
                  <div className={`project-status ${getStatusClass(project.status)}`}>
                    <span className="status-indicator"></span>
                    {project.status}
                  </div>
                </div>
                
                <div className="project-details-section">
                  <div className="detail-item">
                    <span className="detail-label">Salary Offered: </span>
                    <span className="detail-value salary-value">{project.salary}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Location: </span>
                    <span className="detail-value location-value">{project.location}</span>
                  </div>
                </div>

                <div className="project-actions">
                  <button className="action-btn view-btn">View Details</button>
                  <button className="action-btn edit-btn">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
