import blankprofilepic from './blankprofilepic.webp';
import editbutton from './editbutton.png';

const headerStyle = {
    display: 'inline-block',
    marginRight: '10px',
  };

  const imageStyle = {
    display: 'inline-block',
  };


export default function Profile(){
    return(
        <html>
             <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
            <div style={{ paddingLeft: '5%', paddingTop: '5%'}}>
                <h1>Username</h1>
                <img src={blankprofilepic} alt="logo" width="20%" height="20%"/>
                 <br></br>
                 <h2 style={headerStyle}>Bio</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={imageStyle} /> <br/>
                <p>I love music. This is my favorite website ever invented in the history of the world ever.</p>
                <h2 style={headerStyle}>Favorite Artist</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={imageStyle} /> <br/>
                <p>Alvin & The Chipmunks</p>
                <h2 style={headerStyle}>Favorite Album</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={imageStyle} /> <br/>
                <p>Melodrama - Lorde (add link to album)</p>
                <h2 style={headerStyle}>Favorite Song</h2><img src={editbutton} alt="logo" width="1.5%" height="1.5%" style={imageStyle} /> <br/>
                <p>I can't think of any songs - Some Artist</p>
                <h2 style={headerStyle}>Recent Reviews</h2><br/>
                <div className="albums">
                    <div className="cover"></div>
                    <div className="cover"></div>
                    <div className="cover"></div>
                    <div className="cover"></div>
                    <div className="cover"></div>
                </div>
            </div>
        </html>
    )
}