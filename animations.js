// Hover-Effekte für Buttons (optional, falls noch nicht in main.js integriert)
const buttons = document.querySelectorAll('.cta-button, .produkt-button');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.classList.add('hovered');
    });
    button.addEventListener('mouseout', () => {
        button.classList.remove('hovered');
    });
});

// Glitch-Effekt bei Hover auf Überschriften (optional, falls noch nicht in main.js integriert)
const glitchHeaders = document.querySelectorAll('.glitch');
glitchHeaders.forEach(header => {
    header.addEventListener('mouseover', () => {
        header.classList.add('glitch-active');
    });
    header.addEventListener('mouseout', () => {
        header.classList.remove('glitch-active');
    });
});

// Weitere Animationen können hier hinzugefügt werden
