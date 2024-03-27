import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Alert, Spinner } from 'react-bootstrap';
import MusicPlayer from './MusicPlayer';

const ArtistDashboard1 = () => {
  const [musicFiles, setMusicFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/music')
      .then(response => {
        const fullMusicFiles = response.data.map(music => {
          return {
            ...music,
            fullUrl: music.fullUrl,
            coverUrl: music.coverUrl
          };
        });

        setMusicFiles(fullMusicFiles);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching music. Please try again later.');
        setLoading(false);
        console.error('Error fetching music:', error.message);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">My Music</h2>
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
            <ListGroup.Item key={music.id} className="d-flex justify-content-between align-items-center">
              <div>
                <img src={music.coverUrl} alt="Music cover" style={{ width: '100px', height: '100px' }} />
                <div>{music.title}</div>
                <div>{music.description}</div>
              </div>
              {music.fullUrl && <MusicPlayer musicUrl={music.fullUrl} />}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ArtistDashboard1;
