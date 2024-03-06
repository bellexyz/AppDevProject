/*import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';

const MusicPlayer = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  

  console.log('Music URL:', musicUrl); // Log the musicUrl to the console

  return (
    <div>
      <audio
        ref={audioRef}
        src={musicUrl}
        onError={(e) => console.error('Audio error:', e)}
        onCanPlayThrough={() => console.log('Audio can play through')}
      ></audio>
      <Button onClick={togglePlay} variant="primary">{isPlaying ? 'Pause' : 'Play'}</Button>
    </div>
  );
};

export default MusicPlayer;*/

import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const MusicPlayer = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(musicUrl)); 
  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Button onClick={togglePlay} variant="primary">
      {isPlaying ? 'Pause' : 'Play'}
    </Button>
  );
};

export default MusicPlayer;
