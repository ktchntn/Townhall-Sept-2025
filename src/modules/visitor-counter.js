// 90s-Style Visitor Counter Component (ES module)

const STYLE_ID = 'visitor-counter-styles-v1';

const baseStyles = `
/* CSS Custom Properties */
:root {
  --vc-bg1: #000000;
  --vc-bg2: #333333;
  --vc-text: #00ff00;
  --vc-border: #00ff00;
  --vc-shadow: 0 0 0 2px #000, 4px 4px 0 rgba(0, 0, 0, 0.5);
}

/* Main Counter Container */
.vc-container {
  display: inline-block;
  padding: 8px 12px;
  border: 3px ridge var(--vc-border);
  background: linear-gradient(135deg, var(--vc-bg1), var(--vc-bg2));
  box-shadow: var(--vc-shadow);
  font-family: "VT323", "Courier New", monospace;
  color: var(--vc-text);
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 255, 0, 0.7);
  position: relative;
  overflow: hidden;
}

/* Counter Label */
.vc-label {
  font-size: 14px;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Counter Digits Container */
.vc-digits {
  display: flex;
  justify-content: center;
  gap: 2px;
}

/* Individual Counter Digit */
.vc-digit {
  display: inline-block;
  width: 20px;
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.5);
  border: 1px inset #444;
  position: relative;
}

/* Blinking Effect */
.vc-blink {
  animation: vcBlink 1s steps(1) infinite;
}

/* Scan Line Effect */
.vc-container:not(.vc-no-crt)::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  animation: vcScanline 2s linear infinite;
  pointer-events: none;
}

/* Sparkle Effect Elements */
.vc-sparkle-element {
  position: absolute;
  font-size: 14px;
  pointer-events: none;
  z-index: 1;
  animation: vcSparkleAnim 1.5s ease-in-out infinite;
}

.vc-sparkle-top-left {
  top: 2px;
  left: 2px;
  animation-delay: 0s;
}

.vc-sparkle-top-right {
  top: 2px;
  right: 2px;
  animation-delay: 0.4s;
}

.vc-sparkle-bottom-left {
  bottom: 2px;
  left: 2px;
  animation-delay: 0.8s;
}

.vc-sparkle-bottom-right {
  bottom: 2px;
  right: 2px;
  animation-delay: 1.2s;
}

/* Animations */
@keyframes vcBlink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0.5;
  }
}

@keyframes vcScanline {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}

@keyframes vcGlow {
  0%, 100% {
    text-shadow: 0 0 5px var(--vc-text), 0 0 10px var(--vc-text);
  }
  50% {
    text-shadow: 0 0 10px var(--vc-text), 0 0 20px var(--vc-text);
  }
}

@keyframes vcSparkleAnim {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(20deg);
  }
}

/* Theme Variations */
.vc-theme-blue {
  --vc-text: #00ccff;
}

.vc-theme-red {
  --vc-text: #ff3333;
}

.vc-theme-amber {
  --vc-text: #ffcc00;
}

.vc-theme-pink {
  --vc-text: #ff66ff;
}

/* Size Variations */
.vc-size-small .vc-label {
  font-size: 12px;
}
.vc-size-small .vc-digit {
  width: 16px;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
}

.vc-size-large .vc-label {
  font-size: 16px;
}
.vc-size-large .vc-digit {
  width: 24px;
  height: 36px;
  line-height: 36px;
  font-size: 28px;
}

/* Glow Effect */
.vc-glow .vc-digit {
  animation: vcGlow 1.5s ease-in-out infinite;
}

/* Retro LCD Style */
.vc-lcd {
  --vc-bg1: #a5c9a5;
  --vc-bg2: #8fb58f;
  --vc-text: #333333;
  text-shadow: none;
}

.vc-lcd .vc-digit {
  background: #c8e6c8;
  border: 1px solid #666;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
}

/* Preset Styles */
.vc-preset-geocities {
  --vc-bg1: #ff00ff;
  --vc-bg2: #0000ff;
  --vc-text: #ffff00;
  --vc-border: #00ffff;
}

.vc-preset-windows98 {
  --vc-bg1: #c0c0c0;
  --vc-bg2: #a0a0a0;
  --vc-text: #000000;
  --vc-border: #808080;
  text-shadow: 1px 1px 0 #ffffff;
}
`;

/**
 * Injects the required CSS styles for the visitor counter
 */
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = baseStyles;
  document.head.appendChild(style);
}

/**
 * Formats a number with leading zeros
 * @param {number} num - Number to format
 * @param {number} digits - Total number of digits
 * @returns {string} - Formatted number string
 */
function formatWithLeadingZeros(num, digits = 6) {
  return num.toString().padStart(digits, '0');
}

/**
 * Generates a random number within a range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random number
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Creates a 90s-style visitor counter
 * @param {Object} options - Configuration options
 * @returns {Object} - Counter control object with element and methods
 */
export function createVisitorCounter(options = {}) {
  injectStyles();

  const {
    container = document.body,
    label = 'VISITORS',
    startValue = 1,
    digits = 6,
    theme = 'default',
    size = 'medium',
    blinkEffect = true,
    glowEffect = false,
    lcdStyle = false,
    crtEffect = true,
    sparkleEffect = false,
    autoIncrement = false,
    incrementInterval = 60000, // 1 minute
    incrementMin = 1,
    incrementMax = 5,
    onValueChange = null,
    customClass = ''
  } = options;

  // Create counter element
  const counterElement = document.createElement('div');
  counterElement.className = `vc-container vc-theme-${theme} vc-size-${size} ${customClass}`.trim();
  
  if (glowEffect) counterElement.classList.add('vc-glow');
  if (lcdStyle) counterElement.classList.add('vc-lcd');
  if (!crtEffect) counterElement.classList.add('vc-no-crt');
  if (sparkleEffect) counterElement.classList.add('vc-sparkle');

  // Create label element
  const labelElement = document.createElement('div');
  labelElement.className = 'vc-label';
  if (blinkEffect) labelElement.classList.add('vc-blink');
  labelElement.textContent = label;
  counterElement.appendChild(labelElement);

  // Create digits container
  const digitsContainer = document.createElement('div');
  digitsContainer.className = 'vc-digits';
  counterElement.appendChild(digitsContainer);

  // Add sparkle elements if enabled
  if (sparkleEffect) {
    const sparklePositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    sparklePositions.forEach(position => {
      const sparkle = document.createElement('span');
      sparkle.className = `vc-sparkle-element vc-sparkle-${position}`;
      sparkle.innerHTML = '✨';
      counterElement.appendChild(sparkle);
    });
  }

  // Current counter value
  let currentValue = startValue;

  // Update the counter display
  function updateDisplay() {
    const formattedValue = formatWithLeadingZeros(currentValue, digits);
    
    // Clear existing digits
    digitsContainer.innerHTML = '';
    
    // Create individual digit elements
    for (let i = 0; i < formattedValue.length; i++) {
      const digitElement = document.createElement('div');
      digitElement.className = 'vc-digit';
      digitElement.textContent = formattedValue[i];
      digitsContainer.appendChild(digitElement);
    }
  }

  // Initialize display
  updateDisplay();

  // Add to container
  container.appendChild(counterElement);

  // Set up auto increment if enabled
  let incrementTimer = null;
  if (autoIncrement) {
    incrementTimer = setInterval(() => {
      const increment = getRandomNumber(incrementMin, incrementMax);
      setValue(currentValue + increment);
    }, incrementInterval);
  }

  // Set value method
  function setValue(newValue) {
    const oldValue = currentValue;
    currentValue = Math.max(0, parseInt(newValue, 10) || 0);
    updateDisplay();
    
    if (typeof onValueChange === 'function' && oldValue !== currentValue) {
      try {
        onValueChange(currentValue, oldValue);
      } catch (err) {
        console.error('Error in onValueChange callback:', err);
      }
    }
    
    return currentValue;
  }

  // Increment value method
  function increment(amount = 1) {
    return setValue(currentValue + amount);
  }

  // Remove counter method
  function remove() {
    if (incrementTimer) {
      clearInterval(incrementTimer);
    }
    counterElement.remove();
  }

  // Return public API
  return {
    element: counterElement,
    setValue,
    increment,
    getValue: () => currentValue,
    remove
  };
}

/**
 * Creates a convenience function for adding a visitor counter to the page
 * @param {Object} options - Configuration options
 * @returns {Object} - Counter instance
 */
export function addVisitorCounter(options = {}) {
  // Default to a common location if not specified
  const defaultContainer = document.querySelector('.flashy-buttons') || document.body;
  
  return createVisitorCounter({
    container: defaultContainer,
    startValue: getRandomNumber(10000, 99999),
    autoIncrement: true,
    ...options
  });
}

/**
 * Creates a preset "hit counter" style
 * @param {Object} options - Override options
 * @returns {Object} - Counter instance
 */
export function createHitCounter(options = {}) {
  return createVisitorCounter({
    label: 'HITS',
    theme: 'blue',
    lcdStyle: true,
    blinkEffect: false,
    crtEffect: false,
    digits: 8,
    ...options
  });
}

/**
 * Creates a preset "online now" counter
 * @param {Object} options - Override options
 * @returns {Object} - Counter instance
 */
export function createOnlineCounter(options = {}) {
  return createVisitorCounter({
    label: 'ONLINE NOW',
    theme: 'red',
    startValue: getRandomNumber(5, 50),
    digits: 3,
    autoIncrement: true,
    incrementInterval: 5000,
    incrementMin: -2,
    incrementMax: 3,
    ...options
  });
}

console.log('90s Visitor Counter module loaded successfully');