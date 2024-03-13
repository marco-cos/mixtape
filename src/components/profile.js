import React, { useState, useEffect } from 'react';
import editbutton from '../images/editbutton.png';
import axios from 'axios';
import { useAuth } from '../context/authContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';
import { convertToBase64 } from '../helper.js';
import './profile.css'



export default function Profile(){  
    const navigate = useNavigate();

    // const { isLoggedIn } = useAuth(); // Access isLoggedIn state from AuthContext
    const [user, setUser] = useState({});
    const [myReviews, setMyReviews] = useState([]);
    const [userFollowers, setUserFollowers] = useState();
    const [userFollowing, setUserFollowing] = useState();

    const [profilePic, setProfilePic] = useState('');
    const [isEditingPic, setIsEditingPic] = useState();

    const [bio, setBio] = useState('');
    const [isEditingBio, setIsEditingBio] = useState(false); // State variable to control the edit mode of bio

    const [favArtist, setFavArtist] = useState('');
    const [isEditingArtist, setIsEditingArtist] = useState(false); // State variable to control the edit mode of favArtist

    const [favSong, setFavSong] = useState('');
    const [isEditingSong, setIsEditingSong] = useState(false); // State variable to control the edit mode of favSong

    const [favAlbum, setFavAlbum] = useState('');
    const [isEditingAlbum, setIsEditingAlbum] = useState(false); // State variable to control the edit mode of favAlbum

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
    
    const getUser = async() => {
        console.log(userId); 
        try {
            const response = await axios.get('http://localhost:8000/profile/', {
                params: { userId }
            });
            setUser(response.data.user);
            setBio(response.data.bio);
            setFavArtist(response.data.favArtist);
            setFavSong(response.data.favSong);
            setFavAlbum(response.data.favAlbum);
            setProfilePic(response.data.profilePic);
            console.log("response data", response.data.user);
            if (response.data.following) {
                setUserFollowing(response.data.following.length);
            } else {
                setUserFollowing(0); 
            }
            if (response.data.followers){
                console.log(response.data.followers.length);
                setUserFollowers(response.data.following.length);
            } else {
                setUserFollowers(0);
            }
            setUserFollowers(response.data.followers.length);
            setUserFollowing(response.data.following.length);
        } catch (error) {
            console.error("error fetching user data:", error);
        }
        
    };

    const handlePicClick = async () => {
        setIsEditingPic(true);
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
            setIsEditingPic(false);
            getUser();
        } catch (error) {
            console.error("error updating bio:", error);
        }
    }
    useEffect (() => {
        if (user.username) {
        }
    }, [user.username]);

    const editBio = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/profile/${user.username}/updateBio`, { bio: bio });
            setUser(prevUser => ({ ...prevUser, bio: response.data.bio }));
            setIsEditingBio(false);
            getUser();
        } catch (error) {
            console.error("error updating bio:", error);
        }
    };

    const editArtist = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/profile/${user.username}/updateArtist`, { artist: favArtist });
            setUser(prevUser => ({ ...prevUser, favArtist: response.data.favArtist }));
            setIsEditingArtist(false);
            getUser();
        } catch (error) {
            console.error("error updating artist:", error);
        }
    };

    const editSong = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/profile/${user.username}/updateSong`, { song: favSong });
            setUser(prevUser => ({ ...prevUser, favSong: response.data.favSong }));
            setIsEditingSong(false);
            getUser();
        } catch (error) {
            console.error("error updating song:", error);
        }
    };

    const editAlbum = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/profile/${user.username}/updateAlbum`, { album: favAlbum });
            setUser(prevUser => ({ ...prevUser, favAlbum: response.data.favAlbum }));
            setIsEditingAlbum(false);
            getUser();
        } catch (error) {
            console.error("error updating album:", error);
        }
    }

    

    useEffect(() => {
        if (user.username) {
            const fetchReviews = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/createReview/${user.username}/myReviews`);
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
  

    const profilePicUrl = user.profilePic ? `data:image/jpeg;base64,${user.profilePic}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    return(
        <div className="page-container">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
            <div className="profile-container">
                <div className="left-column">
                    <div className="group-container">
                        <div className="profilePic-container">
                            <img src={profilePicUrl} onClick={handlePicClick} id="profilePic"></img>
                        </div>
                        <div className="edit-container">
                            { isEditingPic ? (
                                <div>
                                    <form className="imgUpload" onSubmit={uploadImage}>
                                        <div>
                                            <input type="file" accept="jpeg/png" id="myfile" name="myfile" onChange={handlePicUpload} />
                                        </div>
                                        <button className="custom-button" type='submit'>Upload</button>
                                    </form>
                                </div>              
                                ):(<> </>
                            )}   
                            <br></br>
                        </div>
                        <div className="username-container">
                            <h1>{user.username}</h1>
                        </div>
                    </div>
                    <div className="followers-container">
                        <h2>{userFollowers} Followers </h2>
                    </div>
                    <div className="following-container">
                        <h2>{userFollowing} Following </h2>
                    </div>
                </div>
                <div className="right-column">
                    <div className="bio-container">
                        <div className="user-header">
                            <h2>Bio</h2>
                        </div>
                        <img src={editbutton} id="editButton" alt="logo" onClick={(e) => setIsEditingBio(true)}/> <br/>
                        <div className="user-info">
                            <p>{user.bio}</p>
                        </div>
                        <div className="edit-container">
                            {isEditingBio ? (
                                <div>
                                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                                    <button onClick={editBio}>Save</button>
                                </div>
                                ):(<> </>
                            )}
                            <br></br>
                        </div>
                    </div>
                    <div className="artist-container">
                        <div className="user-header">
                            <h2>Favorite Artist</h2>
                        </div>
                        <img src={editbutton} id="editButton" alt="logo" onClick={(e) => setIsEditingArtist(true)}/> <br/>
                        <div className="user-info">
                            <p>{user.favArtist}</p>
                        </div>
                        <div className="edit-container">
                            {isEditingArtist ? (
                                <div>
                                    <textarea value={favArtist} onChange={(e) => setFavArtist(e.target.value)} />
                                    <button onClick={editArtist}>Save</button>
                                </div>
                                ):(<> </>
                            )}
                            <br></br>
                        </div>
                    </div>
                    <div className="album-container">
                        <div className="user-header">
                            <h2>Favorite Album</h2>
                        </div>
                        <img src={editbutton} id="editButton" alt="logo" onClick={(e) => setIsEditingAlbum(true)}/> <br/>
                        <div className="user-info">
                            <p>{user.favAlbum}</p>
                        </div>
                        <div className="edit-container">
                            {isEditingAlbum ? (
                                <div>
                                    <textarea value={favAlbum} onChange={(e) => setFavAlbum(e.target.value)} />
                                    <button onClick={editAlbum}>Save</button>
                                </div>
                                ):(<> </>
                            )}
                            <br></br>
                        </div>
                    </div>
                    <div className="song-container">
                        <div className="user-header">
                            <h2>Favorite Song</h2>
                        </div>
                        <img src={editbutton} id="editButton" alt="logo" onClick={(e) => setIsEditingSong(true)}/> <br/>
                        <div className="user-info">
                            <p>{user.favSong}</p>
                        </div>
                        <div className="edit-container">
                            {isEditingSong ? (
                                <div>
                                    <textarea value={favSong} onChange={(e) => setFavSong(e.target.value)} />
                                    <button onClick={editSong}>Save</button>
                                </div>
                                ):(<> </>
                            )}
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews-container">
                <div className="review-title">
                    <h2 class="headerStyle">Recent Reviews</h2><br/>
                </div>
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
            </div>
        </div>
    )}