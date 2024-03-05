import likebutton from './likebutton.png';

export default function examplealbum(){
    return(
        <html>
            <div id="albuminfo" >
                <h1>Melodrama ★★★★☆</h1>
                <h2>Lorde</h2>
                <img src="https://assets.vogue.com/photos/58b9984661298051ac278def/master/w_2560%2Cc_limit/00-holding-lorde-album-art.jpg" width="100%" height="100%"/>
                <div id="postreviewbutton"><button class="custom-button">Post a Review</button></div>
            </div>


            <div id="reviewwrapper">
                <div id="excolor"></div>
                <div id="reviews"> 
                <br></br>

                    <div id="review">
                        <div id="titleblock">
                            <h2 style={{paddingTop: "0.5%"}}>ILoveMusic123</h2>
                            <h2>★★★★★</h2>
                            <img  style={{paddingTop: "2%", paddingRight:"1%"}} src={likebutton} alt="like button" width="2%" height="2%" />
                            <h4 style={{paddingTop: ".75%"}}>8 Likes</h4>
                            <p  style={{paddingTop: "1.5%"}}><b>Posted Mar 1, 2024</b></p>
                        </div>
                        <p style={{fontSize:20}}>Lorem ipsum dolor sit amet. Et quos suscipit quo totam dolore est autem aliquam ut dolores quas et distinctio aperiam sit mollitia perspiciatis ut doloremque voluptatem. Et nisi quidem et quos galisum sit tenetur ipsam est laudantium esse sit eveniet ipsa. Sed error asperiores et sunt sequi et placeat minus in enim voluptatem et voluptatibus quos ut itaque temporibus 33 quidem voluptatem. Eos sunt dolor sit ipsam iure sed ipsa galisum. Aut explicabo quisquam eum expedita deserunt est quis molestiae 33 corporis deserunt qui enim atque.</p>
                        <hr></hr>
                    </div>
                    <div id="review">
                        <div id="titleblock">
                            <h2 style={{paddingTop: "0.5%"}}>ReviewerUsername</h2>
                            <h2>★★★☆☆</h2>
                            <img  style={{paddingTop: "2%", paddingRight:"1%"}} src={likebutton} alt="like button" width="2%" height="2%" />
                            <h4 style={{paddingTop: ".75%"}}>10 Likes</h4>
                            <p style={{paddingTop: "1.5%"}}><b>Posted Feb 28, 2024</b></p>
                        </div>
                        <p style={{fontSize:20}}>LLorem ipsum dolor sit amet. Non maxime galisum est praesentium architecto ea possimus numquam est molestiae quisquam ut iusto iure. Cum voluptates perferendis et fuga laboriosam 33 consequatur aliquid. Ea omnis iusto ut molestiae consequatur ab molestiae doloribus. Qui consequatur modi eos soluta dignissimos non quam repellendus. Non voluptatem aliquid est obcaecati repellat nam suscipit mollitia quo quasi commodi sit sint ipsa et rerum deleniti id voluptatum nihil? </p>
                        <hr></hr>
                    </div>
                    <div id="review">
                        <div id="titleblock">
                            <h2 style={{paddingTop: "0.5%"}}>LordeIsGreat</h2>
                            <h2>★★★★★</h2>
                            <img  style={{paddingTop: "2%", paddingRight:"1%"}} src={likebutton} alt="like button" width="2%" height="2%" />
                            <h4 style={{paddingTop: ".75%"}}>4 Likes</h4>
                            <p style={{paddingTop: "1.5%"}}><b>Posted Feb 26, 2024</b></p>
                        </div>
                        <p style={{fontSize:20}}>Lorem ipsum dolor sit amet. Et sunt odit ad fuga dolores ut cupiditate sunt est eaque veniam cum vitae explicabo. A dolorum itaque hic quasi quae sed nihil officia est repellendus provident. Hic iusto illum quo odio voluptate vel temporibus perspiciatis. Ut architecto assumenda et nemo repudiandae nam molestias fugit et perspiciatis consequatur. Aut earum voluptas vel omnis praesentium est dignissimos animi vel laboriosam exercitationem eos aperiam dolorum. In consequatur consequuntur qui consequatur sint aut consequatur nostrum qui consequatur autem non beatae voluptate eos aperiam omnis. Aut tempore odio quo laboriosam reprehenderit ea magni nostrum eum placeat cupiditate. Et corrupti consequatur aut sint culpa sed ipsa placeat aut minima dicta. Ad omnis provident in quisquam perspiciatis 33 quibusdam commodi est minima doloribus est repudiandae Quis sed tempore perspiciatis nam repellendus rerum?</p>
                        <hr></hr>
                    </div>
                    <div id="review">
                        <div id="titleblock">
                            <h2 style={{paddingTop: "0.5%"}}>IHateLorde</h2>
                            <h2>★★☆☆☆</h2>
                            <img  style={{paddingTop: "2%", paddingRight:"1%"}} src={likebutton} alt="like button" width="2%" height="2%" />
                            <h4 style={{paddingTop: ".75%"}}>3 Likes</h4>
                            <p style={{paddingTop: "1.5%"}}><b>Posted Feb 22, 2024</b></p>
                        </div>
                        <p style={{fontSize:20}}>Lorem ipsum dolor sit amet. Id praesentium voluptatibus aut cumque officia ut aperiam labore. In labore explicabo et dolorem cumque aut eius eaque nam Quis tempore qui sint velit vel maiores autem! Qui eaque assumenda aut nihil dicta ut illum officiis qui voluptas quod et minima autem ea officia unde id sunt aliquid. Et veritatis cumque et fugiat quia est dolorem eligendi aut temporibus laboriosam qui sequi numquam aut ullam sapiente. Est voluptatibus facilis aut quia sint est deleniti assumenda est internos molestiae qui doloribus iste. Nam error velit 33 natus error eos voluptates vitae rem voluptates temporibus sit omnis perspiciatis! Ut incidunt ipsa ut rerum iusto aut repellat voluptate. Quo enim deleniti et consequuntur molestiae est labore laborum id voluptatum dignissimos sit quibusdam facilis quo nemo tempore. At atque excepturi est enim maiores sed delectus ducimus qui sapiente culpa vel perspiciatis fuga quo ipsum error.</p>
                        <hr></hr>
                    </div>



                </div>
            </div>
        </html>
    )
}