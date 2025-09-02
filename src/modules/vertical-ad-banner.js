// 90s-Style Vertical Ad Banner Component (ES module)

const STYLE_ID = 'vertical-ad-banner-styles-v1';

const baseStyles = `
/* CSS Custom Properties */
:root {
  --vab-z: 99;
  --vab-bg1: #ff00ff;
  --vab-bg2: #00ffff;
  --vab-border: #ffff00;
  --vab-text: #ffffff;
  --vab-shadow: 0 0 0 2px #000, 4px 4px 0 rgba(0, 0, 0, 0.5);
}

/* Main Banner Container */
.vab-container {
  width: 120px;
  border: 3px ridge var(--vab-border);
  background: linear-gradient(135deg, var(--vab-bg1), var(--vab-bg2));
  box-shadow: var(--vab-shadow);
  z-index: var(--vab-z);
  font-family: "Comic Sans MS", "Comic Neue", cursive;
  color: var(--vab-text);
  text-align: center;
  padding: 10px 5px;
  text-shadow: 2px 2px 0 #000;
}

.vab-container.vab-left {
  left: 10px;
}

.vab-container.vab-right {
  right: 10px;
}

/* Banner Header */
.vab-header {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  text-transform: uppercase;
  animation: vabBlink 800ms steps(1) infinite;
}

/* Banner Image */
.vab-image {
  width: 95%;
  margin: 5px 0;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px #000;
}

/* Banner Text */
.vab-text {
  font-size: 14px;
  margin: 10px 0;
  line-height: 1.2;
}

/* Banner Button */
.vab-button {
  background: linear-gradient(to bottom, #ff0, #fa0);
  border: 3px outset #ffd700;
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  padding: 5px 10px;
  margin: 5px 0;
  cursor: pointer;
  font-size: 12px;
  display: block;
  width: 100%;
  animation: vabPulse 1.5s infinite;
}

.vab-button:active {
  border-style: inset;
}

/* Banner Counter */
.vab-counter {
  font-size: 10px;
  margin-top: 10px;
  color: #fff;
  background: #000;
  padding: 3px;
  border-radius: 3px;
}

/* Banner Close Button */
.vab-close {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff0000;
  color: #fff;
  border: 1px solid #fff;
  width: 16px;
  height: 16px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  cursor: pointer;
  font-family: Arial, sans-serif;
}

/* Animations */
@keyframes vabBlink {
  0%, 49% {
    color: var(--vab-text);
  }
  50%, 100% {
    color: #ff0;
  }
}

@keyframes vabPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes vabFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.vab-float {
  animation: vabFloat 2s ease-in-out infinite;
}

/* Sparkle effect */
.vab-sparkle {
  position: relative;
}

.vab-sparkle::before,
.vab-sparkle::after {
  content: "✨";
  position: absolute;
  font-size: 12px;
  animation: vabSparkle 1.5s infinite alternate;
}

.vab-sparkle::before {
  left: -15px;
  top: 0;
  animation-delay: 0s;
}

.vab-sparkle::after {
  right: -15px;
  top: 0;
  animation-delay: 0.5s;
}

@keyframes vabSparkle {
  0% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1.2);
  }
}
`;

/**
 * Injects the banner styles into the document head
 */
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = baseStyles;
  document.head.appendChild(style);
}

/**
 * Creates a 90s-style vertical ad banner
 * @param {Object} options - Configuration options
 * @returns {Object} - Banner control object with element and close method
 */
export function createVerticalAdBanner(options = {}) {
  injectStyles();

  const {
    position = 'right',
    header = 'HOT DEAL!',
    imageSrc = '/assets/amazing_free_stuff.gif',
    imageAlt = '90s Advertisement',
    text = 'Click NOW for your FREE download!',
    buttonText = 'Download',
    counterStart = 9999,
    counterEnd = 1,
    counterSpeed = 100,
    onButtonClick = () => alert('You clicked a 90s ad! Your computer is now infected with 37 viruses.'),
    onClose = null,
    floatingEffect = true,
    sparkleEffect = true,
    customClass = '' // New option for custom CSS class
  } = options;

  // Create banner element
  const banner = document.createElement('div');
  banner.className = `vab-container vab-${position} ${customClass}`.trim();
  banner.setAttribute('role', 'complementary');
  banner.setAttribute('aria-label', '90s Advertisement');

  // Set banner content
  banner.innerHTML = `
    <button class="vab-close" aria-label="Close advertisement">X</button>
    <div class="vab-header ${sparkleEffect ? 'vab-sparkle' : ''}">${header}</div>
    <img src="${imageSrc}" alt="${imageAlt}" class="vab-image ${floatingEffect ? 'vab-float' : ''}">
    <div class="vab-text">${text}</div>
    <button class="vab-button">${buttonText}</button>
    <div class="vab-counter">Visitors: <span id="vab-counter-value">${counterStart}</span></div>
  `;

  // Add to DOM
  document.body.appendChild(banner);

  // Setup counter animation
  let counterValue = counterStart;
  const counterElement = banner.querySelector('#vab-counter-value');
  const counterInterval = setInterval(() => {
    counterValue = Math.max(counterEnd, counterValue - Math.ceil(Math.random() * 10));
    counterElement.textContent = counterValue;
    if (counterValue <= counterEnd) {
      clearInterval(counterInterval);
    }
  }, counterSpeed);

  // Close function
  function close() {
    clearInterval(counterInterval);
    banner.remove();
    if (typeof onClose === 'function') {
      try {
        onClose();
      } catch (err) {
        console.error('Error in onClose callback:', err);
      }
    }
  }

  // Button handlers
  const closeButton = banner.querySelector('.vab-close');
  closeButton.addEventListener('click', close);

  const actionButton = banner.querySelector('.vab-button');
  actionButton.addEventListener('click', () => {
    try {
      onButtonClick();
    } catch (err) {
      console.error('Error in onButtonClick callback:', err);
    }
  });

  // Return public API
  return {
    element: banner,
    close
  };
}

console.log('90s Vertical Ad Banner module loaded successfully');