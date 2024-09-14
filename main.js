// Maus-Verfolger bleibt unverändert
// ...

// Audio Player
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const songInfo = document.getElementById('song-info');
const visualizerCanvas = document.getElementById('audio-visualizer');
const visualizerCtx = visualizerCanvas.getContext('2d');

let audioFiles = []; // Wird später mit den Songnamen gefüllt
let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();

// Laden der JSON-Datei mit den Audiodateien
fetch('audioFiles.json')
    .then(response => response.json())
    .then(data => {
        audioFiles = data;
        if (audioFiles.length > 0) {
            audio.src = 'audios/' + audioFiles[currentSongIndex];
            songInfo.textContent = getSongName(audioFiles[currentSongIndex]);
        } else {
            console.error('Keine Audiodateien gefunden.');
        }
    })
    .catch(error => {
        console.error('Fehler beim Laden der Audiodateien:', error);
    });

// Funktion zum Extrahieren des Songnamens aus dem Dateinamen
function getSongName(filename) {
    return filename.substring(0, filename.lastIndexOf('.'));
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="icon-play"></i>';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="icon-pause"></i>';
        if (!audioContext) {
            setupAudioVisualizer();
        }
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + audioFiles.length) % audioFiles.length;
    audio.src = 'audios/' + audioFiles[currentSongIndex];
    songInfo.textContent = getSongName(audioFiles[currentSongIndex]);
    if (isPlaying) {
        audio.play();
    }
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
    audio.src = 'audios/' + audioFiles[currentSongIndex];
    songInfo.textContent = getSongName(audioFiles[currentSongIndex]);
    if (isPlaying) {
        audio.play();
    }
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Audio Visualizer bleibt unverändert
// ...
