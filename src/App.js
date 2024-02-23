import './App.css';
import Navbar from './navbar.js';


function App() {
  return (
    <html>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
        <Navbar />
        <div className="friendContainer">
          <div className="friendActivity">
            <div className="header">
              <h1>what your friends have been listening to.</h1>
            </div>
            <div className="albums">
              <div className="cover"></div>
              <div className="cover"></div>
              <div className="cover"></div>
              <div className="cover"></div>
              <div className="cover"></div>
            </div>
            <div className="seeMoreContainer">
              <div className="seeMore">
                <h3>all activity</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="footerContainer">
          <div className="gradientContainer">
            <div className="gradientColor">
              <div className="footer">
                <h2>listen. log. jam.</h2>
              </div>
            </div>
          </div>
        </div>
        
    </html>

  );
}

export default App;
