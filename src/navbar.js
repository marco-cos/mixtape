import React from 'react';
import logo from './logo.png';
import './App.css';

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
              <li><a href="app.js">home</a></li>
              <li><a href="albums.js">albums</a></li>
              <li><a href="profile.js">profile</a></li>
              <li><a href="login.js">login</a></li>
              <li><a href="register.js">register</a></li>
              <button type="button">search</button>
            </ul>
          </nav>
        </div>
      </div>
  </div>
    
  );
}

export default Navbar;