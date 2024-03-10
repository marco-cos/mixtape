import React from 'react';
import './App.css';
import albumex from './assets/albumex.png'
import { Link } from 'react-router-dom'
import listenlogjam from './assets/listenlogjam.png'
import mixtape_newlogo_large from './assets/mixtape_newlogo_large.png'

export default function Home(){
    return(
        <html>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
            <div className='home-logo' style={{marginBottom:'-70px', marginTop:'-20px'}}>
                <img src={mixtape_newlogo_large}></img>
            </div>
            <div className="friendContainer">
                <div className="friendActivity">
                    <div className="header">
                        <h1>what your friends have been listening to.</h1>
                    </div>
                    <div className="scrollContainer">
                        <img src={albumex} width="100%" alt="Album Ex"></img>
                        <img src={albumex} width="100%" alt="Album Ex"></img>
                    </div>
                </div>
                <br></br>
                <Link to="/register"><button id="SignUpButton">Sign Up Now →</button></Link>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:'95px'}}>
                <img src={listenlogjam} width="15%" height="15%"/>
            </div>
            {/* Literally cannot center this so replaced with image 
                <div className="gradientContainer">
                    <div className="gradientColor">
                        <div className="footer">
                            <h2>listen. log. jam.</h2>
                        </div>
                    </div>
                </div>
            */}
        </html>
    )
}