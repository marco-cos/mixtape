import logo from './logo.svg';
import './App.css';
import Navbar from './navbar.js';
import Home from './home.js';
import Register from './register.js';
import Login from './login.js';
import Profile from './profile.js';
import Albums from './albums.js';
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
      //<div className="App">
      <>
        <Navbar />
          <Routes>
            <Route path = '/' element={<Home />} />
            <Route path = '/albums' element={<Albums />} />
            <Route path = '/profile' element={<Profile />} />
            <Route path = '/register' element={<Register />} />
            <Route path = '/login' element={<Login />} />
          </Routes>
      </>
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
  );
}

export default App;
