import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

async function GetALBS() {
    var albums =[];
    try {
        const query = "";
        const response = await axios.post('/Albumshowcase/', { query }, {withCredentials: true});
        const resalbums = response.data.albums;
    
        for (let i = 0; i < resalbums.length; i++) {
            const alb0 = {
                title:resalbums[i].title,
                id:resalbums[i]._id,
                url:resalbums[i].cover
            }
            albums[i] = alb0;
    
        }
        console.log(albums)
    }  
    
            catch (error) {
        console.error(error);
        }
    return albums    
}


// new album grid element
function NewAlbumGridComponent({ album, onClick}) {

    return (
        <div style={{ cursor: 'pointer' }} onClick={() => onClick(album.id)}>
            <img 
                src={"data:image/jpeg;base64,"+album.url}
                alt='alt_text_here' 
                className="pop-out"
                width="225px"
                height="225px" 
            />
        </div>
    );
}

function NewAlbumGrid({ albumsArray }) {
    const navigate = useNavigate();
    console.log("IN NEW ALBRUM GRID FOR ")
    const [displayAlbums, setDisplayAlbums] = useState([...albumsArray]);

    console.log(albumsArray)
    const handleClick = (title) => {
        console.log("IN HANDLECLICK WITH TITLE: "+ title)
        navigate(`/albums/${title}`);
        // handle click event later
    }

    
    return (
        <div className='album-grid'>
            {displayAlbums.map((album, index) => (
                <NewAlbumGridComponent key={album.id} album={album} onClick={() => handleClick(album.title)} />
            ))}
        </div>
    )
}


// entire page
export default function Albums() {
    const [albums, setAlbums] = useState(null); 

    useEffect(() => {
        async function fetchAlbums() {
            const albumsData = await GetALBS();
            setAlbums(albumsData);
        }

        fetchAlbums();
    }, []);
    return (
        <div id='albumpage'>
            <div className="AlbumsTitle" style={{textAlign: "center"}}>
                <h1>Popular Albums</h1>
            </div>
            <div style={{marginBottom: '50px'}}>
            {albums ? <NewAlbumGrid albumsArray={albums} /> : 'Loading...'}
            </div>
        </div>
    )
}

export {NewAlbumGrid, NewAlbumGridComponent};