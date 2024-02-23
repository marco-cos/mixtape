import './App.css';
import Navbar from './navbar.js';
import Home from './home.js';
import Register from './register.js';
import Login from './login.js';
import Profile from './profile.js';
import Albums from './albums.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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
          </Routes>
        </div>
    </html>
  );
}

export default App;