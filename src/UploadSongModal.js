/*import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './Artist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const UploadSongModal = ({ showModal, setShowModal, onUpload }) => {
    const [musicFile, setMusicFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setArtist] = useState('');
    const [error, setError] = useState('');

    const handleMusicFileChange = (event) => {
        setMusicFile(event.target.files[0]);
    };

    const handleCoverFileChange = (event) => {
        setCoverFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setArtist(event.target.value);
    };
    const handleCoverFileDrop = (event) => {
        const file = event.dataTransfer.files[0];
        setCoverFile(file);
    };
    

    const handleUpload = async () => {
        try {
            // Validate input fields
            if (!musicFile) {
                setError('Please select a music file.');
                return;
            }

            if (!coverFile) {
                setError('Please select a cover photo.');
                return;
            }

            if (!title.trim()) {
                setError('Please enter a music title.');
                return;
            }

            if (!description.trim()) {
                setError('Please enter an description name.');
                return;
            }

            const musicFormData = new FormData();
            musicFormData.append('music', musicFile);
            musicFormData.append('title', title);
            musicFormData.append('description', description);

            const coverFormData = new FormData();
            coverFormData.append('cover', coverFile);

            const musicResponse = await axios.post('http://localhost:8000/api/music/upload', musicFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const coverResponse = await axios.post('http://localhost:8000/api/cover/upload', coverFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success
            console.log('Music uploaded successfully', musicResponse.data);
            console.log('Cover uploaded successfully', coverResponse.data);
            onUpload({ title, description, musicUrl: musicResponse.data.musicUrl, coverUrl: coverResponse.data.coverUrl });
            setShowModal(false);
        } catch (error) {
            // Handle error
            console.error('Error uploading music:', error.message);
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" className="upload-modal">
                <Modal.Title style={{ borderBottom: 'none', marginLeft: '28px', marginTop: '22px' }}>Upload Song</Modal.Title>
            <Modal.Body>
                <form onSubmit={handleUpload}>
                <div style={{ backgroundColor: 'white', height: '220px', width: '220px', marginLeft: '19px' }}>
                    <div className="form-group" style={{ marginTop: '5px', paddingTop: '70px', paddingLeft: '1px', color: 'black', fontSize: '12px' }}>
                        <div className="custom-file">
                        <div
                            className="custom-file"
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleCoverFileDrop(e);
                            }}
                        >
                            <input
                                type="file"
                                className="custom-file-input"
                                id="coverFile"
                                onChange={handleCoverFileChange}
                                required
                                style={{ display: 'none', marginTop: '25px'}}
                            />
                             <FontAwesomeIcon icon={faUpload}  style={{ marginRight: '5px', fontSize : '30px', marginLeft: '35px'}} />
                            <label className="custom-file-label" htmlFor="coverFile">
                                Upload cover here
                            </label>
                        </div>
                    </div>
                    </div>
                </div>


                    <div style={{marginLeft: '38%', marginTop: '-32%'}}> 
                    <div className="form-group">
                        <label htmlFor="songTitle"></label>
                        <input
                            type="text"
                            className="form-control"
                            id="songTitle"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Song Title"
                            required
                            style={{ borderRadius: '0', border: 'none',}}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="description"></label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Description"
                        required
                        style={{ borderRadius: '0', width: '472px', height: '100px', backgroundColor: 'white', border: 'none', marginTop: '-7px'}}
                    />
                </div>

                    <div style={{backgroundColor: 'white', height: '60px', paddingTop: '1px',paddingLeft: '6px', marginTop: '15px'}}>
                    <div className="form-group mt-3">
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="songFile"
                                onChange={handleMusicFileChange}
                                required
                            />
                            <label className="custom-file-label" style={{color: 'black'}} htmlFor="songFile">
                                Choose music file
                            </label>
                        </div>
                    </div>
                    </div>
                    </div>
                    
                    <Button type="submit" style={{marginTop: '8%',marginLeft: '150px', backgroundColor: 'red', border: 'none', width: '155px', height: '32px',paddingTop: '-5px'}}>
                        Upload
                    </Button>
                    <Button
                    variant="secondary" // Use variant="secondary" for cancel button styling
                    onClick={() => setShowModal(false)} // Add onClick event handler to hide the modal
                    style={{
                        marginTop: '8%',
                        marginLeft: '150px',
                        backgroundColor: 'red',
                        border: 'none',
                        width: '155px',
                        height: '32px',
                        paddingTop: '-5px'
                    }}
                >
                    Cancel
                </Button>

                </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Modal.Body>
        </Modal>
    );
};

export default UploadSongModal;*/

import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const UploadSongModal = ({ showModal, setShowModal, onUpload }) => {
    const [musicFile, setMusicFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        if (name === 'music') {
            setMusicFile(files[0]);
        } else if (name === 'cover') {
            setCoverFile(files[0]);
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleArtistChange = (event) => {
        setArtist(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleUpload = async () => {
        try {
            if (!musicFile || !coverFile || !title.trim() || !artist.trim() || !description.trim()) {
                setError('Please fill in all fields.');
                return;
            }

            const musicFormData = new FormData();
            musicFormData.append('music', musicFile);
            musicFormData.append('cover', coverFile);
            musicFormData.append('title', title);
            musicFormData.append('artist', artist);
            musicFormData.append('description', description);

            const response = await axios.post('http://localhost:8000/api/music/upload', musicFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            

            console.log('Music uploaded successfully', response.data);
            onUpload();
            setShowModal(false);
        } catch (error) {
            console.error('Error uploading music:', error.message);
            setError('Error uploading music. Please try again.');
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Upload Song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Music File</Form.Label>
                        <Form.Control type="file" name="music" onChange={handleFileChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Music Cover</Form.Label>
                        <Form.Control type="file" name="cover" onChange={handleFileChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter music title" value={title} onChange={handleTitleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control type="text" placeholder="Enter music artist" value={artist} onChange={handleArtistChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
                    </Form.Group>
                </Form>
                {error && <Alert variant="danger">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                <Button variant="primary" onClick={handleUpload}>Upload</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UploadSongModal;
