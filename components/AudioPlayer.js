import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const AudioContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #1A1A1A;
  padding: 10px;
  border-radius: 10px;
  z-index: 1000;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  margin: 0 5px;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const VolumeControl = styled.input`
  width: 100px;
  margin-left: 10px;
`;

const SongInfo = styled.div`
  font-size: 12px;
  color: #ccc;
  margin-top: 5px;
`;

const AudioPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Laden der Songs aus dem Audios-Ordner
    setSongs([
      { name: 'Song 1', file: '/audios/song1.mp3' },
      { name: 'Song 2', file: '/audios/song2.mp3' },
      // Weitere Songs
    ]);
  }, []);
  
  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const skipNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  
  const skipPrev = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  
  const changeVolume = (e) => {
    audioRef.current.volume = e.target.value;
  };
  
  return (
    <AudioContainer>
      <Controls>
        <ControlButton onClick={skipPrev}>⏮</ControlButton>
        <ControlButton onClick={playPause}>{isPlaying ? '⏸' : '▶️'}</ControlButton>
        <ControlButton onClick={skipNext}>⏭</ControlButton>
        <VolumeControl type="range" min="0" max="1" step="0.01" onChange={changeVolume} />
      </Controls>
      <SongInfo>{songs[currentSongIndex]?.name}</SongInfo>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex]?.file}
        onEnded={skipNext}
      />
    </AudioContainer>
  );
};

export default AudioPlayer;
