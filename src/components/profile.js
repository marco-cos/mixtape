import React, { useState, useEffect } from 'react';
import { AlbumGrid, AlbumGridComponent } from './albums.js';
import editbutton from '../images/editbutton.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';
import { convertToBase64 } from '../helper.js';



export default function Profile(){  
    const navigate = useNavigate();

    // const { isLoggedIn } = useAuth(); // Access isLoggedIn state from AuthContext
    const [user, setUser] = useState({});
    // const [username, setUsername] = useState();
    const[myReviews, setMyReviews] = useState([]);
    // const { userId } = useParams();
    // console.log(useParams());
    // const [sameUser, setSameUser] = useState(false);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    // const [followersLogin, setFollowersLogin] = useState([]);
    // const [followingLogin, setFollowingLogin] = useState([]);
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    var { userId }  = useAuth();
    
    if (userId === null) {
        const localId = localStorage.getItem('userId');
        console.log("localId:", localId);
        if (localId === null) {
            console.error('please log in');
        }
        userId = localId;
    }

    useEffect(() => {
        getUser(); // Call getUser() to fetch user data
    }, [userId]); // Triggered when userId changes

    // console.log("userID: ", userId);

   


    // const checkSameUser = () => {
    //     if (userId === loggedInUserId) {
    //         setSameUser(true);
    //     }    
    // }
    
    const getUser = async() => {
        console.log(userId); 
        try {
            const response = await axios.get('http://localhost:8000/profile/', {
                params: { userId }
            });
            setUser(response.data.user);
            setBio(response.data.bio);
            // setUsername(response.data.username);
            setProfilePic(response.data.profilePic);
            console.log("response data", response.data.user);
            // console.log("username: ", response.data.user.username);
            // console.log("bio: ", response.data.user.bio);
            // console.log("favArtist: ", response.data.user.favArtist);
            // console.log("favSong: ", response.data.user.favSong);
            // console.log("favAlbum: ", response.data.user.favAlbum);

            setUserFollowers(response.data.followers);
            setUserFollowing(response.data.following);
        } catch (error) {
            console.error("error fetching user data:", error);
        }
        
    };

    const handlePicUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log("base64: ", base64);
        setProfilePic(base64);

    }


    const uploadImage = async (e) => {
        console.log(user.username);
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/profile/${user.username}/updatePic`, { pic: profilePic });
            setUser(prevUser => ({ ...prevUser, profilePic: response.data.pic }));
            getUser();
        } catch (error) {
            console.error("error updating bio:", error);
        }
    }
    useEffect (() => {
        if (user.username) {
        }
    }, [user.username]);

    //  const handleClick = (e) => {
    //     navigate('/editProfile')
    // }
    // const getLoggedInUserFriends = async () => {
    //     const response = await axios.get(`http://localhost:8000/profile/${loggedInUserId}`);
    //     setFollowersLogin(response.data.followers);
    //     setFollowingLogin(response.data.following);
    // }
    const editBio = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/profile/${user.username}/updateBio`, { bio: bio });
            setUser(prevUser => ({ ...prevUser, bio: response.data.bio }));
            getUser();
        } catch (error) {
            console.error("error updating bio:", error);
        }
    };





    useEffect(() => {
        if (user.username) {
            const fetchReviews = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/review/${user.username}/myReviews`);
                    console.log("reviews: ", response.data);
                    if (response.status >= 200 && response.status < 300) {
                        setMyReviews(response.data);
                    } else {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    // Handle error, maybe set an error state or show a message to the user
                }
            };
            fetchReviews();
        }
    }, [user.username]); // Triggered when user.username changes
    

    if (!user) return null;
   
    const editButtonDisplay = {
        display: user ? 'inline-block' : 'none',
        marginRight: user ? '10px' : '0px',
        cursor: user ? 'pointer' : 'default',
    };
    
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

    const profilePicUrl = user.profilePic ? `data:image/jpeg;base64,${user.profilePic}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    return(
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
            <div style={{ paddingLeft: '5%', paddingTop: '5%'}}>
                <h1>{user.username}</h1>
                <img src={profilePicUrl}></img>
                    <div>
                        <form className="imgUpload" onSubmit={uploadImage}>
                            <div>
                                <label htmlFor="myfile">Select new profile pic:</label>
                                <input type="file" accept="jpeg/png" id="myfile" name="myfile" onChange={handlePicUpload} />
                            </div>
                            <button className="custom-button" type='submit'>Upload</button>
                        </form>
                    </div>              
                 <br></br>
                 <h2 style={{display:"inline-block",marginRight:'10px'}}>Bio</h2>
                 
                <img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={(e) => editBio()}/> <br/>
                <p>{user.bio}</p>
                <br></br>
                    {/* Edit bio button */}
                    <img src={editbutton} alt="logo" width="1.5%" height="1.5%" onClick={editBio} /> 
                    {/* Editable bio input field */}
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

                    {/* Save bio button */}
                    <button onClick={editBio}>Save Bio</button>

                {/* <h2 class="headerStyle">Favorite Artist</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => ArtistEdit()}/> <br/> */}
                <h2 class="headerStyle">Favorite Artist </h2><br/>
                <p>{user.favArtist}</p>
                {/* <h2 class="headerStyle">Favorite Album</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => AlbumEdit()}/> <br/> */}
                <h2 class="headerStyle">Favorite Album</h2><br/>
                <p>{user.favAlbum}</p>
                {/* <h2 class="headerStyle">Favorite Song</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={editButtonDisplay} onClick={() => SongEdit()}/> <br/> */}
                <h2 class="headerStyle">Favorite Song</h2><br/>
                <p>{user.favSong}</p>
                <h2 class="headerStyle">Recent Reviews</h2><br/>
                    <div className="gallery">
                        {myReviews.map(review => ( 
                            console.log(review._id),
                            <div key={review._id} className="review-item">
                            <p>{review.content}</p>
                            <p>Creation Date: {review.creationDate}</p>
                            <p>Favorite Song: {review.favSong}</p>
                            <p>Least Favorite Song: {review.leastFavSong}</p>
                            {/* Display likes and comments if needed */}
                            </div>
                        ))}   
                    </div>
                <button>edit bio</button>
            </div>

        </div>
    )
}