import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="main-content">
      <div className="about-hero">
        <div className="container">
          <div className="about-content">
            <h1>About FreelanceHub</h1>
            <p className="about-subtitle">
              Connecting talent with opportunity, one project at a time.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Mission</h2>
              <p>
                At FreelanceHub, we believe that great work happens when talented people 
                can connect with meaningful opportunities. Our platform bridges the gap 
                between skilled freelancers and innovative companies, creating a global 
                marketplace where creativity and expertise thrive.
              </p>
              <p>
                We're committed to providing a secure, efficient, and user-friendly 
                environment that empowers both freelancers and recruiters to achieve 
                their professional goals.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span className="image-icon">🎯</span>
                <p>Mission Driven</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section alt">
        <div className="container">
          <div className="about-grid reverse">
            <div className="about-text">
              <h2>Our Vision</h2>
              <p>
                We envision a world where geographical boundaries don't limit professional 
                opportunities. A world where talent is recognized and rewarded regardless 
                of location, and where businesses can access the best minds from around 
                the globe.
              </p>
              <p>
                Through our platform, we're building the future of work - one that's 
                flexible, inclusive, and focused on results rather than traditional 
                office constraints.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span className="image-icon">🌍</span>
                <p>Global Impact</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Trust & Transparency</h3>
              <p>We believe in building relationships based on honesty, clear communication, and mutual respect.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We continuously evolve our platform to provide cutting-edge tools and features for our community.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Excellence</h3>
              <p>We strive for the highest quality in everything we do, from platform features to customer support.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Community</h3>
              <p>We foster a supportive environment where everyone can learn, grow, and succeed together.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>Ready to Join Our Community?</h2>
          <p>Be part of the future of work. Start your journey with FreelanceHub today.</p>
          <div className="cta-buttons">
            <a href="/register" className="btn btn-primary">Get Started</a>
            <a href="/login" className="btn btn-secondary">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;










