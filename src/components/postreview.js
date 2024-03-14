import './postreview.css'
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom'

const mongoose = require('mongoose');


export default function Postreview(){
    // const mongoose = require('mongoose');
    // const ObjectId = mongoose.Types.ObjectId;
    

    const navigate = useNavigate();
    var userId =localStorage.getItem('userId')
    console.log(userId);
    var objectId = new mongoose.Types.ObjectId(userId);
    console.log("here is the userID:", userId);

    const [data, setData] = useState({
        album:'',
        albumName: '',
        rating: '5',
        content: '',
        reviewer: objectId,
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // const albumResponse = await axios.get(`http://localhost:8000/albums/${data.albumName}`);
            // const albumId = albumResponse.data._id;
            if (!userId) {
                throw new Error("Login to post a review");
            }

            const response = await axios.post('http://localhost:8000/createReview', {
                album:data.album,
                albumName: data.albumName,
                rating: data.rating,
                content: data.content,
                reviewer: data.reviewer,
                favsong: data.favsong,
                leastfavsong: data.leastfavsong,
            });

            console.log(response.data); 
            // WILL WANT TO NAVIGATE BACK TO ALBUM PAGE
            //navigate(`http://localhost:8000/${albumName}`)
            navigate(`/albums/${data.albumName}`); 
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
                    <h1 style={{color:"black"}}>Post a Review</h1>
                    <form onSubmit= { handleSubmit }  >
                        <label for="albumname"><h3 style={{color:"black"}}>Album Name</h3></label>
                        <input 
                            style={{fontSize: "20px",width:"60%"}} 
                            type="text" 
                            id="albname" 
                            name="albumName"
                            value={data.albumName}
                            onChange={handleChange}
                        />
                        <label for="rating"><h4 style={{color:"black"}}>Your Rating</h4></label>
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
                        <label for="favsong"><h3 style={{color:"black"}}>Favorite Song</h3></label>
                        <input 
                            style={{fontSize: "20px",width:"60%"}} 
                            type="text" 
                            id="favsong" 
                            name="favsong"
                            value={data.favsong}
                            onChange={handleChange}
                        />
                        <label for="albumname"><h3 style={{color:"black"}}>Least Favorite Song</h3></label>
                        <input 
                            style={{fontSize: "20px",width:"60%"}} 
                            type="text" 
                            id="leastfavsong" 
                            name="leastfavsong"
                            value={data.leastfavsong}
                            onChange={handleChange}
                        />
                        <label for="content"><h4 style={{color:"black"}}>Your Review</h4></label>
                        <textarea 
                            style={{fontSize: "20px"}} 
                            id="content" 
                            name="content" 
                            rows="9" 
                            cols="60" 
                            placeholder="I thought this album was..."
                            value={data.content}
                            onChange={handleChange}>
                        </textarea> <br /> <br/>
                        <button type="submit" class="custom-button" style={{color:"black"}} >Submit Review</button>
                    </form>
                </div>
            </div>
        
        )
    }