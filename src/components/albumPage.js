import React, { useState, useEffect } from 'react';
// import { AlbumGrid, AlbumGridComponent } from './albums.js';
// import editbutton from '../images/editbutton.png';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';



export default function Profile(){  
    const navigate = useNavigate();
    const { albumTitle } = useParams();

    const [album, setAlbum] = useState({});
    const [reviews, setReviews] = useState([]);
    
    const getAlbum = async() => {
        console.log(albumTitle); 
        try {
            // const response = await axios.get(`http://localhost:8000/${albumTitle}`);
            setAlbum(response.data);
        } catch (error) {
            console.error("error fetching album:", error);
        }
        
    };


    useEffect(() => {
        getAlbum();
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/${albumTitle}/reviews`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                setReviews(response.reviews);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error, maybe set an error state or show a message to the user
            }
        };
        fetchReviews();
    }, []);
    
    
    //TO CHANGE: Change these to the albums that the user has reviewed, put in albums variable
    const album0 = {
        id: 'pinkfloyd_dsotm',
        url: 'https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/aecf4604-1d3b-417f-97c6-d5be80f51eb9/3.jpg'
    }
    const album1 = {
        id: 'taylorswift_1989',
        url: 'https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png?crop=0.502xw:1.00xh;0.498xw,0&resize=1200:*'
    }
    const album2 = {
        id: 'harrystyles_fineline',
        url: 'https://cdn.vox-cdn.com/thumbor/cUUdVnTXrleRNqbV-9JloWAleSI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19535833/thumb_clean.jpg'
    }
    const album3 = {
        id: 'lanadelrey_borntodie',
        url: 'https://imgv3.fotor.com/images/blog-richtext-image/born-to-die-music-album-cover.png'
    }
    const albums = [album0, album1, album2, album3]


    //TO CHANGE: Make uploaded image get sent to firebase 
    return(
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
            <div style={{ paddingLeft: '5%', paddingTop: '5%'}}>
                <h1>{album.title}</h1>
                    <img></img>
                 <br></br>
                 <h2 style={{display:"inline-block",marginRight:'10px'}}>{album.artist}</h2>
                    <div className="gallery">
                    {
                        reviews.map(item=>{
                            return(

                                <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                            )
                        })
                    }
                    </div>
            </div>

        </div>
    )
}