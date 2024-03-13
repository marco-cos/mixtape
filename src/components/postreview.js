import './postreview.css'
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom'


export default function Postreview(){
    const navigate = useNavigate();
    //const { userId: loggedInUserId } = useAuth();
    const userId = localStorage.getItem('userId');
    //const username = localStorage.getItem('username');
    console.log("here is the userID:", userId);

    const [data, setData] = useState({
        albumName: '',
        rating: '5',
        content: '',
        userID: userId,
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // const albumResponse = await axios.get(`http://localhost:8000/albums/${data.albumName}`);
            // const albumId = albumResponse.data._id;

            const response = await axios.post('http://localhost:8000/createReview', {
                albu
                albumName: data.albumName,
                rating: data.rating,
                content: data.content,
                userID: data.userID,
            });

            console.log(response.data); 
            // WILL WANT TO NAVIGATE BACK TO ALBUM PAGE
            //navigate(`http://localhost:8000/${albumName}`)
            navigate('/'); 
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const parsedValue = name === "rating" ? parseInt(value) : value;
        console.log(name, value);
        setData({
            ...data,
            [name]: parsedValue
        });

    };

    return(
    
        <div className="postreview-body">
                <div id="ReviewPostBody">
                    <h1>Post a Review</h1>
                    <form onSubmit= { handleSubmit }  >
                        <label for="albumname"><h3>Album Name</h3></label>
                        <input 
                            style={{fontSize: "20px",width:"60%"}} 
                            type="text" 
                            id="albname" 
                            name="albumName"
                            value={data.albumName}
                            onChange={handleChange}
                        />
                        <label for="rating"><h4>Your Rating</h4></label>
                        <select 
                            name="rating" 
                            id="rating" 
                            style={{width:"40%"}}
                            value={data.rating}
                            onChange={handleChange}
                        >
                            <option disabled selected value> Select a rating </option>
                            <option value='5'>★★★★★ - Amazing</option>
                            <option value='4'>★★★★☆ - Great</option>
                            <option value='3'>★★★☆☆ - Average</option>
                            <option value='2'>★★☆☆☆ - Bad</option>
                            <option value='1'>★☆☆☆☆ - Horrible</option>
                        </select> 
                        <label for="content"><h4>Your Review</h4></label>
                        <textarea 
                            style={{fontSize: "20px"}} 
                            id="content" 
                            name="content" 
                            rows="15" 
                            cols="60" 
                            placeholder="I thought this album was..."
                            value={data.content}
                            onChange={handleChange}>
                        </textarea> <br /> <br/>
                        <button type="submit" class="custom-button" >Submit Review</button>
                    </form>
                </div>
            </div>
        
        )
    }