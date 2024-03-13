import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import MusicPlayer from './MusicPlayer';

const ArtistDashboard = () => {
  const [musicFile, setMusicFile] = useState(null);
  const [musicCover, setMusicCover] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [uploadedMusicUrl, setUploadedMusicUrl] = useState('');

  const handleFileChange = event => {
    if (event.target.name === 'music') {
      setMusicFile(event.target.files[0]);
    } else if (event.target.name === 'cover') {
      setMusicCover(event.target.files[0]);
    }
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleArtistChange = event => {
    setArtist(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleUpload = async () => {
    try {
      if (!musicFile || !musicCover) {
        setError('Please select both a music file and a cover image.');
        return;
      }

      if (!title.trim()) {
        setError('Please enter a music title.');
        return;
      }

      if (!artist.trim()) {
        setError('Please enter a music title.');
        return;
      }

      if (!description.trim()) {
        setError('Please enter description.');
        return;
      }

      const formData = new FormData();
      formData.append('music', musicFile);
      formData.append('cover', musicCover);
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('description', description);

      const response = await axios.post('http://localhost:8000/api/music/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Music uploaded successfully', response.data);
      setUploadedMusicUrl(response.data.musicUrl);
      setError('');
    } catch (error) {
      console.error('Error uploading music:', error.message);
      setError('Error uploading music. Please try again.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formMusicFile">
              <Form.Label>Music File</Form.Label>
              <Form.Control type="file" name="music" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="formMusicCover">
              <Form.Label>Music Cover</Form.Label>
              <Form.Control type="file" name="cover" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter music title" value={title} onChange={handleTitleChange} />
            </Form.Group>
            <Form.Group controlId="formArtist">
              <Form.Label>Artist</Form.Label>
              <Form.Control type="text" placeholder="Enter music artist" value={artist} onChange={handleArtistChange} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleUpload}>Upload Music</Button>
          </Form>
          {uploadedMusicUrl && <MusicPlayer musicUrl={uploadedMusicUrl} />}
          <Link to="/ArtistDashboard1">
            <Button variant="secondary" className="mt-3">My Music</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ArtistDashboard;
