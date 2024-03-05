import './App.css';
import Navbar from './navbar.js';
import Home from './home.js';
import Register from './register.js';
import Login from './login.js';
import Profile from './profile.js';
import Albums from './albums.js';
import Examplealbum from './examplealbum.js'
import axios from 'axios'; // used to transport data btwn frontend and backend
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8000'; // this is the backend url
axios.defaults.withCredentials = true

function App() {
 return (
    <html>
        <div>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/examplealbum" element={<Examplealbum />} />
          </Routes>
        </div>
    </html>
  );
}

export default App;