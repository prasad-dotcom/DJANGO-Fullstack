import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import FreelancerDashboard from './components/FreelancerDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
            </>
          } />
          
          {/* Login Page */}
          <Route path="/login" element={
            <>
              <Navbar />
              <Login />
            </>
          } />
          
          {/* Register Page */}
          <Route path="/register" element={
            <>
              <Navbar />
              <Register />
            </>
          } />
          
          {/* Freelancer Dashboard Page */}
          <Route path="/freelancer-dashboard" element={
            <FreelancerDashboard />
          } />
          
          {/* Recruiter Dashboard Page */}
          <Route path="/recruiter-dashboard" element={
            <RecruiterDashboard />
          } />
          
          {/* Profile Page */}
          <Route path="/profile" element={
            <Profile />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

