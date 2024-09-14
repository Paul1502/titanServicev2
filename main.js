// main.js

// Sicherstellen, dass der DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {

    // --- Persistenter Audio Player ---
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
    audio.crossOrigin = "anonymous"; // Für Audio-Visualisierung

    // Audio Context für Visualizer
    let audioContext;
    let analyser;
    let dataArray;
    let bufferLength;

    // Funktion zum Extrahieren des Songnamens
    function getSongName(filename) {
        return filename.substring(0, filename.lastIndexOf('.'));
    }

    // Funktion zum Erstellen der Playlist
    function createPlaylist() {
        const playlistList = document.getElementById('playlist-list');
        playlistList.innerHTML = ''; // Bestehende Playlist leeren

        audioFiles.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = getSongName(song);
            listItem.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong();
                playAudio();
            });
            playlistList.appendChild(listItem);
        });

        updateActiveSong();
    }

    // Funktion zum Aktualisieren des aktiven Songs in der Playlist
    function updateActiveSong() {
        const playlistItems = document.querySelectorAll('#playlist-list li');
        playlistItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSongIndex);
        });
    }

    // Funktion zum Laden des aktuellen Songs
    function loadSong() {
        if (audioFiles.length > 0) {
            audio.src = 'audios/' + audioFiles[currentSongIndex];
            songInfo.textContent = getSongName(audioFiles[currentSongIndex]);
            updateActiveSong();
            // Aktuellen Song in sessionStorage speichern
            sessionStorage.setItem('currentSong', audio.src);
            sessionStorage.setItem('currentSongIndex', currentSongIndex);
        }
    }

    // Funktion zum Abspielen des Audios
    function playAudio() {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
        sessionStorage.setItem('isPlaying', 'true');
    }

    // Funktion zum Pausieren des Audios
    function pauseAudio() {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
        sessionStorage.setItem('isPlaying', 'false');
    }

    // Funktion zur Einrichtung des Audio-Visualizers
    function setupAudioVisualizer() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        visualizerCanvas.width = visualizerCanvas.offsetWidth;
        visualizerCanvas.height = visualizerCanvas.offsetHeight;

        animateVisualizer();
    }

    // Funktion zur Animation des Visualizers
    function animateVisualizer() {
        requestAnimationFrame(animateVisualizer);
        analyser.getByteFrequencyData(dataArray);

        visualizerCtx.fillStyle = '#0b0c10';
        visualizerCtx.fillRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

        const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            const r = barHeight + (25 * (i / bufferLength));
            const g = 250 * (i / bufferLength);
            const b = 50;

            visualizerCtx.fillStyle = `rgb(${r},${g},${b})`;
            visualizerCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    // Event Listener für Audio-Steuerung
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
            if (!audioContext) {
                setupAudioVisualizer();
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + audioFiles.length) % audioFiles.length;
        loadSong();
        playAudio();
    });

    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
        loadSong();
        playAudio();
    });

    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
        sessionStorage.setItem('volume', audio.volume);
    });

    // Beim Ende eines Songs den nächsten abspielen
    audio.addEventListener('ended', () => {
        nextBtn.click();
    });

    // Laden der Audio-Dateien aus JSON
    fetch('audioFiles.json')
        .then(response => response.json())
        .then(data => {
            audioFiles = data;
            // Überprüfen, ob ein Song in sessionStorage gespeichert ist
            const storedSong = sessionStorage.getItem('currentSong');
            const storedIndex = sessionStorage.getItem('currentSongIndex');
            const storedVolume = sessionStorage.getItem('volume');
            const storedIsPlaying = sessionStorage.getItem('isPlaying');

            if (storedSong && audioFiles.includes(storedSong.replace('audios/', ''))) {
                currentSongIndex = audioFiles.indexOf(storedSong.replace('audios/', ''));
                loadSong();
                if (storedVolume) {
                    audio.volume = storedVolume;
                    volumeSlider.value = storedVolume;
                }
                if (storedIsPlaying === 'true') {
                    playAudio();
                }
            } else {
                loadSong();
            }

            createPlaylist();
        })
        .catch(error => {
            console.error('Fehler beim Laden der Audiodateien:', error);
        });

    // --- Verbesserte Hintergrund-Animation ---
    // Verbesserte Partikelsystem mit kleinerem Interaktionsradius und besserer Ästhetik
    function initializeBackgroundEffects(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const numberOfParticles = (canvas.height * canvas.width) / 8000; // Dichte anpassen

        const mouse = {
            x: null,
            y: null,
            radius: (canvas.height / 150) * (canvas.width / 150) // Kleinerer Radius
        };

        window.addEventListener('mousemove', function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', function() {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // An den Rändern abprallen
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Bewegung der Partikel
                this.x += this.directionX;
                this.y += this.directionY;

                // Kollisionsdetektion mit der Maus
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                        this.x += 3;
                    }
                    if (mouse.x > this.x && this.x > this.size * 10) {
                        this.x -= 3;
                    }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                        this.y += 3;
                    }
                    if (mouse.y > this.y && this.y > this.size * 10) {
                        this.y -= 3;
                    }
                }

                this.draw();
            }
        }

        // Initialisieren der Partikel
        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * (canvas.width - size * 2)) + size * 2;
                let y = (Math.random() * (canvas.height - size * 2)) + size * 2;
                let directionX = (Math.random() * 1.5) - 0.75;
                let directionY = (Math.random() * 1.5) - 0.75;
                let color = 'rgba(102, 252, 241, 0.7)'; // Neon-Farbe

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Animation der Partikel
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesArray.forEach(particle => particle.update());
        }

        // Resize-Event
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mouse.radius = (canvas.height / 150) * (canvas.width / 150);
            init();
        });

        init();
        animate();
    }

    // Initialisieren der Hintergrund-Canvas je nach Seite
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        initializeBackgroundEffects(heroCanvas);
    }

    const produkteCanvas = document.getElementById('produkte-canvas');
    if (produkteCanvas) {
        initializeBackgroundEffects(produkteCanvas);
    }

    const kontaktCanvas = document.getElementById('kontakt-canvas');
    if (kontaktCanvas) {
        initializeBackgroundEffects(kontaktCanvas);
    }

});
