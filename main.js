// Maus-Verfolger
document.addEventListener('mousemove', (e) => {
    const trail = document.getElementById('mouse-trail');
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
});

// Hero Section Animation mit langsameren Partikeln
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 120
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

function Particle(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX * 0.3;
    this.directionY = directionY * 0.3;
    this.size = size;
    this.color = color;
}

Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
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
    for (let i = 0; i < numberOfParticles * 1.5; i++){
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size *2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
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
            if (distance < (canvas.width/10) * (canvas.height/10)){
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

// Scroll-Effekte für Elemente
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

const elements = document.querySelectorAll('.produkt, .content, .kontakt-item');
elements.forEach(element => {
    observer.observe(element);
});

// Smooth Scroll für interne Links
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href');
        document.querySelector(targetID).scrollIntoView({
            behavior: 'smooth'
        });
    });
}
