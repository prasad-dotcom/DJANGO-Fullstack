import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title">
            About FreelanceConnect
          </h2>
          
          <p className="about-description">
            FreelanceConnect is a platform built to bridge the gap between talented freelancers and recruiters, 
            offering a seamless hiring and project collaboration experience. Our mission is to empower creative 
            professionals and businesses to connect, collaborate, and create amazing opportunities together.
          </p>
          
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Smart Matching</h3>
              <p>AI-powered matching system connects the right talent with the right projects</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">💼</div>
              <h3>Project Management</h3>
              <p>Built-in tools for project tracking, communication, and milestone management</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>Safe and reliable payment processing with escrow protection for both parties</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

