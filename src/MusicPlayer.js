import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const MusicPlayer = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(musicUrl);

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleAudioError = (error) => {
      console.error('Error loading or playing audio:', error);
    };

    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('error', handleAudioError);

    return () => {
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.removeEventListener('error', handleAudioError);
    };
  }, [musicUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
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
