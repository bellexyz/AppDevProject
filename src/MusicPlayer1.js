import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const MusicPlayer = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(URL.createObjectURL(file)));

  const togglePlay = (event) => {
    event.preventDefault();
    const audio = audioRef.current;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <Button onClick={togglePlay} style={{borderRadius: '50px' }}>
        {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
      </Button>
    </div>
  );
};

export default MusicPlayer;
