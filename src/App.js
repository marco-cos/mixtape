import './App.css';
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Profile from './components/profile.js';
import Albums from './components/albums.js';
import Albumpage from './components/albumPage.js'
import Postreview from './components/postreview.js';
import OtherUserProfile from './components/otherUserProfile.js';
import axios from 'axios'; // used to transport data btwn frontend and backend
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContextProvider } from './context/authContext';


axios.defaults.baseURL = 'http://localhost:8000'; // this is the backend url
axios.defaults.withCredentials = true

function App() {
 return (
  <AuthContextProvider>
       <div>
        <Navbar />
          <div style={{ marginTop: '70px' }}></div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/albums/:albumName" element={<Albumpage/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:username" element={<OtherUserProfile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Albumpage" element={<Albumpage />} />
              <Route path="/postreview" element={<Postreview />} />
            </Routes>
        </div>
  </AuthContextProvider>
  );
}

export default App;