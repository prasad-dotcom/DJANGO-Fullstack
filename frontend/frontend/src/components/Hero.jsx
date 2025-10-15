import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-overlay"></div>
        <div className="circular-glow"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          Empowering Freelancers & Recruiters in One Platform
        </h1>
        
        <p className="hero-subtitle">
          Connect, Collaborate, and Create Opportunities
        </p>
        
        <div className="hero-buttons">
          <Link to="/register" className="hero-button primary">
            Get Started
          </Link>
          
          <button 
            className="hero-button secondary"
            onClick={scrollToAbout}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

