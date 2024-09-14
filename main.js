// Persist Music Player Across Pages
window.addEventListener("load", () => {
  if (sessionStorage.getItem("isPlaying") === "true") {
    audio.src = sessionStorage.getItem("currentSong");
    audio.currentTime = sessionStorage.getItem("currentTime");
    audio.volume = sessionStorage.getItem("volume");
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
  }
});

// Save music player state when navigating away from the page
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("currentSong", audio.src);
  sessionStorage.setItem("currentTime", audio.currentTime);
  sessionStorage.setItem("isPlaying", isPlaying);
  sessionStorage.setItem("volume", audio.volume);
});

// Parallax Effect for More Dynamic Background
window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  heroContent.style.transform = 'translate(-50%, calc(-50% + ' + scrollPosition * 0.4 + 'px))'; // slower effect
});

// Enhanced Background Effects
function initializeBackgroundEffects(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];
  const numberOfParticles = (canvas.height * canvas.width) / 7000; // Increased particle density

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
      let size = (Math.random() * 5) + 1; // Larger particles for better visibility
      let x = (Math.random() * (canvas.width - size * 2)) + size * 2;
      let y = (Math.random() * (canvas.height - size * 2)) + size * 2;
      let directionX = (Math.random() * 2) - 1;
      let directionY = (Math.random() * 2) - 1;
      let color = 'rgba(102, 252, 241, 0.6)'; // Neon-style particle colors

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
    mouse.radius = (canvas.height / 80) * (canvas.width / 80);
    init();
  });

  init();
  animate();
}

const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas) {
  initializeBackgroundEffects(heroCanvas);
}

const productsCanvas = document.getElementById('products-canvas');
if (productsCanvas) {
  initializeBackgroundEffects(productsCanvas);
}
