// ArtistDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import MusicPlayer from './MusicPlayer';

const ArtistDashboard = () => {
  const [musicFile, setMusicFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [error, setError] = useState('');
  const [uploadedMusicUrl, setUploadedMusicUrl] = useState('');

  const handleFileChange = (event) => {
    setMusicFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  /*const handleUpload = async () => {
    // Validate input fields
    if (!musicFile) {
      setError('Please select a music file.');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a music title.');
      return;
    }

    if (!artist.trim()) {
      setError('Please enter an artist name.');
      return;
    }

    const formData = new FormData();
    formData.append('music', musicFile);
    formData.append('title', title);
    formData.append('artist', artist);

    try {
      const response = await axios.post('http://localhost:8000/api/music/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success
      console.log('Music uploaded successfully', response.data);
      setUploadedMusicUrl(response.data.musicUrl); // Assuming the response contains the URL of the uploaded music
      setError(''); // Clear any previous error messages
    } catch (error) {
      // Handle error
      console.error('Error uploading music:', error.message);
    }
  };*/

  // In your React component where you handle music upload
const handleUpload = async () => {
  try {
    // Validate input fields
    if (!musicFile) {
      setError('Please select a music file.');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a music title.');
      return;
    }

    if (!artist.trim()) {
      setError('Please enter an artist name.');
      return;
    }

    const formData = new FormData();
    formData.append('music', musicFile);
    formData.append('title', title);
    formData.append('artist', artist);

    const response = await axios.post('http://localhost:8000/api/music/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle success
    console.log('Music uploaded successfully', response.data);
    setUploadedMusicUrl(response.data.musicUrl);
    setError('');
  } catch (error) {
    // Handle error
    console.error('Error uploading music:', error.message);
  }
};

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Enter music title" value={title} onChange={handleTitleChange} />
      <input type="text" placeholder="Enter artist name" value={artist} onChange={handleArtistChange} />
      <button onClick={handleUpload}>Upload Music</button>
      {uploadedMusicUrl && <MusicPlayer musicUrl={uploadedMusicUrl} />}
    </div>
  );
};

export default ArtistDashboard;
