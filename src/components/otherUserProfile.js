import React, { useState, useEffect } from 'react';
import { AlbumGrid, AlbumGridComponent } from './albums.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import the useAuth hook
import './profile.css';
import { useNavigate } from 'react-router-dom';


export default function OtherUserProfile(){  
    // const { isLoggedIn } = useAuth(); // Access isLoggedIn state from AuthContext
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { username } = useParams();
    console.log("parameter: ", username);

    // console.log(useParams());
    const [userReviews, setUserReviews] = useState([]);
    const [sameUser, setSameUser] = useState(false);
    const [userFollowers, setUserFollowers] = useState();
    const [userFollowing, setUserFollowing] = useState();
    const [followersLogin, setFollowersLogin] = useState([]);
    const [followingLogin, setFollowingLogin] = useState([]);
    const [reviews, setReviews] = useState([]);

    let loggedInUserId = useAuth().userId;
    const [loggedInUsername, setLoggedInUsername] = useState();

    if (loggedInUserId === null) {
        const localId = localStorage.getItem('userId');
        console.log("localId:", localId);
        if (localId === null) {
            console.error('please log in');
        }
        loggedInUserId = localId;
    }

    const checkSameUser = async () => {
        try {
            const check = await axios.get(`http://localhost:8000/profile/${username}/checkSame/`, {
                params: {
                    loggedInUserId: loggedInUserId
                }
            });
            if (check.isSameUser) {
                setSameUser(true);
                navigate('/profile');
            }
            else {
                console.log(loggedInUsername);
                setLoggedInUsername(check.loggedInUsername);
            }
        } catch (error) {
            console.error("error fetching users:", error);
        }
    }
    
    const getUser = async() => {
        try {
            const user = await axios.get(`http://localhost:8000/profile/${username}`);
            setUser(user.data.user);
            if (user.data.following) {
                setUserFollowing(user.data.following.length);
            } else {
                setUserFollowing(0); 
            }
            if (user.data.followers){
                // console.log(user.data.followers.length);
                setUserFollowers(user.data.following.length);
            } else {
                setUserFollowers(0);
            }
            setUserFollowers(user.data.followers.length);
            setUserFollowing(user.data.following.length);
        } catch (error) {
            console.error("error fetching user data:", error);
        }
        
    };


    useEffect(() => {
        getUser();
        
    }, [username]);

    useEffect(() => {
        if (username) {
            const fetchReviews = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/review/${username}/myReviews`);
                    console.log("reviews: ", response.data);
                    if (response.status >= 200 && response.status < 300) {
                        setReviews(response.data);
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
    }, [username]); // Triggered when user.username changes

    if (!user) return null;
   
    const blankPic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    const profilePicUrl = user.profilePic ? `data:image/jpeg;base64,${user.profilePic}` : blankPic
    return(
        <div className="page-container">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
            <div className="profile-container">
                <div className="left-column">
                    <div className="group-container">
                        <div className="profilePic-container">
                            <img src={profilePicUrl} id="profilePic"></img>
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
                        <div className="user-info">
                            <p>{user.bio}</p>
                        </div>
                    </div>
                    <div className="artist-container">
                        <div className="user-header">
                            <h2>Favorite Artist</h2>
                        </div>
                        <div className="user-info">
                            <p>{user.favArtist}</p>
                        </div>
                    </div>
                    <div className="album-container">
                        <div className="user-header">
                            <h2>Favorite Album</h2>
                        </div>
                        <div className="user-info">
                            <p>{user.favAlbum}</p>
                        </div>
                    </div>
                    <div className="song-container">
                        <div className="user-header">
                            <h2>Favorite Song</h2>
                        </div>
                        <div className="user-info">
                            <p>{user.favSong}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews-container">
                <div className="review-title">
                    <h2 class="headerStyle">Recent Reviews</h2><br/>
                </div>
                    <div className="gallery">
                        {reviews.map(review => ( 
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