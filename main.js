// Maus-Effekte
document.addEventListener('mousemove', (e) => {
    const trail = document.getElementById('mouse-trail');
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
});

// Hero Section Animation mit Partikeln
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

function Particle(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#66fcf1';
    ctx.fill();
}

Particle.prototype.update = function(){
    if (this.x > canvas.width || this.x < 0){
        this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0){
        this.directionY = -this.directionY;
    }

    // Kollisionsdetektion
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size){
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10){
            this.x += 10;
        }
        if (mouse.x > this.x && this.x > this.size * 10){
            this.x -= 10;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10){
            this.y += 10;
        }
        if (mouse.y > this.y && this.y > this.size * 10){
            this.y -= 10;
        }
    }

    // Bewegung
    this.x += this.directionX;
    this.y += this.directionY;

    // Zeichnen
    this.draw();
}

// Initialisierung
function init(){
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles * 2; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size *2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#66fcf1';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animation
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
    connect();
}

// Linien zwischen Partikeln
function connect(){
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++){
        for (let b = a; b < particlesArray.length; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x)
            * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y)
            * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)){
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(102, 252, 241,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Resize Event
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.width/80));
        init();
    }
);

// Mouse Out Event
window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

canvas.width = innerWidth;
canvas.height = innerHeight;
init();
animate();

// Scroll-Effekte für Produkte
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const products = document.querySelectorAll('.produkt');
products.forEach(product => {
    observer.observe(product);
});

// Audio Player
const audioPlayer = document.getElementById('audio-player');
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

fetch('audios/')
.then(response => response.text())
.then(data => {
    const parser = new DOMParser();
    const html = parser.parseFromString(data, 'text/html');
    const links = html.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if(href.endsWith('.mp3')){
            audioFiles.push(href);
        }
    });
    loadSong(currentSongIndex);
});

function loadSong(index){
    audio.src = 'audios/' + audioFiles[index];
    songInfo.textContent = audioFiles[index].replace('.mp3', '');
}

playBtn.addEventListener('click', () => {
    if(isPlaying){
        audio.pause();
        playBtn.textContent = '▶️';
    } else {
        audio.play();
        playBtn.textContent = '⏸';
        if(!audioContext){
            setupAudioVisualizer();
        }
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + audioFiles.length) % audioFiles.length;
    loadSong(currentSongIndex);
    if(isPlaying){
        audio.play();
    }
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
    loadSong(currentSongIndex);
    if(isPlaying){
        audio.play();
    }
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Audio Visualizer
let audioContext;
let analyser;
let dataArray;
let bufferLength;

function setupAudioVisualizer(){
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    visualizerCanvas.width = 300;
    visualizerCanvas.height = 60;

    animateVisualizer();
}

function animateVisualizer(){
    requestAnimationFrame(animateVisualizer);
    analyser.getByteFrequencyData(dataArray);

    visualizerCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

    const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++){
        barHeight = dataArray[i] / 2;

        visualizerCtx.fillStyle = '#66fcf1';
        visualizerCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}
