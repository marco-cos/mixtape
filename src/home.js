import React from 'react';
import './App.css';
import albumex from './albumex.png'
import { Link } from 'react-router-dom'
import listenlogjam from './listenlogjam.png'

export default function Home(){
    return(
        <html>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
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
            <img src={listenlogjam} alt="Footer" width="15%" height="15%" id="centeredimage"/>
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