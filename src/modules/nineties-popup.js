// nineties-popup.js (ES module)
import { clamp, makeDraggable } from './utils';

const STYLE_ID = 'nineties-popup-styles-v1';

const baseStyles = `
/* CSS Custom Properties */
:root {
  --np-z: 999999;
  --np-bg1: #ffe97a;
  --np-bg2: #ffcc00;
  --np-red: #ff0033;
  --np-blue: #0018ff;
  --np-green: #03a100;
  --np-pink: #ff00c8;
  --np-shadow: 0 0 0 4px #000, 6px 6px 0 rgba(0, 0, 0, 0.35);
}

/* Utility Classes */
.np-hidden {
  display: none !important;
}

.np-focus-sentinel {
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
  left: -9999px;
  top: auto;
}

/* Main Popup Container */
.np-popup {
  position: fixed;
  top: 64px;
  left: 64px;
  width: min(380px, 90vw);
  border: 4px ridge #c0c0c0;
  background: linear-gradient(180deg, var(--np-bg1), var(--np-bg2));
  box-shadow: var(--np-shadow);
  z-index: var(--np-z);
  font-family: "Verdana", "Tahoma", system-ui, sans-serif;
  color: #111;
}

/* Title Bar */
.np-titlebar {
  background: repeating-linear-gradient(45deg, #000 0 6px, #222 6px 12px);
  color: #0f0;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: move;
  user-select: none;
}

.np-title {
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 14px;
  animation: npBlink 700ms steps(1) infinite;
}

.np-controls {
  display: flex;
  gap: 6px;
}

/* Buttons */
.np-btn {
  border: 2px outset #e6e6e6;
  background: #f2f2f2;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
}

.np-btn:active {
  border-style: inset;
}

.np-cta {
  background: linear-gradient(#00ff59, #03a100);
  border: 3px outset #d7ffd7;
  color: #000;
  font-weight: 900;
  text-transform: uppercase;
  padding: 8px 12px;
  cursor: pointer;
  letter-spacing: 0.3px;
  box-shadow: 2px 2px 0 #000;
}

.np-cta:active {
  border-style: inset;
  transform: translate(1px, 1px);
}

/* Popup Body */
.np-body {
  padding: 12px;
  background: repeating-linear-gradient(0deg, #fff 0 18px, #fff6b8 18px 36px);
  position: relative;
  overflow: hidden;
}

/* Animated Background Burst */
.np-burst {
  position: absolute;
  inset: -10px;
  pointer-events: none;
  background:
    radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.6), transparent 40%),
    radial-gradient(circle at 80% 40%, rgba(255, 255, 0, 0.35), transparent 45%),
    radial-gradient(circle at 30% 80%, rgba(255, 0, 170, 0.25), transparent 50%);
  filter: saturate(150%);
  animation: npPulse 1.4s ease-in-out infinite;
}

/* Badge and Glitter */
.np-badge {
  display: inline-block;
  padding: 6px 10px;
  margin: 6px 0 10px;
  border: 3px groove #ff0;
  font-weight: 900;
  font-size: 13px;
  color: #000;
  background: repeating-linear-gradient(90deg, #fffd38, #fffd38 6px, #ffb800 6px, #ffb800 12px);
  box-shadow: 2px 2px 0 #000;
  transform: skew(-6deg);
}

.np-glitter {
  display: inline-block;
  margin-left: 6px;
  font-size: 12px;
  color: var(--np-pink);
  text-shadow: 0 0 4px #fff, 0 0 8px var(--np-pink);
  animation: npSparkle 900ms infinite;
}

/* Hero Section */
.np-hero {
  border: 3px inset #000;
  padding: 10px;
  margin: 8px 0;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.np-hero-emoji {
  font-size: 28px;
  animation: npWobble 1.1s ease-in-out infinite;
}

.np-hero-text {
  font-weight: 800;
  color: var(--np-red);
  text-transform: uppercase;
  line-height: 1.1;
  text-shadow: 2px 2px 0 #fff, 3px 3px 0 #000;
}

/* Content Sections */
.np-offer {
  font-size: 13px;
  margin: 8px 0 12px;
}

.np-list {
  margin: 6px 0 10px 18px;
  font-size: 12px;
}

.np-list li {
  margin: 4px 0;
  list-style: '★ ';
  color: var(--np-blue);
}

.np-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.np-sub {
  font-size: 11px;
  color: #333;
}

/* Scrolling Marquee */
.np-marquee {
  height: 20px;
  margin-top: 10px;
  padding: 6px;
  border: 3px ridge #000;
  background: #ffffe6;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}

.np-marquee span {
  position: absolute;
  left: 100%;
  will-change: transform;
  animation: npScroll 9s linear infinite;
}

/* Animations */
@keyframes npBlink {
  50% {
    color: #fff;
  }
}

@keyframes npPulse {
  50% {
    transform: scale(1.03);
    opacity: 0.7;
  }
}

@keyframes npSparkle {
  50% {
    opacity: 0.35;
    filter: blur(0.3px);
  }
}

@keyframes npWobble {
  50% {
    transform: rotate(-4deg) scale(1.05);
  }
}

@keyframes npScroll {
  to {
    transform: translateX(-200%);
  }
}

/* Trivia Popup Styles */

.tp-popup {
  scale: 1.5;
}
.tp-buttons {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
}

.tp-btn {
  flex-basis: 50%;
  word-break: break-word;
}

.tp-hero-text {
  text-shadow: none;
}

.tp-hero-correct-text{
  text-shadow: none;
  color: #32a852;
}

.tp-actions {
  padding-top: 20px;
  text-align: center;
}

.tp-actions button{
  font-size: 16px;
}
`;

/**
 * Injects required CSS styles if not already present
 */
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = baseStyles;
  document.head.appendChild(style);
}

/**
 * Creates a focus trap within a container
 * @param {HTMLElement} container - Container to trap focus within
 */
function trapFocus(container) {
  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const sentinels = container.querySelectorAll('.np-focus-sentinel');
  const first = sentinels[0], last = sentinels[1];

  const getFocusableElements = () =>
    [...container.querySelectorAll(focusableSelector)]
      .filter(el => !el.disabled && el.offsetParent !== null);

  const cycle = (e, toStart) => {
    e.preventDefault();
    const els = getFocusableElements();
    if (!els.length) return;
    (toStart ? els[0] : els[els.length - 1]).focus();
  };

  first.addEventListener('focus', (e) => cycle(e, true));
  last.addEventListener('focus', (e) => cycle(e, false));
}

/**
 * Creates a bouncing animation for the popup
 * @param {HTMLElement} popup - Element to animate
 * @returns {Function} - Function to stop the animation
 */
function bounceAround(popup) {
  const speed = 0.6 + Math.random() * 0.8;
  let vx = (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 0.6);
  let vy = (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 0.6);
  let last = performance.now();
  let rafId;

  const step = (now) => {
    const dt = now - last;
    last = now;

    const rect = popup.getBoundingClientRect();
    let nx = rect.left + vx * speed * dt;
    let ny = rect.top + vy * speed * dt;

    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    if (nx <= 0 || nx >= maxX) {
      vx *= -1;
      nx = clamp(nx, 0, maxX);
    }

    if (ny <= 0 || ny >= maxY) {
      vy *= -1;
      ny = clamp(ny, 0, maxY);
    }

    popup.style.left = nx + 'px';
    popup.style.top = ny + 'px';
    rafId = requestAnimationFrame(step);
  };

  rafId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(rafId);
}

/**
 * Creates a 90s-style popup
 * @param {Object} options - Configuration options
 * @returns {Object} - Popup control object with element and close method
 */
export function createPopup(options = {}) {
  injectStyles();

  const {
    title = '🔥 AMAZING OFFER 🔥',
    headline = 'CONGRATULATIONS!',
    subhead = 'You are the 1,000,000th visitor!',
    bullets = ['Win a FREE screensaver pack', 'Claim your *exclusive* 10MB of cloud storage', 'Get a custom cursor (sparkles included)'],
    ctaText = 'Click Here to Claim',
    onCta = () => alert('Totally legit: prize "claimed."'),
    onClose = null,
    allowBounce = true,
    autoFocus = true,
    annoyMode = false,
    startPosition = null
  } = options;

  const popup = document.createElement('section');
  popup.className = 'np-popup';
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-modal', 'true');
  popup.setAttribute('aria-label', title);

  popup.innerHTML = `
    <div class="np-focus-sentinel" tabindex="0"></div>
    <div class="np-titlebar">
      <div class="np-title">${title}</div>
      <div class="np-controls">
        <button class="np-btn" data-action="min" aria-label="Minimize">_</button>
        <button class="np-btn" data-action="max" aria-label="Maximize">▢</button>
        <button class="np-btn" data-action="close" aria-label="Close">X</button>
      </div>
    </div>
    <div class="np-body">
      <div class="np-burst np-bling" aria-hidden="true"></div>
      <span class="np-badge">WINNER! <span class="np-glitter">✨</span></span>
      <div class="np-hero">
        <div class="np-hero-emoji">🖱️</div>
        <div class="np-hero-text">
          ${headline}<br><span style="color:#000; font-size:13px; font-weight:700;">${subhead}</span>
        </div>
      </div>
      <div class="np-offer">Before this once-in-a-millennium opportunity self-destructs, act now:</div>
      <ul class="np-list">
        ${bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
      <div class="np-actions">
        <button class="np-cta" data-action="cta">${ctaText}</button>
        <button class="np-btn" data-action="nope">No thanks</button>
        <span class="np-sub">Limited time! 00:${String(Math.floor(Math.random() * 20) + 10).padStart(2, '0')}</span>
      </div>
      <div class="np-marquee"><span class="np-bling">🔥 HOT DEALS 🔥 BEST VIEWED IN NETSCAPE 🔥 CLICK BEFORE YOUR BOSS SEES 🔥</span></div>
    </div>
    <div class="np-focus-sentinel" tabindex="0"></div>
  `;

  document.body.appendChild(popup);

  const rect = popup.getBoundingClientRect();
  const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
  const maxTop = Math.max(8, window.innerHeight - rect.height - 8);

  const left = startPosition?.left ?? clamp(Math.random() * (window.innerWidth - rect.width), 8, maxLeft);
  const top = startPosition?.top ?? clamp(Math.random() * (window.innerHeight - rect.height), 8, maxTop);

  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;


  const titlebar = popup.querySelector('.np-titlebar');
  makeDraggable(popup, titlebar);


  trapFocus(popup);

  if (autoFocus) {
    const firstButton = popup.querySelector('[data-action="cta"]') || popup.querySelector('button');
    firstButton?.focus();
  }


  let stopBounce = null;

  if (allowBounce) {
    stopBounce = bounceAround(popup);

    ['mousedown', 'keydown', 'touchstart'].forEach(evt => {
      popup.addEventListener(evt, () => {
        if (stopBounce) {
          stopBounce();
          stopBounce = null;
        }
      }, { once: true });
    });
  }

  // Close function
  const body = popup.querySelector('.np-body');
  function close() {
    if (stopBounce) stopBounce();
    document.removeEventListener('keydown', onKey);
    popup.remove();
    if (typeof onClose === 'function') {
      try {
        onClose();
      } catch (err) {
        console.error('Error in onClose callback:', err);
      }
    }
  }

  popup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const act = btn.getAttribute('data-action');

    switch (act) {
      case 'close':
        close();
        break;

      case 'min':
        body.classList.toggle('np-hidden');
        break;

      case 'max':
        popup.style.width = popup.style.width ? '' : 'min(520px, 96vw)';
        break;

      case 'cta':
        try {
          onCta?.();
        } catch (err) {
          console.error('Error in onCta callback:', err);
        }
        break;

      case 'nope':
        if (annoyMode) {
          // Spawn a last-chance popup, offset
          createPopup({
            ...options,
            allowBounce: true,
            startPosition: { top: top + 40, left: left + 40 },
            annoyMode: false,
            title: 'WAIT! FINAL WARNING',
            subhead: 'One click away from unimaginable pixel glory.'
          });
        }
        close();
        break;
    }
  });

  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKey);

  // Return public API
  return {
    element: popup,
    close
  };
}

export function createTriviaPopup(options = {}) {
  injectStyles();

  const {
    title = '🔥 TRIVIA TIME!! 🔥',
    onClose = null,
    autoFocus = true,
    startPosition = null,
    triviaQuestion = "What is one plus one",
    answerIndex = 4,
    triviaAnswers = ['one', "two", "three", "four"],
    onCorrect = ()=> alert("CORRECT!")
  } = options;

  const popup = document.createElement('section');
  popup.className = 'np-popup tp-popup';
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-modal', 'true');
  popup.setAttribute('aria-label', title);


  popup.innerHTML = `
    <div class="np-focus-sentinel" tabindex="0"></div>
    <div class="np-titlebar">
      <div class="np-title">${title}</div>
      <div class="np-controls">
        <button class="np-btn" data-action="min" aria-label="Minimize">_</button>
        <button class="np-btn" data-action="max" aria-label="Maximize">▢</button>
        <button class="np-btn" data-action="close" aria-label="Close">X</button>
      </div>
    </div>
    <div class="np-body">
      <div class="np-burst np-bling" aria-hidden="true"></div>
      <span class="np-badge">DO YOU KNOW? <span class="np-glitter">✨</span></span>
      <div class="np-hero">
        <div class="np-hero-emoji">⚠️</div>
        <div class="np-hero-text tp-hero-text">
          ${triviaQuestion}</span>
        </div>
        <div class="np-hero-emoji">❓</div>
      </div>
     
      <span class="np-sub"> YOU MUST ANSWER IN:</span>
      <div class="tp-buttons"></div>
     
     <div class="np-marquee"><span class="tp-bling">🔥 HOT DEALS 🔥 BEST VIEWED IN NETSCAPE 🔥 CLICK BEFORE YOUR BOSS SEES 🔥</span></div>
      <div class="tp-actions">
        <button class="np-btn" data-action="nope">No thanks</button>
      </div>
    </div>
    <div class="np-focus-sentinel" tabindex="0"></div>
  `;



  document.body.appendChild(popup);

  let stopBounce = null;

  const titleEl = popup.querySelector('.np-title');
  const badgeEl = popup.querySelector('.np-badge');
  const marqueeEl = popup.querySelector('.np-marquee');
  const heroEl = popup.querySelector('.np-hero');

  let time = 120;
  let timer = setInterval(()=>{
    time--;
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    popup.querySelector('.np-sub').innerText = `YOU MUST ANSWER IN: ${minutes}: ${seconds < 10 ? "0" + seconds : seconds}`;

    if(time === 0){
      clearInterval(timer);
      window.location.reload();
    }
  },1000)

  const fakeClose = () =>{
    stopBounce = bounceAround(popup);
    popup.classList.toggle('tp-popup');

    ['mousedown', 'keydown', 'touchstart'].forEach(evt => {
      popup.addEventListener(evt, () => {
        if (stopBounce) {
          stopBounce();
          stopBounce = null;
          popup.classList.toggle('tp-popup');
        }
      }, { once: true });
    });
  }

  triviaAnswers.map( (ans, index) => {
    const triviaButton = document.createElement("button");
    triviaButton.classList.add("np-cta", "tp-btn");
    triviaButton.innerText = ans;

    if(index !== answerIndex - 1){
      triviaButton.addEventListener('click', ()=>{
        fakeClose();
        titleEl.innerText = 'WRONG!';
        badgeEl.innerText = 'NOOOOOO';
        marqueeEl.querySelector('span').innerText = 'NEED A HINT? 🔥 HERE\'S A HINT! 🔥 IT\'S NOT THAT LAST ONE 🔥 I DON\'T KNOW EITHER 🔥';
      });
    }

    else{
      triviaButton.addEventListener('click', ()=> {
        onCorrect();
        clearInterval(timer);

        titleEl.innerText = 'CORRECT!!!!!';
        badgeEl.innerText = 'WINNER!';

        const emoji = document.createElement("div");
        emoji.classList.add("np-hero-emoji");
        emoji.innerText = "🎆🎇🎈🎉";


        const text = document.createElement("div");
        text.classList.add('np-hero-text', 'tp-hero-correct-text');
        text.innerText = 'YOU GOT IT';

        heroEl.replaceChildren(emoji, text);

        const winSpan = document.createElement('span');
        winSpan.classList.add('np-glitter');
        winSpan.innerText = "✨";
        badgeEl.appendChild(winSpan);

        marqueeEl.querySelector('span').innerText = 'WOWIE 🔥 YOU DID IT! 🔥 PROUD OF YOU 🔥 LEARNING IS FUN 🔥';
         setTimeout(()=>{
           window.location.href= 'index.html';
         }, 4000)
      });
    }
    document.querySelector('.tp-buttons').appendChild(triviaButton);
  });


  const rect = popup.getBoundingClientRect();
  const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
  const maxTop = Math.max(8, window.innerHeight - rect.height - 8);

  const left = startPosition?.left ?? clamp(Math.random() * (window.innerWidth - rect.width), 8, maxLeft);
  const top = startPosition?.top ?? clamp(Math.random() * (window.innerHeight - rect.height), 8, maxTop);

  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;


  const titlebar = popup.querySelector('.np-titlebar');
  makeDraggable(popup, titlebar);


  trapFocus(popup);

  if (autoFocus) {
    const firstButton = popup.querySelector('[data-action="cta"]') || popup.querySelector('button');
    firstButton?.focus();
  }

  // Close function
  const body = popup.querySelector('.np-body');
  function close() {
    if (stopBounce) stopBounce();
    document.removeEventListener('keydown', onKey);
    popup.remove();
    if (typeof onClose === 'function') {
      try {
        onClose();
      } catch (err) {
        console.error('Error in onClose callback:', err);
      }
    }
  }

  popup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const act = btn.getAttribute('data-action');

    switch (act) {
      case 'close':
        fakeClose();
        break;

      case 'min':
        body.classList.toggle('np-hidden');
        break;

      case 'max':
        popup.style.width = popup.style.width ? '' : 'min(520px, 96vw)';
        break;

      case 'nope':
          fakeClose();
        break;
    }
  });

  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKey);

  // Return public API
  return {
    element: popup,
    close
  };
}

console.log(`90s popup module loaded successfully`);