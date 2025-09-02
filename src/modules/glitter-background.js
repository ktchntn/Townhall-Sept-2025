
// 90s Glitter Background Component (ES module)

const GLITTER_STYLE_ID = 'glitter-background-styles-v1';

const glitterStyles = `
.glitter-container {
  position: relative;
  overflow: hidden;
}

.glitter-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.glitter-particle {
  position: absolute;
  pointer-events: none;
  font-size: 12px;
  animation: glitterFloat 3s ease-in-out infinite;
  text-shadow: 0 0 4px currentColor, 0 0 8px currentColor;
}

.glitter-particle.sparkle {
  animation: glitterSparkle 2s ease-in-out infinite;
}

.glitter-particle.twinkle {
  animation: glitterTwinkle 1.5s ease-in-out infinite;
}

.glitter-particle.drift {
  animation: glitterDrift 4s linear infinite;
}

.glitter-particle.rain {
  animation: glitterRain 3s linear forwards;
}

@keyframes glitterFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.8;
  }
  25% { 
    transform: translateY(-10px) rotate(90deg) scale(1.2);
    opacity: 1;
  }
  50% { 
    transform: translateY(-5px) rotate(180deg) scale(0.8);
    opacity: 0.6;
  }
  75% { 
    transform: translateY(-15px) rotate(270deg) scale(1.1);
    opacity: 0.9;
  }
}

@keyframes glitterSparkle {
  0%, 100% { 
    opacity: 0.3;
    transform: scale(0.5) rotate(0deg);
    filter: blur(0px);
  }
  50% { 
    opacity: 1;
    transform: scale(1.5) rotate(180deg);
    filter: blur(0.5px);
  }
}

@keyframes glitterTwinkle {
  0%, 100% { 
    opacity: 0.4;
    transform: scale(0.8);
  }
  33% { 
    opacity: 1;
    transform: scale(1.3);
  }
  66% { 
    opacity: 0.2;
    transform: scale(0.6);
  }
}

@keyframes glitterDrift {
  0% { 
    transform: translateX(-20px) translateY(0px) rotate(0deg);
    opacity: 0;
  }
  10% { 
    opacity: 1;
  }
  90% { 
    opacity: 1;
  }
  100% { 
    transform: translateX(calc(100vw + 20px)) translateY(-30px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes glitterRain {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(10px) rotate(45deg);
  }
  90% {
    opacity: 0.8;
    transform: translateY(calc(100vh - 50px)) rotate(270deg);
  }
  100% {
    transform: translateY(calc(100vh + 20px)) rotate(360deg);
    opacity: 0;
  }
}

.glitter-rainbow {
  animation: glitterRainbow 3s linear infinite;
}

@keyframes glitterRainbow {
  0% { color: #ff0033; }
  16% { color: #ff8800; }
  33% { color: #ffff00; }
  50% { color: #00ff00; }
  66% { color: #0088ff; }
  83% { color: #8800ff; }
  100% { color: #ff0033; }
}
`;

function injectGlitterStyles() {
    if (document.getElementById(GLITTER_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = GLITTER_STYLE_ID;
    style.textContent = glitterStyles;
    document.head.appendChild(style);
}

export function createGlitterBackground(options = {}) {
    injectGlitterStyles();

    const {
        target = document.body,
        density = 'medium', // 'light', 'medium', 'heavy', 'extreme'
        colors = ['#ff00c8', '#00ff59', '#ffff00', '#0088ff', '#ff0033'],
        particles = ['✨', '⭐', '💫', '🌟', '✦', '✧', '⋆', '★'],
        enableRainbow = true,
        enableDrift = true, // Enable drift by default since we're focusing on rain
        enableRain = false,   // Rain is disabled by default
        rainIntensity = 1,   // Multiplier for rain intensity
        zIndex = 1
    } = options;

    // Density settings
    const densityMap = {
        light: { count: 15, interval: 3000 },
        medium: { count: 25, interval: 2000 },
        heavy: { count: 40, interval: 1500 },
        extreme: { count: 60, interval: 1000 }
    };

    const config = densityMap[density] || densityMap.medium;

    // Make target container relative if not already positioned
    const targetStyle = window.getComputedStyle(target);
    if (targetStyle.position === 'static') {
        target.style.position = 'relative';
    }

    target.classList.add('glitter-container');

    // Create glitter layer
    const glitterLayer = document.createElement('div');
    glitterLayer.className = 'glitter-layer';
    glitterLayer.style.zIndex = zIndex;
    target.appendChild(glitterLayer);

    let animationId;
    let isActive = true;

    function createParticle() {
        if (!isActive) return;

        const particle = document.createElement('span');
        particle.className = 'glitter-particle';

        // Random particle character
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];

        // Position based on animation type
        if (enableRain) {
            // For rain effect, position horizontally across the top
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '-20px'; // Start slightly above the visible area
            particle.classList.add('rain');
        } else {
            // For non-rain effects, position randomly
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // Apply drift animation if enabled
            if (enableDrift && Math.random() < 0.4) {
                particle.classList.add('drift');
            }
        }

        // Random color or rainbow
        if (enableRainbow && Math.random() < 0.3) {
            particle.classList.add('glitter-rainbow');
        } else {
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        }

        // Add secondary animation for some particles
        if (Math.random() < 0.5) {
            const secondaryAnim = Math.random() < 0.5 ? 'sparkle' : 'twinkle';
            particle.classList.add(secondaryAnim);
        }

        // Random size variation
        const size = 0.8 + Math.random() * 0.6;
        particle.style.fontSize = (12 * size) + 'px';

        // Varied animation speeds
        const duration = 2 + Math.random() * 3; // 2-5 seconds
        particle.style.animationDuration = duration + 's';

        glitterLayer.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration * 1000 + 500); // Add a small buffer to ensure animation completes
    }

    function spawnParticles() {
        if (!isActive) return;

        if (enableRain) {
            // Rain mode: continuous spawning from top
            const initialCount = config.count * rainIntensity;
            for (let i = 0; i < initialCount; i++) {
                setTimeout(() => createParticle(), Math.random() * 1000);
            }

            // Continue spawning at regular intervals
            const spawnInterval = Math.max(50, config.interval / (rainIntensity * 2));

            const spawn = () => {
                if (!isActive) return;
                createParticle();
                setTimeout(spawn, spawnInterval);
            };

            // Start the continuous rain after initial burst
            setTimeout(spawn, 500);
        } else {
            // Standard mode: periodic bursts
            const createBurst = () => {
                if (!isActive) return;

                for (let i = 0; i < config.count; i++) {
                    setTimeout(() => createParticle(), Math.random() * 1000);
                }

                setTimeout(createBurst, config.interval);
            };

            createBurst();
        }
    }
    // Start the glitter effect
    spawnParticles();

    // Public API
    return {
        element: glitterLayer,

        stop() {
            isActive = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        },

        start() {
            if (!isActive) {
                isActive = true;
                spawnParticles();
            }
        },

        destroy() {
            this.stop();
            if (glitterLayer.parentNode) {
                glitterLayer.remove();
            }
            target.classList.remove('glitter-container');
        },

        setDensity(newDensity) {
            if (densityMap[newDensity]) {
                Object.assign(config, densityMap[newDensity]);
            }
        }
    };
}

// Convenience function for full-page glitter
export function enablePageGlitter(options = {}) {
    return createGlitterBackground({
        target: document.body,
        density: 'medium',
        zIndex: -1,
        ...options
    });
}

console.log('90s Glitter Background module loaded successfully');