import React, { useState, useEffect } from 'react';
import { AlbumGrid, AlbumGridComponent } from './albums.js';
import editbutton from '../images/editbutton.png';
import axios from 'axios';
import { useParams } from 'react-router';


export default function Profile(){  
   const params = useParams();
//    const navigate = useNavigate();
   
   const [user, setUser] = useState({});
   const { username } = useParams();

   useEffect(() => {
        const fetchUser = async() => {
            if (username === undefined) {
                const res = await axios.get('http://localhost:8000/profile/65ee4fcaeb421699883cb9f2');
            }
            else {
                const res = await axios.get(`http://localhost:8000/profile/?username=${username}`);
                setUser(res.data);
                console.log(res.data);
            }
        };
        fetchUser();
   }, [username]);


   
    var picurl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    // const editButtonDisplay = {
    //     display: isuserprofile ? 'inline-block' : 'none',
    //     marginRight: isuserprofile ? '10px' : '0px',
    //     cursor: isuserprofile ? 'pointer' : 'default',
    // };
    
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
                <h1>{user.username}</h1>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'" alt="Profile"/>
                {/* <img src={profilePic ? URL.createObjectURL(profilePic) : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Profile" />
                    <div>
                        <form className="imgUpload" onSubmit={uploadImage}>
                            <div>
                                <label htmlFor="myfile">Select new profile pic:</label>
                                <input type="file" accept="image/png" id="myfile" name="myfile" onChange={handlePicUpload} />
                            </div>
                            <button className="custom-button" type='submit'>Upload</button>
                        </form>
                    </div>               */}
                 <br></br>
                 <h2 style={{display:"inline-block",marginRight:'10px'}}>Bio</h2>
                 
                {/* <img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => BioEdit()}/> <br/> */}
                <p>{user.bio}</p>

                {/* <h2 class="headerStyle">Favorite Artist</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => ArtistEdit()}/> <br/> */}
                <p>{user.favArtist}</p>
                {/* <h2 class="headerStyle">Favorite Album</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => AlbumEdit()}/> <br/> */}
                <p>{user.favAlbum}</p>
                {/* <h2 class="headerStyle">Favorite Song</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => SongEdit()}/> <br/> */}
                <p>{user.favSong}</p>
                <h2 class="headerStyle">Recent Reviews</h2><br/>
                <AlbumGrid albumsArray={albums} />
            </div>
        </div>
    )
}