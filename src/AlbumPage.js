import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch album data from the backend API
    axios.get('http://localhost:8000/api/albums')
      .then(response => {
        setAlbums(response.data); // Set the fetched album data in state
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching albums. Please try again later.');
        setLoading(false);
        console.error('Error fetching albums:', error.message);
      });
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {albums.map(album => (
            <li key={album.id}>
              <h3>{album.title}</h3>
              <img src={album.coverUrl} alt={album.title} style={{ width: '200px' }} />
              <ul>
                {album.music.map(music => (
                  <li key={music.id}>{music.title} - {music.artist}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumPage;
