import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Modal} from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import './AlbumUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import MusicPlayer1 from './MusicPlayer1'; // Import the MusicPlayer component


const ArtistDashboard = () => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [musicFiles, setMusicFiles] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [uploadedMusicUrl, setUploadedMusicUrl] = useState('');
  const [genres, setGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onDrop = acceptedFiles => {
    setMusicFiles([...musicFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'audio/*',
  });

  const handleFileChange = event => {
    if (event.target.name === 'cover') {
      setCoverFile(event.target.files[0]);
    }
  };

  const handleTitleChange = event => {
    setAlbumTitle(event.target.value);
  };
  

  const handleArtistChange = event => {
    setArtist(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleGenreChange = (event, index) => {
    const selectedGenres = Array.from(event.target.selectedOptions, option => option.value);
    setGenres(prevGenres => {
      const updatedGenres = [...prevGenres];
      updatedGenres[index] = selectedGenres; 
      return updatedGenres;
    });
  
    // Close the select dropdown by blurring the element
    event.target.blur();
  };
  

  const handleDeleteMusic = index => {
    setMusicFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    try {
      if (!validateForm()) return;
  
      const formData = new FormData();
      formData.append('album_title', albumTitle);
      formData.append('cover', coverFile);
      formData.append('artist', artist);
      formData.append('description', description);
  
      musicFiles.forEach((file, index) => {
        formData.append(`music[${index}]`, file);
        formData.append(`genres[${index}]`, JSON.stringify(genres[index]));
      });
  
      const response = await axios.post('http://localhost:8000/api/music/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Music uploaded successfully', response.data);
      setUploadedMusicUrl(response.data.musicUrl);
      setError('');
      setShowModal(true);
  
      // Reset form fields
      setAlbumTitle('');
      setArtist('');
      setDescription('');
      setMusicFiles([]);
  
    } catch (error) {
      console.error('Error uploading music:', error.message);
      setError('Error uploading music. Please try again.');
    }
  };
  

  const validateForm = () => {
    if (!albumTitle.trim()) {
      setError('Please enter the album title.');
      return false;
    }
    if (!musicFiles.length) {
      setError('Please select at least one music file.');
      return false;
    }
    if (!coverFile) {
      setError('Please select a cover image.');
      return false;
    }
    if (!artist.trim()) {
      setError('Please enter the artist name.');
      return false;
    }
    if (!description.trim()) {
      setError('Please enter the music description.');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <Container>
      <Row className="justify-content-center font">
        <Col md={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formAlbumTitle">
              <Form.Label>Album Title</Form.Label>
              <Form.Control type="text" placeholder="Enter album title" value={albumTitle} onChange={handleTitleChange} />
            </Form.Group>
            <Form.Group controlId="formMusicFiles">
              <Form.Label>Music Files</Form.Label>
              <div {...getRootProps({ className: 'dropzone' })} className="dashed-outline">
                <FontAwesomeIcon icon={faUpload} style={{ height: '60px', marginBottom: '15px'}}/>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some music files here, or click to select files</p>
              </div>
              <ul style={{ margin: '0px', padding: '0px' }}>
                {musicFiles.map((file, index) => (
                  <li key={index} className="music-file-preview" style={{ width: '100%' }}>
                    <MusicPlayer1 file={file} />
                    <div className="music-file-details">
                      <div className="music-file-info">
                        <span className="music-file-name">{file.path}</span>
                        <span className="music-file-size"> - {file.size} bytes</span>
                      </div>
                      <Form.Group controlId={`formGenre${index}`} className="mb-0">
                        <Form.Control as="select" onChange={e => handleGenreChange(e, index)} value={genres[index] || ''}>
                          <option value="rock">Rock</option>
                          <option value="pop">Pop</option>
                          <option value="jazz">Jazz</option>
                          <option value="hiphop">Hip Hop</option>
                          <option value="classical">Classical</option>
                          <option value="electronic">Electronic</option>
                          <option value="blues">Blues</option>
                          <option value="reggae">Reggae</option>
                          {/* Add more genre options here */}
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="music-file-buttons">
                      
                      <Button className="preview-button" onClick={() => handleDeleteMusic(index)} style={{backgroundColor:'transparent' }}><FontAwesomeIcon icon={faCircleXmark} style={{ color: 'red' }} /></Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Form.Group>
            <Form.Group controlId="formCover">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control type="file" name="cover" onChange={handleFileChange} />
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
            {uploadedMusicUrl && <Alert variant="success">Music uploaded successfully. <Link to="/ArtistDashboard1">View My Music</Link></Alert>}
          </Form>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Music uploaded successfully!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

    </Container>
  );
};

export default ArtistDashboard;
