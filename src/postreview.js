import './postreview.css'

export default function postreview(){
    return(
    <html>
        <body class="postreview-body">
                <div id="ReviewPostBody">
                    <h1>Post a Review</h1>
                    <form>
                        <label for="albumname"><h3>Album Name</h3></label>
                        <input style={{fontSize: "20px",width:"60%"}} type="text" id="albname"></input>
                        <label for="rating"><h4>Your Rating</h4></label>
                        <select name="rating" id="rating" style={{width:"40%"}}>
                            <option disabled selected value> Select a rating </option>
                            <option value="5">★★★★★ - Amazing</option>
                            <option value="4">★★★★☆ - Great</option>
                            <option value="3">★★★☆☆ - Average</option>
                            <option value="2">★★☆☆☆ - Bad</option>
                            <option value="1">★☆☆☆☆ - Horrible</option>
                        </select> 
                        <label for="reviewtext"><h4>Your Review</h4></label>
                        <textarea style={{fontSize: "20px"}} id="reviewtext" name="reviewtext" rows="15" cols="60" placeholder="I thought this album was..."></textarea> <br /> <br/>
                        <input type="submit" value="Submit Review" class="custom-button"></input>
                    </form>
                </div>
            </body>
        </html>
        )
    }