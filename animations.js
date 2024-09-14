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
const produkteCanvas = document.getElementById('produkte-canvas');
const kontaktCanvas = document.getElementById('kontakt-canvas');

if (produkteCanvas || kontaktCanvas) {
    // Initialisiere Partikel oder andere Effekte für den jeweiligen Canvas
    // Hier können Sie zusätzliche Animationen für die Hintergründe hinzufügen
}
