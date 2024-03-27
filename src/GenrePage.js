import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenrePage = ({ genreName }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Fetching songs for genre:', genreName);
    axios.get(`http://localhost:8000/genres/${genreName}/songs`)
      .then(response => {
        console.log('Response:', response.data);
        setSongs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching songs for genre:', error);
        setError(`Error fetching songs for genre ${genreName}. Please try again later.`);
        setLoading(false);
      });
  }, [genreName]);
  
  

  return (
    <div>
      <h1>{genreName} Songs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {songs.map(song => (
            <li key={song.id}>
              <h3>{song.title}</h3>
              <p>Artist: {song.artist}</p>
              <p>Description: {song.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenrePage;
