/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AlbumDetailsPage = () => {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams(); // Extract the 'id' parameter from the URL path

  // Define the function to extract filename from path
  const getFileNameFromPath = (filePath) => {
    const parts = filePath.split('/');
    const fileNameWithExtension = parts[parts.length - 1];
    const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
    return fileNameWithoutExtension;
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/albums/${id}`)
      .then(response => {
        const albumData = response.data;
        // Ensure the album data includes the coverUrl property
        if (!albumData.coverUrl) {
          albumData.coverUrl = `http://localhost:8000/${albumData.cover_path}`;
        }
        setAlbum(albumData);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching album details. Please try again later.');
        setLoading(false);
        console.error('Error fetching album details:', error);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!album) {
    return <div>Album not found.</div>;
  }

  return (
    <div>
      <h2>{album.title}</h2>
      <img src={album.coverUrl} alt="Album Cover" style={{ width: '200px', height: '200px' }} />
      <h3>Songs</h3>
      <ul>
        {album.music.map(song => (
          <li key={song.id}>
            <div>
              <p>{getFileNameFromPath(song.file_path)}</p>
            </div>
            <AudioPlayer
              autoPlay={false}
              src={`http://localhost:8000/${song.file_path}`} // Adjust the URL as per your API response
              onPlay={e => console.log("onPlay")}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetailsPage;*/


// Frontend code
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AlbumDetailsPage = () => {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  const getFileNameFromPath = (filePath) => {
    const parts = filePath.split('/');
    const fileNameWithExtension = parts[parts.length - 1];
    const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
    return fileNameWithoutExtension;
  };

  const handleSongNameChange = (event, index) => {
    const newAlbum = { ...album };
    newAlbum.music[index].songName = event.target.value;
    setAlbum(newAlbum);
  };

  const saveChanges = async (index) => {
    try {
      const musicId = album.music[index].id;
      await axios.put(`http://localhost:8000/api/albums/${id}/songs/${musicId}`, {
        song_name: album.music[index].songName
      });
    } catch (error) {
      console.error('Error saving changes:', error);
      setError('Error saving changes. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/albums/${id}`);
        const albumData = response.data;
        if (!albumData.coverUrl) {
          albumData.coverUrl = `http://localhost:8000/${albumData.cover_path}`;
        }
        setAlbum(albumData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching album details. Please try again later.');
        setLoading(false);
        console.error('Error fetching album details:', error);
      }
    };

    fetchAlbum();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!album) {
    return <div>Album not found.</div>;
  }

  return (
    <div>
      <h2>{album.title}</h2>
      <img src={album.coverUrl} alt="Album Cover" style={{ width: '200px', height: '200px' }} />
      <h3>Songs</h3>
      <ul>
        {album.music.map((song, index) => (
          <li key={song.id}>
            <div>
              <input
                type="text"
                value={song.songName ? song.songName : getFileNameFromPath(song.file_path)}
                onChange={(event) => handleSongNameChange(event, index)}
                onBlur={() => saveChanges(index)} // Save changes when the input field loses focus
              />
            </div>
            <AudioPlayer
              autoPlay={false}
              src={`http://localhost:8000/${song.file_path}`}
              onPlay={e => console.log("onPlay")}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetailsPage;
