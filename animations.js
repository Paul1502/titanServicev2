// Parallax-Effekt für Hero Section
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = 'translate(-50%, calc(-50% + ' + scrollPosition * 0.5 + 'px))';
});

// Hover-Effekte für Buttons
const buttons = document.querySelectorAll('.cta-button, .produkt-button');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.classList.add('hovered');
    });
    button.addEventListener('mouseout', () => {
        button.classList.remove('hovered');
    });
});

// Glitch-Effekt bei Hover auf Überschriften
const glitchHeaders = document.querySelectorAll('.glitch');
glitchHeaders.forEach(header => {
    header.addEventListener('mouseover', () => {
        header.classList.add('glitch-active');
    });
    header.addEventListener('mouseout', () => {
        header.classList.remove('glitch-active');
    });
});

// Hintergrundanimationen initialisieren
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

// Funktion zur Initialisierung der Hintergrundanimation
function initializeBackgroundEffects(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 9000;

    const mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 80) * (canvas.width / 80)
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
        this.directionX = directionX * 0.3;
        this.directionY = directionY * 0.3;
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

        // Kollisionsdetektion
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

        // Bewegung
        this.x += this.directionX;
        this.y += this.directionY;

        // Zeichnen
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
            let color = '#66fcf1';

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

    // Resize Event
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse.radius = (canvas.height / 80) * (canvas.width / 80);
        init();
    });

    init();
    animate();
}
