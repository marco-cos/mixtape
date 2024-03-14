import likebutton from '../images/likebutton.png';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



//TO CHNAGE: Make this currently logged in user
var user = "username"

//TO CHANGE: Make these dynamically come from album reviews
const review0 = {
    username: 'LordeLover',
    stars: 5,
    date: "Mar 1, 2024",
    text: "Lorem ipsum dolor sit amet. Et quos suscipit quo totam dolore est autem aliquam ut dolores quas et distinctio aperiam sit mollitia perspiciatis ut doloremque voluptatem. Et nisi quidem et quos galisum sit tenetur ipsam est laudantium esse sit eveniet ipsa. Sed error asperiores et sunt sequi et placeat minus in enim voluptatem et voluptatibus quos ut itaque temporibus 33 quidem voluptatem. Eos sunt dolor sit ipsam iure sed ipsa galisum. Aut explicabo quisquam eum expedita deserunt est quis molestiae 33 corporis deserunt qui enim atque.",
    likedby: ["user1","user2","user3"]
}
const review1 = {
    username: 'ReviewerUsername',
    stars: 3,
    date: "Feb 28, 2024",
    text: "Lorem ipsum dolor sit amet. Non maxime galisum est praesentium architecto ea possimus numquam est molestiae quisquam ut iusto iure. Cum voluptates perferendis et fuga laboriosam 33 consequatur aliquid. Ea omnis iusto ut molestiae consequatur ab molestiae doloribus. Qui consequatur modi eos soluta dignissimos non quam repellendus. Non voluptatem aliquid est obcaecati repellat nam suscipit mollitia quo quasi commodi sit sint ipsa et rerum deleniti id voluptatum nihil?",
    likedby: ["username","user2","user3","user4","user5","user6","user7","user8","user9","user10"]
}
const review2 = {
    username: 'LordeIsGreat',
    stars: 4,
    date: "Feb 26, 2024",
    text: "Lorem ipsum dolor sit amet. Et sunt odit ad fuga dolores ut cupiditate sunt est eaque veniam cum vitae explicabo. A dolorum itaque hic quasi quae sed nihil officia est repellendus provident. Hic iusto illum quo odio voluptate vel temporibus perspiciatis. Ut architecto assumenda et nemo repudiandae nam molestias fugit et perspiciatis consequatur. Aut earum voluptas vel omnis praesentium est dignissimos animi vel laboriosam exercitationem eos aperiam dolorum. In consequatur consequuntur qui consequatur sint aut consequatur nostrum qui consequatur autem non beatae voluptate eos aperiam omnis. Aut tempore odio quo laboriosam reprehenderit ea magni nostrum eum placeat cupiditate. Et corrupti consequatur aut sint culpa sed ipsa placeat aut minima dicta. Ad omnis provident in quisquam perspiciatis 33 quibusdam commodi est minima doloribus est repudiandae Quis sed tempore perspiciatis nam repellendus rerum.",
    likedby: ["user1","user2","user3","user4"]
}
const review3 = {
    username: 'IHateLorde',
    stars: 4,
    date: "Feb 22, 2024",
    text: "Lorem ipsum dolor sit amet. Id praesentium voluptatibus aut cumque officia ut aperiam labore. In labore explicabo et dolorem cumque aut eius eaque nam Quis tempore qui sint velit vel maiores autem! Qui eaque assumenda aut nihil dicta ut illum officiis qui voluptas quod et minima autem ea officia unde id sunt aliquid. Et veritatis cumque et fugiat quia est dolorem eligendi aut temporibus laboriosam qui sequi numquam aut ullam sapiente. Est voluptatibus facilis aut quia sint est deleniti assumenda est internos molestiae qui doloribus iste. Nam error velit 33 natus error eos voluptates vitae rem voluptates temporibus sit omnis perspiciatis! Ut incidunt ipsa ut rerum iusto aut repellat voluptate. Quo enim deleniti et consequuntur molestiae est labore laborum id voluptatum dignissimos sit quibusdam facilis quo nemo tempore. At atque excepturi est enim maiores sed delectus ducimus qui sapiente culpa vel perspiciatis fuga quo ipsum error.",
    likedby: []
}
const reviews = [review0,review1,review2,review3];

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
            //TO CHANGE: User unliked, so remove their name from firebase
            setlikecount(likecount-1)
            review.likedby.splice(review.likedby.indexOf(user), 1);
        }
        else {
            //TO CHANGE: User liked, so add their name to firebase
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
        <p style={{fontSize:20}}>{review.text}</p>
        <hr></hr>
    </div>
);
}

//TO CHANGE: Dynamically get album info
const albuminfo = {
    albuname: "Melodrama",
    artist: "Lorde",
    image: "https://assets.vogue.com/photos/58b9984661298051ac278def/master/w_2560%2Cc_limit/00-holding-lorde-album-art.jpg",
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


//TO CHANGE: Post review button should link to posting review of album of which the page was
export default function examplealbum(){
    return(
        <html>
            <div id="albuminfo" >
                <h1>{albuminfo.albuname} {getStarString(getalbumstars(reviews))}</h1>
                <h2>{albuminfo.artist}</h2>
                <img src={albuminfo.image} width="100%" height="100%"/>
                <div id="postreviewbutton"><Link to="/examplealbum"><button class="custom-button">Post a Review </button> </Link> </div>
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