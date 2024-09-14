import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AudioContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(10, 10, 10, 0.8);
  padding: 15px;
  border-radius: 10px;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  margin: 0 10px;
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
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-top: 5px;
  text-align: center;
`;

const Visualizer = styled.canvas`
  width: 100%;
  height: 50px;
  margin-top: 10px;
`;

const AudioPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // Laden der Songs aus dem Audios-Ordner
    setSongs([
      { name: 'Song 1', file: '/audios/song1.mp3' },
      { name: 'Song 2', file: '/audios/song2.mp3' },
      // Weitere Songs
    ]);
  }, []);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      if (!audioContext) {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const src = context.createMediaElementSource(audioRef.current);
        const analyser = context.createAnalyser();

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        const renderFrame = () => {
          requestAnimationFrame(renderFrame);

          analyser.getByteFrequencyData(dataArray);

          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, WIDTH, HEIGHT);

          const barWidth = (WIDTH / bufferLength) * 2.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
            ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
          }
        };

        renderFrame();
        setAudioContext(context);
      }
    }
  }, [isPlaying]);

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
        <ControlButton onClick={playPause}>
          {isPlaying ? '⏸' : '▶️'}
        </ControlButton>
        <ControlButton onClick={skipNext}>⏭</ControlButton>
        <VolumeControl
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={changeVolume}
        />
      </Controls>
      <SongInfo>{songs[currentSongIndex]?.name}</SongInfo>
      <Visualizer ref={canvasRef} width="300" height="50" />
      <audio
        ref={audioRef}
        src={songs[currentSongIndex]?.file}
        onEnded={skipNext}
      />
    </AudioContainer>
  );
};

export default AudioPlayer;
