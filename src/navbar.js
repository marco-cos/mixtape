import React from 'react';
import logo from './logo.png';
import './App.css';
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <div className="bar">
      <div className="leftSection">
        <div className="logo">
          <img src={logo} alt="logo"/>
        </div>
      </div>
      <div className="centerSpacing">
      </div>
      <div className="rightSection">
        <div className="links">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/albums">Albums</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </nav>
        </div>
      </div>
  </div>
  );
}

export default Navbar;