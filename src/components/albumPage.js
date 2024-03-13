import likebutton from '../images/likebutton.png';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../context/authContext'; // Import the useAuth hook
import { useParams } from 'react-router-dom';



function Examplealbum(){
    const Albumpage= useParams()
    const albumID = Albumpage.albumName;
    var user =localStorage.getItem('userId')
    console.log(user)

    const [albuminfo, setAlbumInfo] = useState({
        albuname: "",
        artist: "",
        image: "",
    });

    const [reviews, setReviews] = useState([]);

let beenrun = false;

const getalbuminfo = async (query) => {
    if(!beenrun) {
        beenrun=true;
        try {
            const response = await axios.post('/Albumpage/getalbuminf', { query }, {withCredentials: true});
            let returneddata = response.data;
            setAlbumInfo({image: returneddata.albums.cover, albuname: returneddata.albums.title, artist: returneddata.albums.artist,});
            for (let i = 0; i < returneddata.reviews.length; i++) {
                const review0 = {
                        username: returneddata.reviews[i].reviewer,
                        stars: returneddata.reviews[i].stars,
                        date: returneddata.reviews[i].creationDate,
                        favSong: returneddata.reviews[i].favSong,
                        leastfavSong: returneddata.reviews[i].leastFavSong,
                        text: returneddata.reviews[i].content,
                        likedby: returneddata.reviews[i].likes,
                        objID: returneddata.reviews[i].ID,
                    }
                setReviews(reviews => [...reviews, review0]);
            }
    
            } catch (error) {
            console.error(error);
            }
    
    }
  };

  const unlikereview = async (reviewID, userID) => {
    console.log(reviewID,userID);

    try {
        const response = await axios.put(`/Albumpage/unlike`, { reviewID: reviewID, userID: userID });
    } catch (error) {
        console.error("error updating bio:", error);
    }

  };

  const likereview = async (reviewID, userID) => {
    console.log(reviewID,userID);

    try {
        const response = await axios.put(`/Albumpage/like`, { reviewID: reviewID, userID: userID });
    } catch (error) {
        console.error("error updating bio:", error);
    }

  };


    
  useEffect(() => {getalbuminfo(albumID); }, []);

function getalbumstars(reviews) {
    let starsum = 0
    for (var x = 0; x < reviews.length; x++) {
        starsum+=reviews[x].stars
    }
    let stars = Math.round(starsum/reviews.length)
    return stars
}

function getStarString(starnum) {
    let starstr = ""
    for (var i = 0; i < starnum; i++) {
        starstr+= "★"
    }
    for (var i = 0; i < 5 - starnum; i++) {
        starstr+="☆"
    }
    return starstr
}


function ReviewComponent({ review}) {
    const [likecount, setlikecount] = useState(review.likedby.length);
   function likecountchange() {
        if (review.likedby.indexOf(user) > -1) {
            //Unlike
            console.log(review)
            unlikereview(review.objID,user);
            setlikecount(likecount-1);
            review.likedby.splice(review.likedby.indexOf(user), 1);
        }
        else {
            //Like
            likereview(review.objID,user);
            setlikecount(likecount+1)
            review.likedby.push(user)

        }
    }

    const stars = useState(getStarString(review.stars));


    var redlikebutton = {
        filter: (review.likedby.indexOf(user) > -1) ? "invert(11%) sepia(84%) saturate(5483%) hue-rotate(2deg) brightness(92%) contrast(117%)" : "contrast(100%)",
        paddingTop: "2%",
        paddingRight:"1%"
    };
    
    return (
        <div id="review">
        <div id="titleblock">
            <h2 style={{paddingTop: "0.5%"}}>{review.username}</h2>
            <h2>{stars}</h2>
            <img  style={redlikebutton} src={likebutton} alt="like button" width="2%" height="2%" onClick={() => likecountchange()}/>
            <h4 style={{paddingTop: ".75%"}}>{likecount}</h4>
            <p  style={{paddingTop: "1.5%"}}><b>{review.date}</b></p>
        </div>
        <div style={{fontSize:20}}>
            <p><b>Favorite Song: </b>{review.favSong}</p>
            <p><b>Least Favorite Song: </b>{review.leastfavSong}</p>
            <p >{review.text}</p>
        </div>
        <hr></hr>
    </div>
);
}


function Reviews({ReviewList}) {
    return (
        <div>
            {ReviewList.map((review) => (
                <ReviewComponent review={review} />
            ))}
        </div>
    )
}


    return(
        
        <html>            
            <div id="albuminfo" >
                <h1 >{albuminfo.albuname} {getStarString(getalbumstars(reviews))}</h1>
                <h2>{albuminfo.artist}</h2>
                <img src={"data:image/jpeg;base64,"+albuminfo.image} width="100%" height="100%"/>
                <div id="postreviewbutton"><Link to="/postreview"><button class="custom-button">Post a Review </button> </Link> </div>
            </div>
            <div id="reviewwrapper">
                <div id="reviews"> 
                <br></br>
                <Reviews ReviewList={reviews} />
                </div>
            </div>
        </html>
    )
}

export default Examplealbum;