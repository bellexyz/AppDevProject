import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ListGroup, Alert, Spinner, Button, Container, Image, Row, Col } from 'react-bootstrap';
import MeloMixLogo from './images/meloMixLogo.png';
import './ListenerDashboard.css';
import MainSidebar from './MainSidebar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AlbumPage from './AlbumPage';
import GenrePage from './GenrePage';

const ListenerDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [musicFiles, setMusicFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [showRecommendedSongs, setShowRecommendedSongs] = useState(true);
  const [originalMusicFiles, setOriginalMusicFiles] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);

// Define the function to extract filename from path
const getFileNameFromPath = (filePath) => {
  const parts = filePath.split('/');
  const fileNameWithExtension = parts[parts.length - 1];
  const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
  return fileNameWithoutExtension;
};


  useEffect(() => {
    const storedFavoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs') || '[]');
    setFavoriteSongs(storedFavoriteSongs);
  
    axios.get('http://localhost:8000/api/music')
      .then(response => {
        const fullMusicFiles = response.data.map(music => {
          return {
            ...music,
            fullUrl: `http://localhost:8000/${music.file_path}`,
            coverUrl: `http://localhost:8000/${music.cover_path}`,
            isFavorite: storedFavoriteSongs.includes(music.id)
          };
        });
  
        setMusicFiles(fullMusicFiles);
        setOriginalMusicFiles(fullMusicFiles);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching music. Please try again later.');
        setLoading(false);
        console.error('Error fetching music:', error.message);
      });
  }, []);

  const toggleFavorite = (musicId) => {
    const updatedFavoriteSongs = [...favoriteSongs];
    const index = updatedFavoriteSongs.indexOf(musicId);
    if (index === -1) {
      updatedFavoriteSongs.push(musicId);
    } else {
      updatedFavoriteSongs.splice(index, 1);
    }
    setFavoriteSongs(updatedFavoriteSongs);
    localStorage.setItem('favoriteSongs', JSON.stringify(updatedFavoriteSongs));

    const updatedMusicFiles = musicFiles.map(music => 
      music.id === musicId ? { ...music, isFavorite: !music.isFavorite } : music
    );
    setMusicFiles(updatedMusicFiles);

    const updatedOriginalMusicFiles = originalMusicFiles.map(music => 
      music.id === musicId ? { ...music, isFavorite: !music.isFavorite } : music
    );
    setOriginalMusicFiles(updatedOriginalMusicFiles);
  };

  const getFavoriteMusic = () => {
    return originalMusicFiles.filter(music => favoriteSongs.includes(music.id));
  };

  const handleViewFavorites = () => {
    setShowRecommendedSongs(false);
    setMusicFiles(getFavoriteMusic());
  };

  const handleViewRecommendedSongs = () => {
    setShowRecommendedSongs(true);
    setMusicFiles(originalMusicFiles);
  };
  const handleAlbumButtonClick = () => {
    navigate('/albums'); // Use navigate instead of history.push
  };

  const handleGenreButtonClick = () => {
    navigate('/genres'); // Use navigate instead of history.push
  };

  const getFileNameFromPathOrSongName = (music) => {
    if (music.song_name && music.song_name !== '') {
      return music.song_name;
    } else {
      return getFileNameFromPath(music.file_path);
    }
  };

  return (
    <div className="font" style={{ backgroundColor: '#403F3F', minHeight: '100vh', position: 'relative' }}>
      <Container className="d-flex flex-row align-items-center justify-content-start p-1 m-0" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#C70303', minWidth: '100%' }}>
        <Image src={MeloMixLogo} alt="MeloMix Logo" style={{ height: '30px', marginRight: '10px', marginLeft: '10px' }} />
        <h1 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>MeloMix</h1>
      </Container>
      <Row>
        <MainSidebar />
        <Col sm={8} className="mb-2 mt-4 ml-4">
          <div className="d-flex flex-row justify-content-between mb-2" style={{ minWidth: '109%' }}> 
            <h3 style={{color: 'white' }}>{showRecommendedSongs ? 'Recommended Songs' : 'Favorite Songs'}</h3>
            <div >
            <Button style={{marginRight: '5px'}} variant="primary" size='sm' onClick={showRecommendedSongs ? handleViewFavorites : handleViewRecommendedSongs}>
              {showRecommendedSongs ? 'View Favorite Music' : 'View Recommended Songs'}
            </Button>
            <Button style={{marginRight: '5px'}} variant="primary" size='sm' onClick={handleAlbumButtonClick}>View Albums</Button>
            <Button variant="primary" size='sm' onClick={handleGenreButtonClick}>View Songs</Button>
            </div>
          </div>
          <div className="mb-2">
           
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only"></span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <ListGroup>
             {musicFiles.map(music => (
            <ListGroup.Item key={music.id} className="d-flex justify-content-between align-items-center" style={{ marginBottom: '10px', borderRadius:'5px', minWidth: '109%' }}>
              <div style={{ maxWidth: '200px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <img src={music.coverUrl} alt="Music cover" style={{ width: '80px', height: '80px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
              <div>{getFileNameFromPathOrSongName(music)}</div>
                <div>{music.artist}</div>
              </div>
            </div>
              <div>
                <span className={`heart-icon ${music.isFavorite ? 'favorite' : ''}`} onClick={() => toggleFavorite(music.id)}>
                  {music.isFavorite ? '❤️' : '🤍'}
                </span>
                <Button variant="outline-primary" onClick={() => setSelectedMusic(music)}>Play</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        )}
      </Col>
        <Col sm={2} className="bg-black sidebar mb-2 mt-4 ml-auto" style={{ minHeight: '84vh', width: '243px', marginLeft: '85px', borderRadius: '5px' }}>
          {selectedMusic && (
            <div>
              <Image src={selectedMusic.coverUrl} alt="Song Cover" style={{ width: '220px', height: '220px', marginTop: '18px', borderRadius:'2px' }} />
              <div className="text-white mt-4">{getFileNameFromPath(selectedMusic.file_path)}</div>
              <div className="text-white mt-4">{selectedMusic.artist}</div>
              <div className="text-white mt-4" style={{ backgroundColor: 'red' }}>{selectedMusic.description}</div>
            </div>
          )}
          <AudioPlayer
            style={{backgroundColor:'black', color: 'white'}}
            autoPlay
            src={selectedMusic ? selectedMusic.fullUrl : ""}
            onPlay={e => console.log("onPlay")}
            // other props here
          />
        </Col>
      </Row>
    </div>
  );
};

export default ListenerDashboard;



