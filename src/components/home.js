import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import listenlogjam from '../images/listenlogjam.png'
import mixtape_newlogo_large from '../images/mixtape_newlogo_large.png'
import signupbutton from '../images/signupbutton.png'

//
// ALBUMS SCROLLING CONTAINER
//

const album0 = {
    id: 'pinkfloyd_dsotm',
    url: 'https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/aecf4604-1d3b-417f-97c6-d5be80f51eb9/3.jpg'
}

const album1 = {
    id: 'kaytranada_bubba',
    url: 'https://m.media-amazon.com/images/I/71x4X6Ws2iL._UF1000,1000_QL80_.jpg'
}

const album2 = {
    id: 'pond_miflsa',
    url: 'https://i.scdn.co/image/ab67616d0000b273c7bf042fb2f6f630bd160b4b'
}

const album3 = {
    id: 'kendrick_tpab',
    url: 'https://ecx.images-amazon.com/images/I/81uBeniTSjL._SL1500_.jpg'
}

const album4 = {
    id: 'tame_currents',
    url: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png'
}

const album5 = {
    id: 'dead_shakedownstreet',
    url: 'https://www.dead.net/sites/g/files/g2000007851/files/dead_site_files/images/19781115_1529.jpg'
}

const album6 = {
    id: 'strokes_tna',
    url: 'https://miro.medium.com/v2/resize:fit:1400/1*gY1gt-5pKn0tbDY9GCSPvg.jpeg'
}

const album7 = {
    id: 'kanye_bipolar',
    url: 'https://pyxis.nymag.com/v1/imgs/699/1e2/965287137d49b3f29e6ff9c4d0e5a3f07b-01-kanye-west-ye.rsquare.w330.jpg'
}

const album8 = {
    id: 'ok_computer',
    url: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png'
}

const album9 = {
    id: 'sundown_syndrome',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Tame_Impala_Sundown_Syndrome_single_art.jpg/220px-Tame_Impala_Sundown_Syndrome_single_art.jpg'
}

//https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Tame_Impala_Sundown_Syndrome_single_art.jpg/220px-Tame_Impala_Sundown_Syndrome_single_art.jpg
// CODE
//
export default function Home(){
    return(
        <html>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
            <div className='home-logo' style={{marginBottom:'-70px', marginTop:'-20px'}}>
                <img src={mixtape_newlogo_large} className="slideUp"></img>
            </div>
            <div className="friendContainer">
                <div className="friendActivity">
                    <div className="header">
                        <h1 className="fadeIn">what your friends have been listening to.</h1>
                    </div>
                    <div className="scrollContainer">
                        <img src={album0.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 0"></img>
                        <img src={album1.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 1"></img>
                        <img src={album2.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 2"></img>
                        <img src={album3.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 3"></img>
                        <img src={album4.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 4"></img>
                        <img src={album5.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 5"></img>
                        <img src={album6.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 6"></img>
                        <img src={album7.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 7"></img>
                        <img src={album8.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 8"></img>

                        <img src={album0.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 0"></img>
                        <img src={album1.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 1"></img>
                        <img src={album2.url} width="225px" height="225px" className="slideUpAlbums" alt="Album 2"></img>
                        <img src={album3.url} width="225px" height="225px" alt="Album 3"></img>
                        <img src={album4.url} width="225px" height="225px" alt="Album 4"></img>
                        <img src={album5.url} width="225px" height="225px" alt="Album 5"></img>
                        <img src={album6.url} width="225px" height="225px" alt="Album 6"></img>
                        <img src={album7.url} width="225px" height="225px" alt="Album 7"></img>
                        <img src={album8.url} width="225px" height="225px" alt="Album 8"></img>
                        <img src={album0.url} width="225px" height="225px" alt="Album 0"></img>
                        <img src={album1.url} width="225px" height="225px" alt="Album 1"></img>
                    </div>
                </div>
                <br></br>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Link to="/register">
                    <button className="signup_button">
                        <img src={signupbutton}></img>
                    </button>
                </Link>
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