import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Pics/TalentLoop logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <img 
              src={logo} 
              alt="TalentLoop Logo" 
              className="logo-image"
            />
            <span className="logo-text">TalentLoop</span>
          </Link>
        </div>
        
        <div className="navbar-buttons">
          <button 
            className="nav-button"
            onClick={scrollToAbout}
          >
            About
          </button>
          
          <Link to="/register" className="nav-button">
            Register
          </Link>
          
          <Link to="/login" className="nav-button">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

