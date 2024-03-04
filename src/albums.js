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

const albumButton = {

}

export default function AlbumsGrid(){

    return(
        <div style={albumsBlurb}>
            Listened to a new album? Drop your review.
        </div>
    )
}

function Album() {
    return <button
        className=albumButton={}
}