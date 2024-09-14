// Import von Three.js
// (Falls Sie ein Modul-Bundler wie Webpack verwenden, ansonsten verwenden Sie das in index.html eingebundene Three.js)

// WebGL-Hintergrund mit animierten Partikeln
const canvas = document.getElementById('webgl-background');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Partikel-Setup
const particlesCount = 10000;
const positions = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++){
    positions[i] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Shader-Material für Partikel
const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 0.02
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation
function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

animate();

// Anpassung der Canvas-Größe bei Fensteränderung
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// GSAP Animationen
gsap.from("#logo", {
    opacity: 0,
    y: -50,
    duration: 2,
    ease: "power2.out"
});

gsap.from("nav ul li", {
    opacity: 0,
    y: -20,
    duration: 1,
    delay: 1,
    stagger: 0.2,
    ease: "power2.out"
});

gsap.from(".about, .products, .contact", {
    scrollTrigger: {
        trigger: ".about, .products, .contact",
        start: "top 80%",
        toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
});

// Audio Steuerung
const audioControl = document.getElementById('audio-control');
const audio = new Audio('assets/audio/background-music.mp3');
audio.loop = true;
let audioPlaying = false;

audioControl.addEventListener('click', () => {
    if (audioPlaying) {
        audio.pause();
        audioControl.innerHTML = '<img src="assets/images/sound-off.png" alt="Audio Control" class="w-12 h-12">';
    } else {
        audio.play();
        audioControl.innerHTML = '<img src="assets/images/sound-on.png" alt="Audio Control" class="w-12 h-12">';
    }
    audioPlaying = !audioPlaying;
});

// Hover Soundeffekt
const buttons = document.querySelectorAll('a, button, .discord-button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        const hoverSound = new Audio('assets/audio/hover-sound.mp3');
        hoverSound.play();
    });
});
