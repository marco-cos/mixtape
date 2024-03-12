import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../images/mixtape_newlogo_small.png';
import searchicon from '../images/searchicon.svg';
import '../App.css';
import { Link } from 'react-router-dom'


function Navbar() {
  const [results, setresults] = useState([]);

  const handleSearch = async (query) => {
    if (query != "") {
        try {
            const response = await axios.post('/searchresults', { query }, {withCredentials: true});
            setresultvisibility(true);
            setresults(response.data);
          } catch (error) {
            console.error(error);
          }
    }
    else {
      setresultvisibility(false)
    }
  };
  const [resultsvisible, setresultvisibility] = useState(false);

  let searchresults = {
    position:"fixed",
    backgroundColor: "white",
    marginTop:"-10px",
    fontSize:"20px",
    padding: "0",
    zIndex: "1000",
    right:"0",
    borderRadius:"10px",
    visibility: resultsvisible ? "visible" : "hidden",
    paddingLeft:"10px",
  };


function hidesearch(){
  setresultvisibility(false);
}

  return (
    <div>
    <nav>
      <div className="logo">
      <li><Link to="/"><img src={logo} alt="logo" width="15%"/></Link></li>
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
              <input type="text" class="searchTerm" placeholder="search" onChange={(e) => handleSearch(e.target.value)}></input>
              <button type="submit">
                <img src={searchicon} alt="go"/>
              </button>
          </div>

      </div>

  </nav>
    <div >
      <ul style={searchresults}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <li style={{color:"black"}} ><b>Search Results: </b></li>
          <li onClick={hidesearch} style={{color:"red",textDecoration:"underline",cursor:"pointer",padding:"0"}}>X</li>
        </div>
        <p style={{color:"black"}}><b>Users:</b></p>
        {results.map((user) => (<li style={{padding:"0"}} key={user._id}><a href={"user/"+user.username}>{user.username}</a> <br/></li>))}
\        <br/>
      </ul>
    </div>
  </div>

  );
}

export default Navbar;