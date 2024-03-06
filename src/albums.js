import './App.css';


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

const albums = [album0, album1, album2, album3, album4, album5, album6, album7, album8, album9, album10, album11, album12, album13];
const albums_shuf0 = [album11,album3,album13,album9,album5,album4,album12,album2,album6,album10,album1,album7,album8,album0];
const albums_shuf1 = [album8,album11,album0,album9,album5,album6,album10,album3,album2,album13,album7,album4,album12,album1];


// a single album within the album grid
function AlbumGridComponent({ album, onClick}) {
    return (
        <div style={{ cursor: 'pointer' }} onClick={() => onClick(album.id)}>
            <img 
                src={album.url}
                alt='alt_text_here' 
                className="pop-out"
                width="100%"
                height="100%" 
            />
        </div>
    );
}

function AlbumGrid({albumsArray}) {
    const handleClick = (id) => {
        console.log(`${id} clicked!`);
        // handle click event later
    }
    return (
        <div className='album-grid'>
            {albumsArray.map((album) => (
                <AlbumGridComponent key={album.id} album={album} onClick={handleClick} />
            ))}
        </div>
    )
}

export default function Albums() {
    return (
        <div id='albumpage'>
            <h1>Popular Albums</h1>
            <div>
                <AlbumGrid albumsArray={albums} />
            </div>
            <h1>Reviewed By Your Friends</h1>
            <div>
                <AlbumGrid albumsArray={albums_shuf0} />
            </div>
            <h1>New Reviews</h1>
            <div>
                <AlbumGrid albumsArray={albums_shuf1} />
            </div>
        </div>
    )
}

export { AlbumGrid, AlbumGridComponent };

/*
export default function Albums(){
    return(
        <div id="albumpage">
            <h1>Popular Albums</h1>
            <div id="albumcontainer">
                <div className="albums_albumpage">
                    <img className="cover_albumpage" width="100%" height="100%" src="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/aecf4604-1d3b-417f-97c6-d5be80f51eb9/3.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png?crop=0.502xw:1.00xh;0.498xw,0&resize=1200:*"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://cdn.vox-cdn.com/thumbor/cUUdVnTXrleRNqbV-9JloWAleSI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19535833/thumb_clean.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://imgv3.fotor.com/images/blog-richtext-image/born-to-die-music-album-cover.png"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://townsquare.media/site/366/files/2023/06/attachment-lil_uzi_vert_pink_tape_album_cover_artwork.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://pyxis.nymag.com/v1/imgs/699/1e2/965287137d49b3f29e6ff9c4d0e5a3f07b-01-kanye-west-ye.rsquare.w330.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://media.vanityfair.com/photos/561d1b04319af15240f9b03f/4:3/w_1280,h_960,c_limit/t-rihanna-cover-art-roy-nachum.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://static.stereogum.com/uploads/2023/03/LDR-Tunnel-1679672318-scaled.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://www.billboard.com/wp-content/uploads/2022/06/beyonce-Lemonade-album-art-billboard-1240.jpg?w=600"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://cdn.pastemagazine.com/www/articles/2019/11/25/strangerrrr.jpg"></img>
                </div>
                <div id="arrowdiv">
                    <img id="arrow" src={nextbutton} width="100%" height="100%" />
                </div>
            </div>

            <h1>Reviews From Users You Follow</h1>
            <div id="albumcontainer">
                <div className="albums_albumpage">
                    <img className="cover_albumpage" width="100%" height="100%" src="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/aecf4604-1d3b-417f-97c6-d5be80f51eb9/3.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png?crop=0.502xw:1.00xh;0.498xw,0&resize=1200:*"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://cdn.vox-cdn.com/thumbor/cUUdVnTXrleRNqbV-9JloWAleSI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19535833/thumb_clean.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://imgv3.fotor.com/images/blog-richtext-image/born-to-die-music-album-cover.png"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://townsquare.media/site/366/files/2023/06/attachment-lil_uzi_vert_pink_tape_album_cover_artwork.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://pyxis.nymag.com/v1/imgs/699/1e2/965287137d49b3f29e6ff9c4d0e5a3f07b-01-kanye-west-ye.rsquare.w330.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://media.vanityfair.com/photos/561d1b04319af15240f9b03f/4:3/w_1280,h_960,c_limit/t-rihanna-cover-art-roy-nachum.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://static.stereogum.com/uploads/2023/03/LDR-Tunnel-1679672318-scaled.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://www.billboard.com/wp-content/uploads/2022/06/beyonce-Lemonade-album-art-billboard-1240.jpg?w=600"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://cdn.pastemagazine.com/www/articles/2019/11/25/strangerrrr.jpg"></img>
                </div>
                <div id="arrowdiv">
                    <img id="arrow" src={nextbutton} width="100%" height="100%" />
                </div>
            </div>

            <h1>New Reviews</h1>
            <div id="albumcontainer">
                <div className="albums_albumpage">
                    <img className="cover_albumpage" width="100%" height="100%" src="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/aecf4604-1d3b-417f-97c6-d5be80f51eb9/3.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png?crop=0.502xw:1.00xh;0.498xw,0&resize=1200:*"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://cdn.vox-cdn.com/thumbor/cUUdVnTXrleRNqbV-9JloWAleSI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19535833/thumb_clean.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://imgv3.fotor.com/images/blog-richtext-image/born-to-die-music-album-cover.png"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://townsquare.media/site/366/files/2023/06/attachment-lil_uzi_vert_pink_tape_album_cover_artwork.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://pyxis.nymag.com/v1/imgs/699/1e2/965287137d49b3f29e6ff9c4d0e5a3f07b-01-kanye-west-ye.rsquare.w330.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://media.vanityfair.com/photos/561d1b04319af15240f9b03f/4:3/w_1280,h_960,c_limit/t-rihanna-cover-art-roy-nachum.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://static.stereogum.com/uploads/2023/03/LDR-Tunnel-1679672318-scaled.jpg"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://www.billboard.com/wp-content/uploads/2022/06/beyonce-Lemonade-album-art-billboard-1240.jpg?w=600"></img>
                    <img className="cover_albumpage" width="100%" height="100%" src="https://cdn.pastemagazine.com/www/articles/2019/11/25/strangerrrr.jpg"></img>
                </div>
                <div id="arrowdiv">
                    <img id="arrow" src={nextbutton} width="100%" height="100%" />
                </div>
            </div>



        <br/>
        </div>
    )
}
*/
/*
import React from 'react';
import { useState } from 'react';

import './bubba-album.png';
import './MIFLSA.png';
import './skiptracing.png';
import './TPAB.png';

import './App.css';
import { Link } from 'react-router-dom';

const albumsBlurb = {
    fontWeight: 'bold',
    fontSize: '48px',
    display: 'flex',
    padding: '10px'
}

const album1 = {
    id: 'bubba',
    url: './bubba-album.png',
}

const album2 = {
    id: 'pond',
    url: './MIFLSA.png',
}

const album3 = {
    id: 'skiptracing',
    url: './skiptracing.png',
}

const album4 = {
    id: 'tpab',
    url: './TPAB.png',
}

const albumsArray = [album1, album2, album3, album4];

function AlbumGridComponent({ album, onClick}) {
    return (
        <div style={{ cursor: 'pointer' }} onClick={() => onClick(album.id)}>
            <img 
                src={album.url} 
                className="fade-left"
                style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }} 
            />
        </div>
    );
}

function AlbumGrid({albumsArray}) {
    const handleClick = (key) => {
        console.log('Image {id} clicked!');
        // handle click event later
    }
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px'}}>
            {albumsArray.map((album) => (
                <AlbumGridComponent key={album.id} album={album} onClick={handleClick} />
            ))}
        </div>
    )
}

export default function Top(){

    return(
        <div style={albumsBlurb}>
            <div>Listened to a new album? Drop your review.</div>
            <AlbumGrid albumsArray={albumsArray} />
        </div>
    )
}
*/