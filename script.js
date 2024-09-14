// Partikeleffekt Initialisierung
particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js geladen');
});

// GSAP Animationen für die Produktsektion
gsap.registerPlugin(ScrollTrigger);

gsap.from(".product", {
    scrollTrigger: {
        trigger: ".product",
        start: "top 80%",
        toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    stagger: 0.3,
    duration: 1,
});

gsap.from(".about, .contact", {
    scrollTrigger: {
        trigger: ".about, .contact",
        start: "top 80%",
        toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
});

// Audio Steuerung
const audio = document.getElementById('background-audio');
const audioControl = document.createElement('div');
audioControl.id = 'audio-control';
audioControl.innerHTML = '<img src="images/sound-on.png" alt="Audio Control">';
document.body.appendChild(audioControl);

let audioPlaying = false;

audioControl.addEventListener('click', () => {
    if (audioPlaying) {
        audio.pause();
        audioControl.innerHTML = '<img src="images/sound-off.png" alt="Audio Control">';
    } else {
        audio.play();
        audioControl.innerHTML = '<img src="images/sound-on.png" alt="Audio Control">';
    }
    audioPlaying = !audioPlaying;
});

// Responsivität für Audio Control
window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
        audioControl.style.bottom = '10px';
        audioControl.style.right = '10px';
    } else {
        audioControl.style.bottom = '20px';
        audioControl.style.right = '20px';
    }
});
