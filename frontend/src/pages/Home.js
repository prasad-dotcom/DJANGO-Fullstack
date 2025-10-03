import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    // Show role-specific dashboard
    return user.role === 'freelancer' ? <FreelancerDashboard /> : <RecruiterDashboard />;
  }

  // Landing page for non-authenticated users
  return <LandingPage />;
};

const LandingPage = () => (
  <div className="landing-page">
    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-particles"></div>
        <div className="hero-gradient"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>Trusted by 50,000+ professionals</span>
          </div>
          <h1 className="hero-title">
            The Future of
            <span className="gradient-text"> Work</span>
            <br />Starts Here
          </h1>
          <p className="hero-subtitle">
            Join the world's most advanced freelance platform. Connect with top-tier talent, 
            access cutting-edge tools, and build the career you've always dreamed of.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">$2.5M+</span>
              <span className="stat-label">Paid to freelancers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-large">
              <span className="btn-icon">🚀</span>
              Start Your Journey
            </Link>
            <Link to="/about" className="btn btn-ghost btn-large">
              <span className="btn-icon">▶</span>
              Watch Demo
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Features</div>
          <h2>Built for Modern Professionals</h2>
          <p>Everything you need to succeed in today's competitive freelance market</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4m-5-4V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4m-6 0h6m-6 0l-3 3m3-3l3 3"/>
                </svg>
              </div>
              <div className="feature-number">01</div>
            </div>
            <h3>AI-Powered Matching</h3>
            <p>Our advanced algorithm analyzes your skills, preferences, and work history to connect you with the perfect projects.</p>
            <div className="feature-link">
              <span>Learn more</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div className="feature-number">02</div>
            </div>
            <h3>Real-Time Collaboration</h3>
            <p>Seamless communication tools including video calls, screen sharing, and instant messaging for effective collaboration.</p>
            <div className="feature-link">
              <span>Learn more</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15l-3-3h6l-3 3z"/>
                  <path d="M12 1v6m0 6v6"/>
                </svg>
              </div>
              <div className="feature-number">03</div>
            </div>
            <h3>Secure Payments</h3>
            <p>Enterprise-grade security with escrow protection, automated invoicing, and instant payouts to keep your money safe.</p>
            <div className="feature-link">
              <span>Learn more</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"/>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                </svg>
              </div>
              <div className="feature-number">04</div>
            </div>
            <h3>Advanced Analytics</h3>
            <p>Comprehensive insights into your performance, earnings trends, and market opportunities to optimize your success.</p>
            <div className="feature-link">
              <span>Learn more</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>50,000+</h3>
              <p>Active Professionals</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>$2.5M+</h3>
              <p>Total Earnings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>99.9%</h3>
              <p>Success Rate</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <div className="cta-badge">Ready to Get Started?</div>
          <h2>Join the Future of Work</h2>
          <p>Start building your dream career today with the world's most advanced freelance platform</p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-large">
              <span className="btn-icon">🚀</span>
              Start as Freelancer
            </Link>
            <Link to="/register" className="btn btn-secondary btn-large">
              <span className="btn-icon">🏢</span>
              Hire Talent
            </Link>
          </div>
          <div className="cta-features">
            <div className="cta-feature">
              <span className="feature-icon">✓</span>
              <span>No setup fees</span>
            </div>
            <div className="cta-feature">
              <span className="feature-icon">✓</span>
              <span>Instant access</span>
            </div>
            <div className="cta-feature">
              <span className="feature-icon">✓</span>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const FreelancerDashboard = () => (
  <div className="dashboard-page freelancer-dashboard">
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, Freelancer!</h1>
          <p>Here's what's happening with your projects today</p>
        </div>
        <div className="dashboard-actions-header">
          <Link to="/profile" className="btn btn-ghost">
            <span className="btn-icon">👤</span>
            Profile
          </Link>
          <button className="btn btn-primary">
            <span className="btn-icon">🔍</span>
            Find Projects
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card primary-card">
          <div className="card-header">
            <div className="card-title">
              <h3>Active Projects</h3>
              <span className="card-badge">3</span>
            </div>
            <div className="card-actions">
              <button className="btn-icon-small">⚙️</button>
            </div>
          </div>
          <div className="project-list">
            <div className="project-item">
              <div className="project-avatar">
                <div className="avatar-circle">TC</div>
              </div>
              <div className="project-info">
                <h4>E-commerce Website</h4>
                <p>Client: TechCorp • Due: Dec 15</p>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                  <span className="progress-text">75% Complete</span>
                </div>
              </div>
              <div className="project-status active">In Progress</div>
            </div>
            <div className="project-item">
              <div className="project-avatar">
                <div className="avatar-circle">SX</div>
              </div>
              <div className="project-info">
                <h4>Mobile App Design</h4>
                <p>Client: StartupXYZ • Due: Dec 20</p>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '90%'}}></div>
                  </div>
                  <span className="progress-text">90% Complete</span>
                </div>
              </div>
              <div className="project-status review">Review</div>
            </div>
            <div className="project-item">
              <div className="project-avatar">
                <div className="avatar-circle">ID</div>
              </div>
              <div className="project-info">
                <h4>Brand Identity</h4>
                <p>Client: InnovateDesign • Due: Dec 25</p>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '45%'}}></div>
                  </div>
                  <span className="progress-text">45% Complete</span>
                </div>
              </div>
              <div className="project-status pending">Pending</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card stats-card">
          <div className="card-header">
            <h3>Performance</h3>
            <div className="card-period">This Month</div>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <span className="stat-number">$2,450</span>
                <span className="stat-label">Earnings</span>
                <span className="stat-change positive">+12%</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <span className="stat-number">12</span>
                <span className="stat-label">Projects</span>
                <span className="stat-change positive">+3</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Rating</span>
                <span className="stat-change neutral">0</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <span className="stat-number">156h</span>
                <span className="stat-label">Hours</span>
                <span className="stat-change positive">+8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card suggestions-card">
          <div className="card-header">
            <h3>Recommended Projects</h3>
            <button className="btn-text">View All</button>
          </div>
          <div className="project-suggestions">
            <div className="suggestion-item">
              <div className="suggestion-header">
                <div className="suggestion-avatar">LD</div>
                <div className="suggestion-info">
                  <h4>Logo Design Needed</h4>
                  <p>Tech Startup • 2 days ago</p>
                </div>
                <div className="suggestion-budget">$500</div>
              </div>
              <div className="suggestion-tags">
                <span className="tag">Design</span>
                <span className="tag">Logo</span>
                <span className="tag">3 days</span>
              </div>
            </div>
            <div className="suggestion-item">
              <div className="suggestion-header">
                <div className="suggestion-avatar">SM</div>
                <div className="suggestion-info">
                  <h4>Social Media Manager</h4>
                  <p>Marketing Agency • 1 day ago</p>
                </div>
                <div className="suggestion-budget">$800/mo</div>
              </div>
              <div className="suggestion-tags">
                <span className="tag">Marketing</span>
                <span className="tag">Social Media</span>
                <span className="tag">Ongoing</span>
              </div>
            </div>
            <div className="suggestion-item">
              <div className="suggestion-header">
                <div className="suggestion-avatar">WD</div>
                <div className="suggestion-info">
                  <h4>Website Development</h4>
                  <p>E-commerce Store • 3 hours ago</p>
                </div>
                <div className="suggestion-budget">$2,500</div>
              </div>
              <div className="suggestion-tags">
                <span className="tag">Development</span>
                <span className="tag">E-commerce</span>
                <span className="tag">2 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <div className="quick-actions">
          <button className="quick-action-btn">
            <span className="action-icon">📝</span>
            <span>Create Proposal</span>
          </button>
          <button className="quick-action-btn">
            <span className="action-icon">📊</span>
            <span>View Analytics</span>
          </button>
          <button className="quick-action-btn">
            <span className="action-icon">💬</span>
            <span>Messages</span>
          </button>
          <button className="quick-action-btn">
            <span className="action-icon">⚙️</span>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const RecruiterDashboard = () => (
  <div className="dashboard-page recruiter-dashboard">
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, Recruiter!</h1>
        <p>Manage your projects and find the best talent</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card primary-card">
          <div className="card-header">
            <h3>Active Projects</h3>
            <span className="card-badge">5</span>
          </div>
          <div className="project-list">
            <div className="project-item">
              <div className="project-info">
                <h4>Website Redesign</h4>
                <p>Budget: $3,000 • 12 proposals</p>
              </div>
              <div className="project-status">Hiring</div>
            </div>
            <div className="project-item">
              <div className="project-info">
                <h4>Mobile App Development</h4>
                <p>Budget: $8,000 • In Progress</p>
              </div>
              <div className="project-status">Active</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Project Analytics</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">$15,200</span>
              <span className="stat-label">Total Spent</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Proposals</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Top Freelancers</h3>
          </div>
          <div className="freelancer-list">
            <div className="freelancer-item">
              <div className="freelancer-avatar">JS</div>
              <div className="freelancer-info">
                <h4>John Smith</h4>
                <p>Web Developer • ⭐ 4.9</p>
              </div>
            </div>
            <div className="freelancer-item">
              <div className="freelancer-avatar">MJ</div>
              <div className="freelancer-info">
                <h4>Maria Johnson</h4>
                <p>UI/UX Designer • ⭐ 4.8</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/profile" className="btn btn-primary">View Profile</Link>
        <button className="btn btn-secondary">Post New Project</button>
      </div>
    </div>
  </div>
);

export default Home;
