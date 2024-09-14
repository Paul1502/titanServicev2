// Matrix-Hintergrund
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アカサタナハマヤラワ';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

// Anpassung der Canvas-Größe bei Fensteränderung
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// GSAP Animationen
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.logo', {
    duration: 2,
    opacity: 0,
    scale: 0.5,
    ease: 'elastic.out(1, 0.5)'
});

// Sections Animation
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power2.out'
    });
});

// Service Cards Animation
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services-container',
        start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: 'power2.out'
});

// Navigation Links Hover Effekt
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('mouseover', () => {
        gsap.to(link, { duration: 0.3, color: '#ffffff' });
    });
    link.addEventListener('mouseout', () => {
        gsap.to(link, { duration: 0.3, color: '#00ff00' });
    });
});

// Service Cards Hover Effekt
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        gsap.to(card, { duration: 0.3, scale: 1.05 });
    });
    card.addEventListener('mouseout', () => {
        gsap.to(card, { duration: 0.3, scale: 1 });
    });
});
