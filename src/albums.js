import React from 'react';
import { useState } from 'react';
import './bubba-album.png';
import './App.css';
import { Link } from 'react-router-dom';

const albumsBlurb = {
    fontWeight: 'bold',
    fontSize: '48px',
    display: 'flex',
    padding: '10px'
}

const album1 = {
    id: 'bubba',
    url: '/public/bubba-album.png',
}

const album2 = {
    id: 'pond',
    url: '/public/MIFLSA.png',
}

const albumsArray = [album1, album2];


function AlbumGridComponent({ album, onClick}) {
    return (
        <div style={{ cursor: 'pointer' }} onClick={() => onClick(album.id)}>
            <img src={album.url} style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }} />
        </div>
    );
}

function AlbumGrid({albumsArray}) {
    const handleClick = (id) => {
        console.log('Image ${id} clicked!');
        // handle click event later
    }
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px'}}>
            {albumsArray.map((album) => (
                <AlbumGridComponent key={album.id} album={album} onClick={handleClick} />
            ))}
        </div>
    )
}

export default function Top(){

    return(
        <div style={albumsBlurb}>
            <h1>Listened to a new album? Drop your review.</h1>
            <AlbumGrid albumsArray={albumsArray} />
        </div>
    )
}
