import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadArtistAlbum = () => { 
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [songs, setSongs] = useState([]);

  const onDropCoverPhoto = useCallback((acceptedFiles) => {
    setCoverPhoto(acceptedFiles[0]);
  }, []);

  const onDropSongs = useCallback((acceptedFiles) => {
    setSongs([...songs, ...acceptedFiles]);
  }, [songs]);

  const { getRootProps: getRootPropsCoverPhoto, getInputProps: getInputPropsCoverPhoto } = useDropzone({
    onDrop: onDropCoverPhoto,
    accept: 'image/*',
    multiple: false,
  });

  const { getRootProps: getRootPropsSongs, getInputProps: getInputPropsSongs } = useDropzone({
    onDrop: onDropSongs,
    accept: 'audio/*',
    multiple: true,
  });

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('coverPhoto', coverPhoto);
    songs.forEach((song) => {
        formData.append('songs[]', song);
    });

    try {
        const response = await fetch('http://your-backend-url/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        console.log('Upload successful:', data);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
};


  return (
    <div>
      <div>New Page</div>
      <div {...getRootPropsCoverPhoto()}>
        <input {...getInputPropsCoverPhoto()} />
        <p>Drag 'n' drop the cover photo here, or click to select a file</p>
      </div>

      <div {...getRootPropsSongs()}>
        <input {...getInputPropsSongs()} />
        <p>Drag 'n' drop songs here, or click to select files</p>
        {songs.map((song, index) => (
          <div key={index}>{song.name}</div>
        ))}
      </div>

      <button onClick={handleUpload}>Preview</button>
    </div>
  );
};

export default UploadArtistAlbum;