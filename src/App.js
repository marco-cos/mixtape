import './App.css';
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Profile from './components/profile.js';
import Albums from './components/albums.js';
import Examplealbum from './components/examplealbum.js'
import Postreview from './components/postreview.js';
import axios from 'axios'; // used to transport data btwn frontend and backend
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContextProvider } from './context/authContext';


axios.defaults.baseURL = 'http://localhost:8000'; // this is the backend url
axios.defaults.withCredentials = true

function App() {
 return (
        <div>
        <Navbar />
          <div style={{ marginTop: '70px' }}></div>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/examplealbum" element={<Examplealbum />} />
              <Route path="/postreview" element={<Postreview />} />
            </Routes>
          </AuthContextProvider>
        </div>
  );
}

export default App;