// Maus-Verfolger
document.addEventListener('mousemove', (e) => {
    const trail = document.getElementById('mouse-trail');
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
});

// Audio Player Elemente
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const songInfo = document.getElementById('song-info');
const visualizerCanvas = document.getElementById('audio-visualizer');
const visualizerCtx = visualizerCanvas.getContext('2d');

let audioFiles = [];
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
            createPlaylist();
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

// Playlist erstellen
function createPlaylist() {
    const playlistList = document.getElementById('playlist-list');
    playlistList.innerHTML = ''; // Playlist leeren

    audioFiles.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = getSongName(song);
        listItem.addEventListener('click', () => {
            currentSongIndex = index;
            audio.src = 'audios/' + audioFiles[currentSongIndex];
            songInfo.textContent = getSongName(audioFiles[currentSongIndex]);
            updateActiveSong();
            if (isPlaying) {
                audio.play();
            } else {
                playBtn.click();
            }
        });
        playlistList.appendChild(listItem);
    });

    updateActiveSong();
}

// Aktuellen Song in der Playlist hervorheben
function updateActiveSong() {
    const playlistItems = document.querySelectorAll('#playlist-list li');
    playlistItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSongIndex);
    });
}

// Event Listener für die Steuerung
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
    updateActiveSong();
    if (isPlaying) {
        audio.play();
    }
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
    audio.src = 'audios/' + audioFiles[currentSongIndex];
    songInfo.textContent = getSongName(audioFiles[currentSongIndex]);
    updateActiveSong();
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

// Audio Visualizer Setup
let audioContext;
let analyser;
let dataArray;
let bufferLength;

function setupAudioVisualizer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    visualizerCanvas.width = visualizerCanvas.offsetWidth;
    visualizerCanvas.height = visualizerCanvas.offsetHeight;

    animateVisualizer();
}

function animateVisualizer() {
    requestAnimationFrame(animateVisualizer);
    analyser.getByteFrequencyData(dataArray);

    visualizerCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

    const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 1.5;

        const r = barHeight + (25 * (i / bufferLength));
        const g = 250 * (i / bufferLength);
        const b = 50;

        visualizerCtx.fillStyle = `rgb(${r},${g},${b})`;
        visualizerCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}
