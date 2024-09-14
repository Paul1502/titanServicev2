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
            // Überprüfen, ob eine vorherige Sitzung gespeichert ist
            if (sessionStorage.getItem('currentSongIndex')) {
                currentSongIndex = parseInt(sessionStorage.getItem('currentSongIndex'));
            }
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
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
            saveAudioState();
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
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
    saveAudioState();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + audioFiles.length) % audioFiles.length;
    audio.src = 'audios/' + audioFiles[currentSongIndex];
    songInfo.textContent = getSongName(audioFiles[currentSongIndex]);
    updateActiveSong();
    if (isPlaying) {
        audio.play();
    }
    saveAudioState();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
    audio.src = 'audios/' + audioFiles[currentSongIndex];
    songInfo.textContent = getSongName(audioFiles[currentSongIndex]);
    updateActiveSong();
    if (isPlaying) {
        audio.play();
    }
    saveAudioState();
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    saveAudioState();
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

// Speichern des Audio-Status in der Sitzung
function saveAudioState() {
    sessionStorage.setItem('currentSongIndex', currentSongIndex);
    sessionStorage.setItem('isPlaying', isPlaying);
    sessionStorage.setItem('volume', audio.volume);
    sessionStorage.setItem('currentTime', audio.currentTime);
}

// Wiederherstellen des Audio-Status beim Laden der Seite
window.addEventListener('load', () => {
    if (sessionStorage.getItem('currentSongIndex')) {
        currentSongIndex = parseInt(sessionStorage.getItem('currentSongIndex'));
        audio.src = 'audios/' + audioFiles[currentSongIndex];
        songInfo.textContent = getSongName(audioFiles[currentSongIndex]);
        updateActiveSong();
        audio.currentTime = parseFloat(sessionStorage.getItem('currentTime')) || 0;
        audio.volume = parseFloat(sessionStorage.getItem('volume')) || 0.5;

        if (sessionStorage.getItem('isPlaying') === 'true') {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
            if (!audioContext) {
                setupAudioVisualizer();
            }
        }
    }
});

// Hintergrund-Effekte verbessern
function initializeBackgroundEffects(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 5000; // Erhöhte Partikeldichte

    const mouse = {
        x: null,
        y: null,
        radius: 100 // Reduzierter Radius für kleinere Barriere
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    function Particle(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    Particle.prototype.update = function() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    };

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 1;
            let x = (Math.random() * (canvas.width - size * 2)) + size * 2;
            let y = (Math.random() * (canvas.height - size * 2)) + size * 2;
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = 'rgba(102, 252, 241, 0.5)';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    init();
    animate();
}

// Initialisieren Sie die Hintergrund-Canvas je nach Seite
const heroCanvas = document.getElementById('hero-canvas');
const produkteCanvas = document.getElementById('produkte-canvas');
const kontaktCanvas = document.getElementById('kontakt-canvas');

if (heroCanvas) {
    initializeBackgroundEffects(heroCanvas);
}

if (produkteCanvas) {
    initializeBackgroundEffects(produkteCanvas);
}

if (kontaktCanvas) {
    initializeBackgroundEffects(kontaktCanvas);
}
