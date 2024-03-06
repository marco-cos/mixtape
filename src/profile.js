import React, { useState } from 'react';
import { AlbumGrid, AlbumGridComponent } from './albums.js';
import editbutton from './editbutton.png';

export default function Profile(){

    //TO CHANGE: Set isuerprofile to true if the profile that is being viewed belongs to user that is logged in, otherwise false
    var isuserprofile = true;

    //TO CHANGE: Set user variable to username of profile that is being viewed
    var user = "username";

    //TO CHANGE: Get profile pic from firebase
    var picurl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    const editButtonDisplay = {
        display: isuserprofile ? 'inline-block' : 'none',
        marginRight: isuserprofile ? '10px' : '0px',
        cursor: isuserprofile ? 'pointer' : 'default',
    };
    

    //TO CHANGE: Initial states should be changed so that they fetch from database
    const [bio, setBio] = useState("I love music. This is my favorite website ever invented in the history of the world ever.");
    const [favartist, setfavartist] = useState("Alvin & The Chipmunks");
    const [favalbum, setfavalbum] = useState("Melodrama - Lorde");
    const [favsong, setfavsong] = useState("I can't think of any songs - Some Artist.");
    
    const BioEdit = () => {
        let input = prompt("Enter your new bio content:", "");
        if (!(input == null || input == "")) {
            setBio(input)
        } 
    }

    const ArtistEdit = () => {
        let input = prompt("Enter your new favorite artist:", "");
        if (!(input == null || input == "")) {
            setfavartist(input)
        } 
    }

    const AlbumEdit = () => {
        let input = prompt("Enter your new favorite album:", "");
        if (!(input == null || input == "")) {
            setfavalbum(input)
        } 
    }

    const SongEdit = () => {
        let input = prompt("Enter your new favorite song:", "");
        if (!(input == null || input == "")) {
            setfavsong(input)
        } 
    }

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
        <html>
             <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
            <div style={{ paddingLeft: '5%', paddingTop: '5%'}}>
                <h1>{user}</h1>
                <img src={picurl} alt="Profile Pic" width="20%" height="20%"/> <br/>
                <div style={editButtonDisplay}>
                    <label for="myfile">Select new profile pic: </label>
                    <input type="file" accept="image/png" id="myfile" name="myfile"></input>
                </div>
                 <br></br>
                 <h2 style={{display:"inline-block",marginRight:'10px'}}>Bio</h2>
                 
                <img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => BioEdit()}/> <br/>
                <p>{bio}</p>

                <h2 class="headerStyle">Favorite Artist</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => ArtistEdit()}/> <br/>
                <p>{favartist}</p>
                <h2 class="headerStyle">Favorite Album</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => AlbumEdit()}/> <br/>
                <p>{favalbum}</p>
                <h2 class="headerStyle">Favorite Song</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => SongEdit()}/> <br/>
                <p>{favsong}</p>
                <h2 class="headerStyle">Recent Reviews</h2><br/>
                <AlbumGrid albumsArray={albums} />
            </div>
        </html>
    )
}