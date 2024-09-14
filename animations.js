// Zusätzliche Animationen mit GSAP

// Parallax-Effekt für Hero Section
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = 'translate(-50%, calc(-50% + ' + scrollPosition * 0.5 + 'px))';
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
