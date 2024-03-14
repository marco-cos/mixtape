import React, { useState, useEffect } from 'react';
import { AlbumGrid, AlbumGridComponent } from './albums.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import the useAuth hook
import './profile.css';
import { useNavigate } from 'react-router-dom';


export default function OtherUserProfile(){  
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { username } = useParams();
    // console.log("user's page: ", username);
  
    const [userFollowers, setUserFollowers] = useState();
    const [userFollowing, setUserFollowing] = useState();
    const [reviews, setReviews] = useState([]);

    let loggedInUserId = useAuth().userId;
    let followers, following;


    const [loggedInUsername, setLoggedInUsername] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

    const [isFollowing, setIsFollowing] = useState(false);

    const checkSameUser = async () => {
        try {
          const check = await axios.get(`http://localhost:8000/profile/${username}/checkSame/${loggedInUserId}`);
                if (check.data.sameUser) {
                    navigate('/profile');
                }
                console.log("loggedInUsername", check.data.loggedInUsername);
                setLoggedInUsername(check.data.loggedInUsername);
            } catch (error) {
                console.error("Error fetching users:", error);
        }
    };
    
    const verifyUser = async() => {
        if (loggedInUserId === null) {
            const localId = localStorage.getItem('userId');
            console.log("localId:", localId);
            if (localId === null) {
                console.error('please log in');
            }
            loggedInUserId = localId;
        }
        const localAuth = localStorage.getItem('isLoggedIn');
        console.log("localAuth", localAuth);
        if (localAuth) {
            console.log("local auth true");
            setLoggedIn(true);
            console.log(loggedIn);
        }
        checkSameUser();
    }
    
    const getUser = async() => {
        try {
            const response = await axios.get(`http://localhost:8000/profile/${username}`);
            setUser(response.data.user);
            console.log(response.data.user);
            // console.log("followers:", response.data.user.followers.length);
            setUserFollowers(response.data.user.followers.length);
            followers = userFollowers;
            setUserFollowing(response.data.user.following.length);
            following = userFollowing;
            const alreadyFollowing = response.data.user.followers.includes(loggedInUserId);
            setIsFollowing(alreadyFollowing);
        } catch (error) {
            console.error("error fetching user data:", error);
        }
        
    };


    useEffect(() => {
        verifyUser();
        getUser();
    }, [])

    useEffect(() => {
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
                }
            };
            fetchReviews();
    }, [reviews.length]); 


    const handleFollow = async (e) => {
        e.preventDefault();
        try {
            // console.log("handleFollow", loggedInUsername)
            console.log("isLoggedIn: ", loggedIn);
            console.log("isFollowing", isFollowing);
            if (loggedIn) {
                if (!isFollowing){
                    console.log("follow");
                    // console.log(loggedInUsername);
                    const response = await axios.put(`http://localhost:8000/profile/${username}/follow`, { username: loggedInUsername });
                    console.log(response.data);
                    if (response.data.message !== "already following") {
                        const updatedUser = await axios.put(`http://localhost:8000/profile/${username}/add`, 
                            { username: loggedInUsername});
                    }
                    console.log("follow response:", response.data.message);
                    if (response.data.success) {
                        setIsFollowing(true);
                        setUserFollowers(userFollowers+1);
                        console.log("followers: ", userFollowers);
                        // getUser();
                    }
                }
                else {
                    console.log("unfollow");
                    // console.log("unfollowed by:", loggedInUsername);
                    // console.log("unfollowing", username );
                    const result = await axios.put(`http://localhost:8000/profile/${username}/unfollow`, { username: loggedInUsername });
                    if (result.data.message !== "not following") {
                        const updatedUser = await axios.put(`http://localhost:8000/profile/${username}/remove`, 
                        { username: loggedInUsername});
                        console.log(updatedUser);
                    }
                    console.log("unfollow response:", result.data.message); 
                    if (result.data.success) {
                        setIsFollowing(false);
                        setUserFollowers(userFollowers-1);
                        // getUser();
                    }
                }
            }
            else {
                console.error("login to follow other users");
            }
        } catch (error) {
            console.error('Error following:', error);

        }
    }


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
                        <div className="username-follow-container">
                            <div className="username-container">
                                <h1>{user.username}</h1>
                            </div>
                            <div className="follow-button">
                                <button onClick={handleFollow}>
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
                            </div>
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
                            </div>
                        ))}  
                    </div> 
            </div>
        </div>
    )}