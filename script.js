// Particles.js Konfiguration
particlesJS('animated-bg', {
  "particles": {
    "number": {
      "value": 150
    },
    "color": {
      "value": "#00ff00"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.7,
      "random": true
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 100,
      "color": "#00ff00",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": true,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": ["grab", "bubble"]
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    }
  }
});

// GSAP Animationen
gsap.registerPlugin(ScrollTrigger);

// Logo Animation
gsap.from(".logo", {
    opacity: 0,
    duration: 1.5,
    y: -100,
    ease: "bounce.out"
});

// Sections Fade-in beim Scrollen
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
});

// Produkte Animation
gsap.from('.product', {
    scrollTrigger: {
        trigger: '.product',
        start: 'top 85%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3
});

// Audio Control
const audioControl = document.getElementById('audio-control');
const audioIcon = audioControl.querySelector('i');
const audio = new Audio('audio/background-music.mp3');
audio.loop = true;
let audioPlaying = false;

audioControl.addEventListener('click', () => {
    if (audioPlaying) {
        audio.pause();
        audioIcon.classList.remove('fa-volume-up');
        audioIcon.classList.add('fa-volume-mute');
    } else {
        audio.play();
        audioIcon.classList.remove('fa-volume-mute');
        audioIcon.classList.add('fa-volume-up');
    }
    audioPlaying = !audioPlaying;
});

// Hover Soundeffekt
document.querySelectorAll('a, button, .discord-button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const hoverSound = new Audio('audio/hover-sound.mp3');
        hoverSound.play();
    });
});
