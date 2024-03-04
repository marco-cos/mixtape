import React from 'react';
import { useState } from 'react';

import './bubba-album.png';
import './MIFLSA.png';
import './skiptracing.png';
import './TPAB.png';

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
    url: './bubba-album.png',
}

const album2 = {
    id: 'pond',
    url: './MIFLSA.png',
}

const album3 = {
    id: 'skiptracing',
    url: './skiptracing.png',
}

const album4 = {
    id: 'tpab',
    url: './TPAB.png',
}

const albumsArray = [album1, album2, album3, album4];

function AlbumGridComponent({ album, onClick}) {
    return (
        <div style={{ cursor: 'pointer' }} onClick={() => onClick(album.id)}>
            <img 
                src={album.url} 
                className="fade-left"
                style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }} 
            />
        </div>
    );
}

function AlbumGrid({albumsArray}) {
    const handleClick = (key) => {
        console.log('Image {id} clicked!');
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
            <div>Listened to a new album? Drop your review.</div>
            <AlbumGrid albumsArray={albumsArray} />
        </div>
    )
}
