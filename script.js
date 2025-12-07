// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', init);

function init() {
    createCandles();
    createStars();
    createCardParticles();
    animateCounter();
}

// Crear velas dinámicamente
function createCandles() {
    const container = document.getElementById('candlesContainer');
    const numberOfCandles = 5;

    for (let i = 0; i < numberOfCandles; i++) {
        const candle = document.createElement('article');
        candle.className = 'candle';
        candle.onclick = () => blowCandle(candle);

        const body = document.createElement('section');
        body.className = 'candle-body';

        const flame = document.createElement('section');
        flame.className = 'candle-flame';

        body.appendChild(flame);
        candle.appendChild(body);
        container.appendChild(candle);
    }
}

// Apagar vela al hacer clic
let candlesBlown = 0;
function blowCandle(candle) {
    const flame = candle.querySelector('.candle-flame');
    
    // Si la vela está apagada, encenderla de nuevo
    if (flame.classList.contains('blown')) {
        flame.classList.remove('blown');
        candlesBlown--;
        
        // Actualizar mensaje
        const message = document.getElementById('candleMessage');
        if (candlesBlown < 5) {
            message.textContent = '';
        }
    } 
    // Si está encendida, apagarla
    else {
        flame.classList.add('blown');
        candlesBlown++;
        
        // Cuando se apagan todas
        if (candlesBlown === 5) {
            setTimeout(() => {
                const message = document.getElementById('candleMessage');
                message.textContent = '🎉 ¡Pide un deseo! Se hará realidad 🎉';
                message.style.fontSize = '1.1rem';
                launchConfetti();
                
                // Mensaje discreto para volver a encender
                setTimeout(() => {
                    const tip = document.createElement('p');
                    tip.textContent = '💡 Tip: Haz clic en las velas de nuevo para encenderlas';
                    tip.style.cssText = `
                        color: #2a2222ff;
                        font-size: 0.85rem;
                        font-style: italic;
                        margin-top: 8px;
                        opacity: 0;
                        transition: opacity 0.5s;
                    `;
                    message.parentNode.insertBefore(tip, message.nextSibling);
                    
                    // Fade in del tip
                    setTimeout(() => {
                        tip.style.opacity = '1';
                    }, 100);
                    
                    // Remover el tip cuando se vuelva a encender alguna vela
                    const checkCandles = setInterval(() => {
                        if (candlesBlown < 5) {
                            tip.style.opacity = '0';
                            setTimeout(() => tip.remove(), 500);
                            clearInterval(checkCandles);
                        }
                    }, 500);
                }, 1500);
            }, 500);
        }
    }
}

// Lanzar confeti
function launchConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#f093fb', '#4facfe', '#fee140', '#fa709a'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('section');
            confetti.className = 'particle confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Lanzar globos flotantes
function launchBalloons() {
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈'];
    const colors = ['#ff6b9d', '#4facfe', '#fee140', '#fa709a', '#f093fb', '#30cfd0'];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const balloon = document.createElement('section');
            balloon.className = 'particle balloon';
            balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.top = '110vh';
            balloon.style.fontSize = (25 + Math.random() * 25) + 'px';
            balloon.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            balloon.style.animation = 'floatBalloon 4s ease-out forwards';
            
            document.body.appendChild(balloon);
            
            setTimeout(() => balloon.remove(), 4000);
        }, i * 150);
    }
}

// Cantar canción de cumpleaños
function playBirthdaySong() {
    const lyrics = [
        '🎵 Feliz cumpleaños a ti 🎵',
        '🎵 Feliz cumpleaños a ti 🎵',
        '🎵 Feliz cumpleaños a ti 🎵',
        
        '🎉 ¡HIP HIP HURRA! 🎉',
        '🎉 ¡HIP HIP HURRA! 🎉',
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
        if (currentIndex < lyrics.length) {
            showLyric(lyrics[currentIndex]);
            currentIndex++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                launchBalloons();
            }, 500);
        }
    }, 2000);
}

// Mostrar letra de la canción
function showLyric(text) {
    const lyric = document.createElement('section');
    lyric.textContent = text;
    lyric.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: bold;
        color: white;
        text-shadow: 3px 3px 6px rgba(0,0,0,0.7);
        z-index: 2000;
        animation: fadeInOut 2s forwards;
        padding: 20px;
        background: rgba(102, 126, 234, 0.8);
        border-radius: 20px;
        text-align: center;
    `;

    document.body.appendChild(lyric);
    setTimeout(() => lyric.remove(), 2000);
}

// Animar contador de edad
function animateCounter() {
    const counter = document.getElementById('ageCounter');
    let current = 0;
    const target = 22; // Cambia este número por la edad real
    const duration = 2000;
    const increment = target / (duration / 50);

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(interval);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 50);
}

// Voltear tarjetas de deseos
function flipCard(card) {
    card.classList.toggle('flipped');
    
    // Efecto de confeti al revelar
    if (card.classList.contains('flipped')) {
        const colors = ['#f093fb', '#f5576c', '#4facfe'];
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const confetti = document.createElement('section');
                confetti.className = 'particle confetti';
                confetti.style.left = (card.offsetLeft + card.offsetWidth / 2) + 'px';
                confetti.style.top = (card.offsetTop + card.offsetHeight / 2) + 'px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }
}

// Crear estrellas de fondo
function createStars() {
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('section');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(star);
    }
}

// Crear partículas flotantes en el fondo de la tarjeta
function createCardParticles() {
    const container = document.getElementById('cardParticles');
    const particles = ['🌸', '🌺', '🌼', '🌻', '🌷', '🦋', '✨', '💫', '⭐', '🌟'];
    
    // Crear 20 partículas flotantes
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('section');
        
        // Alternar entre flores y partículas brillantes
        if (i % 2 === 0) {
            particle.className = 'flower-particle';
        } else {
            particle.className = 'floating-particle';
        }
        
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        container.appendChild(particle);
    }
}

// Efectos adicionales al mover el mouse
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        createSparkle(e.pageX, e.pageY);
    }
});

// Crear destellos al mover el mouse
function createSparkle(x, y) {
    const sparkles = ['✨', '💫', '⭐'];
    const sparkle = document.createElement('section');
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: fadeInOut 1s forwards;
        z-index: 1000;
        font-size: ${15 + Math.random() * 15}px;
    `;
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

// Easter egg: hacer clic en el título
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.card-header h1');
    if (title) {
        title.addEventListener('click', () => {
            launchConfetti();
            launchBalloons();
            
            // Cambiar colores de fondo temporalmente
            const card = document.querySelector('.birthday-card');
            card.style.transition = 'all 0.5s ease';
            card.style.background = 'linear-gradient(135deg, rgba(255, 192, 203, 0.4), rgba(255, 182, 193, 0.6))';
            
            setTimeout(() => {
                card.style.background = 'linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 240, 245, 0.5))';
            }, 2000);
        });
    }
});

// Animación cuando se hace scroll (si el contenido crece)
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('section');
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                pointer-events: none;
                animation: fadeInOut 1.5s forwards;
                z-index: 1000;
                font-size: 25px;
            `;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }
    }, 100);
});

// Mensaje de consola especial
console.log('%c🎉 ¡Feliz Cumpleaños! 🎂', 'font-size: 30px; color: #f093fb; font-weight: bold;');
console.log('%c✨ Esta es una tarjeta especial hecha con mucho cariño ✨', 'font-size: 16px; color: #667eea;');