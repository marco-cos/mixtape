import React from 'react';
import logo from './logo.png';
import searchicon from './searchicon.svg';
import './App.css';
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <nav>
      <div className="logo">
      <li><Link to="/"><img src={logo} alt="logo"/></Link></li>
      </div>
      <div className="links">
          <ul id="navbartext">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/albums">Albums</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            </ul>
          <div className="search">
              <input type="text" class="searchTerm" placeholder="search"></input>
              <button type="submit">
                <img src={searchicon} alt="go"/>
              </button>
          </div>
      </div>

  </nav>
  );
}

export default Navbar;