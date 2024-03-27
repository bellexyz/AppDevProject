import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import { ListGroup, Alert, Spinner, Button, Container, Image, Row, Col } from 'react-bootstrap';
import MeloMixLogo from './images/meloMixLogo.png';
import './ListenerDashboard.css';
import MainSidebar from './MainSidebar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/albums')
      .then(response => {
        // Assuming the API response contains the cover_path property for each album
        const albumsWithCoverUrl = response.data.map(album => ({
          ...album,
          coverUrl: `http://localhost:8000/${album.cover_path}` // Construct coverUrl from cover_path
        }));
        setAlbums(albumsWithCoverUrl);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching albums. Please try again later.');
        setLoading(false);
        console.error('Error fetching albums:', error.message);
      });
  }, []);

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
            <h3 style={{color: 'white' }}>Albums</h3>
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
            {albums.map(album => (
              <ListGroup.Item key={album.id} className="d-flex justify-content-between align-items-center" style={{ marginBottom: '10px', borderRadius:'5px', minWidth: '109%' }}>
              <Link to={`/albums/${album.id}`}> {/* No need for '/api' in the route */}
                  <img src={album.coverUrl} alt="Album cover" style={{ width: '80px', height: '80px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                    <div>{album.title}</div>
                  </div>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
          
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AlbumPage;
