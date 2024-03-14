import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext'; // Import the useAuth hook
import logo from '../images/mixtape_newlogo_small.png';
import searchicon from '../images/searchicon.svg';
import '../App.css';
import { Link } from 'react-router-dom';


function Navbar() {
  const [user, setUser] = useState({});
  var { userId }  = useAuth();

  console.log("local storage: ", userId);
  if (userId === null) {
      const localId = localStorage.getItem('userId');
      console.log("localId:", localId);
      if (localId === null) {
          console.error('please log in');
      }
      userId = localId;
  }
  const getUser = async() => {
      console.log(userId); 
      try {
          const response = await axios.get('http://localhost:8000/profile/', {
              params: { userId }
          });
          setUser(response.data.user);
      } catch (error) {
          console.error("error fetching user data:", error);
      }
  };

  useEffect (() => {
      if (user.username) {};
      getUser();
  }, [user.username]);

  const [results, setresults] = useState({ users: [], albums: [] });

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
    visibility: resultsvisible ? "visible" : "hidden"
  };


function hidesearch(){
  setresultvisibility(false);
}
  return (
    <div>
    <nav>
      <div>
        <li><Link to="/"><img src={logo} width='135px' height='50px' alt="logo"/></Link></li>
      </div>
      <div className="loggedinas">Logged in as:  {user.username}</div>
      <div className="links">
          <ul id="navbartext">
            <li><Link to="/" style={{color:"white"}}>Home</Link></li>
            <li><Link to="/albums" style={{color:"white"}}>Albums</Link></li>
            <li><Link to="/profile" style={{color:"white"}}>Profile</Link></li>
            <li><Link to="/login" style={{color:"white"}}>Login</Link></li>
            <li><Link to="/register" style={{color:"white"}}>Register</Link></li>
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
        {results.users.map((users) => (<li style={{padding:"0"}} key={users._id}>
          <a href={`/profile/${users.username}`}>{users.username}</a><br/></li>))}
        <p style={{color:"black"}}><b>Albums:</b></p>
        {results.albums.map((albums) => (<li style={{padding:"0"}} key={albums._id}><a href={`/albums/${albums.title}`}>{albums.title + " - " + albums.artist}</a> <br/></li>))}

        <br/>
      </ul>
    </div>
  </div>

  );
}

export default Navbar;
