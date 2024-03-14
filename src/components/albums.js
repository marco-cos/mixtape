import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

async function GetALBS() {
    var albums =[];
    try {
        const query = "";
        const response = await axios.post('/Albumshowcase/', { query }, {withCredentials: true});
        const resalbums = response.data.albums;
    
        for (let i = 0; i < resalbums.length; i++) {
            const alb0 = {
                title:resalbums[i].title,
                id:resalbums[i]._id,
                url:resalbums[i].cover
            }
            albums[i] = alb0;
    
        }
        console.log(albums)
    }  
    
            catch (error) {
        console.error(error);
        }
    return albums    
}

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
const album4 = {
    id: 'liluzi_pinktape',
    url: 'https://townsquare.media/site/366/files/2023/06/attachment-lil_uzi_vert_pink_tape_album_cover_artwork.jpg'
}
const album5 = {
    id: 'kanye_bipolar',
    url: 'https://pyxis.nymag.com/v1/imgs/699/1e2/965287137d49b3f29e6ff9c4d0e5a3f07b-01-kanye-west-ye.rsquare.w330.jpg'
}
const album6 = {
    id: 'rihanna_anti',
    url: 'https://media.vanityfair.com/photos/561d1b04319af15240f9b03f/4:3/w_1280,h_960,c_limit/t-rihanna-cover-art-roy-nachum.jpg'
}
const album7 = {
    id: 'lanadelrey_didyouknow',
    url: 'https://static.stereogum.com/uploads/2023/03/LDR-Tunnel-1679672318-scaled.jpg'
}
const album8 = {
    id: 'beyonce_lemonade',
    url: 'https://www.billboard.com/wp-content/uploads/2022/06/beyonce-Lemonade-album-art-billboard-1240.jpg?w=600'
}
const album9 = {
    id: 'phoebebridgers_alps',
    url: 'https://cdn.pastemagazine.com/www/articles/2019/11/25/strangerrrr.jpg'
}
const album10 = {
    id: 'kaytranada_bubba',
    url: 'https://m.media-amazon.com/images/I/71x4X6Ws2iL._UF1000,1000_QL80_.jpg'
}
const album11 = {
    id: 'zachbryan_zachbryan',
    url: 'https://bloximages.newyork1.vip.townnews.com/tulsaworld.com/content/tncms/assets/v3/editorial/4/3a/43a2749a-434b-11ee-a1cf-5fb34b91045c/64e8acf18403f.image.jpg?resize=1200%2C1200'
}
const album12 = {
    id: 'sza_ctrl',
    url: 'https://m.media-amazon.com/images/I/91AbZ7RgrEL._UF1000,1000_QL80_.jpg'
}
const album13 = {
    id: 'tribe_beatsrhymes&life',
    url: 'https://i.discogs.com/yc25vAWjMHzhMpMAQ-G0ngRD74NTEbaTqG8UNzKa4o4/rs:fit/g:sm/q:90/h:588/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4MDg4/NDktMTY1NTI4MDc4/Ny01NjQwLmpwZWc.jpeg'
}
const album14 = {
    id: 'terracemartin_dinnerparty',
    url: 'https://admin.itsnicethat.com/images/ToeAVOUY-SVWp6eibmxEZmjEWFU=/189868/format-webp%7Cwidth-2880/Dinner_Party_album_cover_artwork_Amani_Washington_art_music_painting_itsni.jpg'
}
const album15 = {
    id: 'tommisch&yussef_whatkindamusic',
    url: 'https://media.pitchfork.com/photos/5ea205f03577a40009ece414/1:1/w_800,h_800,c_limit/What%20Kinda%20Music_Tom%20Misch%20and%20Yussef%20Dayes.jpg'
}
const album16 = {
    id: 'avantdale_avantdale',
    url: 'https://i.discogs.com/Hb5Exksb7ywMAYTW82wuc57FshE9jApFZCcOfSia2xU/rs:fit/g:sm/q:90/h:600/w:596/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNTQ5/ODEyLTE2NjQ5NDA4/MjUtMzU4Ni5qcGVn.jpeg'
}
const album17 = {
    id: 'beachhouse_cherry',
    url: 'https://lastfm.freetls.fastly.net/i/u/ar0/92ee7e4f3afdbe6a9a8c13a4a790baf1.jpg'
}
const album18 = {
    id: 'littlesimz_nothankyou',
    url: 'https://media.pitchfork.com/photos/639780c076d8d727248c60d3/master/pass/littlesimz.jpeg'
}
const album19 = {
    id: 'thesmiths_queenisdead',
    url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/the-queen-is-dead-nyasia-hamill.jpg'
}




//const albums = [album19,album14,album12,album13,album3,album8,album1,album16,album4,album17,album5,album0,album18,album6,album15,album7,album2,album9,album11,album10];
const albums_shuf0 = [album2,album5,album4,album19,album11,album17,album13,album14,album8,album10,album15,album12,album3,album0,album6,album1,album9,album18,album7,album16];
const albums_shuf1 = [album13,album18,album11,album17,album8,album3,album16,album15,album5,album6,album7,album1,album0,album9,album10,album4,album12,album19,album14,album2];

//
// CODE
//

function AlbumGridComponent({ album, onClick}) {

    return (
        <div style={{ cursor: 'pointer' }} onClick={() => onClick(album.id)}>
            <img 
                src={album.url}
                alt='alt_text_here' 
                className="pop-out"
                width="225px"
                height="225px" 
            />
        </div>
    );
}



// album grid element
function AlbumGrid({ albumsArray }) {
    const scrollContainerRef = useRef(null);
    const [displayAlbums, setDisplayAlbums] = useState([...albumsArray, ...albumsArray]); 

    useEffect(() => {
        const container = scrollContainerRef.current;
        const totalWidth = container.scrollWidth / 2; 

        const handleScroll = () => {
            if (container.scrollLeft >= totalWidth) {
                container.scrollLeft = 0;
            }
        };
        container.addEventListener('scroll', handleScroll);
        
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [albumsArray]);

    const handleClick = (id) => {
        console.log(`${id} clicked!`);
        // handle click event later
    }
    return (
        <div ref={scrollContainerRef} className='album-grid-container'>
            <div className='album-grid'>
                {displayAlbums.map((album, index) => (
                    <AlbumGridComponent key={album.id} album={album} onClick={handleClick} />
                ))}
            </div>
        </div>
    )
}


// new album grid element
function NewAlbumGridComponent({ album, onClick}) {

    return (
        <div style={{ cursor: 'pointer' }} onClick={() => onClick(album.id)}>
            <img 
                src={"data:image/jpeg;base64,"+album.url}
                alt='alt_text_here' 
                className="pop-out"
                width="225px"
                height="225px" 
            />
        </div>
    );
}

function NewAlbumGrid({ albumsArray }) {
    const navigate = useNavigate();
    console.log("IN NEW ALBRUM GRID FOR "+albumsArray)
    const scrollContainerRef = useRef(null);
    const [displayAlbums, setDisplayAlbums] = useState([...albumsArray]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        const totalWidth = container.scrollWidth / 2; 

        const handleScroll = () => {
            if (container.scrollLeft >= totalWidth) {
                container.scrollLeft = 0;
            }
        };
        container.addEventListener('scroll', handleScroll);
        
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [albumsArray]);

    console.log(albumsArray)
    const handleClick = (title) => {
        console.log("IN HANDLECLICK WITH TITLE: "+ title)
        navigate(`/albums/${title}`);
        // handle click event later
    }

    
    return (
        <div ref={scrollContainerRef} className='album-grid-container'>
            <div className='album-grid'>
                {displayAlbums.map((album, index) => (
                    <NewAlbumGridComponent key={album.id} album={album} onClick={() => handleClick(album.title)} />
                ))}
            </div>
        </div>
    )
}





// entire page
export default function Albums() {

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const grids = document.querySelectorAll('.album-grid');

            grids.forEach( (grid,index) => {
                const directionMultiplier = index % 2 === 0 ? 1 : -1;

                const initialOffset = -grid.offsetWidth * 0.13;
                const dynamicScrollAmount = scrollPosition / 20 * directionMultiplier;
                grid.style.transform = `translateX(${initialOffset + dynamicScrollAmount}px)`;
            });
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const [albums, setAlbums] = useState(null); // Initial state is null or could be an empty array

    useEffect(() => {
        async function fetchAlbums() {
            const albumsData = await GetALBS();
            setAlbums(albumsData);
        }

        fetchAlbums();
    }, []);
    return (
        <div id='albumpage'>
            <h1>Popular Albums</h1>
            <div style={{marginBottom: '50px'}}>
            {albums ? <NewAlbumGrid albumsArray={albums} /> : 'Loading...'}
            </div>
            <h1>Reviewed By Your Friends</h1>
            <div style={{marginBottom: '50px'}}>
                <AlbumGrid albumsArray={albums_shuf0} />
            </div>
            <h1>New Reviews</h1>
            <div style={{marginBottom: '50px'}}>
                <AlbumGrid albumsArray={albums_shuf1} />
            </div>
        </div>
    )
}

export { AlbumGrid, AlbumGridComponent };