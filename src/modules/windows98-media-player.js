/**
 * Windows 98 Media Player Module
 * A nostalgic recreation of the classic Windows Media Player
 */

// Inject styles if not already present
function injectStyles() {
  if (document.getElementById('win98-media-player-styles')) return;
  
  const styleEl = document.createElement('style');
  styleEl.id = 'win98-media-player-styles';
  styleEl.textContent = `
    .win98-player {
      font-family: 'Tahoma', 'Arial', sans-serif;
      background: #c0c0c0;
      border: 3px solid;
      border-color: #dfdfdf #808080 #808080 #dfdfdf;
      box-shadow: 1px 1px 0 0 #000;
      color: #000;
      position: fixed;
      z-index: 9998;
      user-select: none;
    }
    
    .win98-player-titlebar {
      background: linear-gradient(90deg, #000080, #1084d0);
      color: white;
      font-weight: bold;
      padding: 3px 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: move;
    }
    
    .win98-player-title {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
    }
    
    .win98-player-title img {
      width: 16px;
      height: 16px;
    }
    
    .win98-player-controls {
      display: flex;
      gap: 2px;
    }
    
    .win98-player-btn {
      width: 16px;
      height: 16px;
      background: #c0c0c0;
      border: 1px solid;
      border-color: #fff #808080 #808080 #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      cursor: pointer;
      padding: 0;
      color: #000;
    }

    .win98-player-btn[aria-label="Minimize"] {
      font-size: 18px;
      padding-bottom: 8px;
    }

    .win98-player-btn[aria-label="Maximize"] {
      font-size: 19px;
      padding-bottom: 4px;
    }

    .win98-player-btn[aria-label="Close"] {
      font-size: 20px;
    }
    
    .win98-player-btn:active {
      border-color: #808080 #fff #fff #808080;
    }
    
    .win98-player-content {
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    
    .win98-player-menu {
      display: flex;
      background: #c0c0c0;
      border-bottom: 1px solid #808080;
      padding: 2px 0;
    }
    
    .win98-player-menu-item {
      padding: 2px 8px;
      font-size: 11px;
      cursor: pointer;
    }
    
    .win98-player-menu-item:hover {
      background: #000080;
      color: #fff;
    }
    
    .win98-player-video {
      background: #000;
      display: block;
      width: 100%;
    }
    
    .win98-player-controls-bar {
      background: #c0c0c0;
      padding: 4px;
      display: flex;
      align-items: center;
      border-top: 1px solid #808080;
    }
    
    .win98-player-progress-container {
      flex-grow: 1;
      height: 10px;
      background: #808080;
      border: 2px solid;
      border-color: #808080 #fff #fff #808080;
      position: relative;
      margin: 0 8px;
    }
    
    .win98-player-progress {
      height: 100%;
      background: #c0c0c0;
      width: 0%;
    }
    
    .win98-player-transport {
      display: flex;
      gap: 1px;
      margin-right: 4px;
    }
    
    .win98-player-transport-btn {
      width: 22px;
      height: 22px;
      background: #c0c0c0;
      border: 2px solid;
      border-color: #fff #808080 #808080 #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      cursor: pointer;
      padding: 0;
    }
    
    .win98-player-transport-btn:active {
      border-color: #808080 #fff #fff #808080;
    }
    
    .win98-player-transport-btn[data-action="pause"] {
      font-size: 18px;
    }

    .win98-player-transport-btn[data-action="stop"] {
      font-size: 18px;
      padding-bottom: 4px;
    }

    .win98-player-transport-btn[data-action="prev"],
    .win98-player-transport-btn[data-action="next"] {
      font-size: 19px;
      padding-top: 3px;
    }

    .win98-player-transport-btn[data-action="rewind"] {
      letter-spacing: -5px;
      font-size: 13px;
      padding: 1px 5px 0 0;
    }

    .win98-player-transport-btn[data-action="forward"] {
      letter-spacing: -3px;
      font-size: 13px;
    }
    
    .win98-player-transport-btn.separator {
      width: 8px;
      background: transparent;
      border: none;
      cursor: default;
    }
    
    .win98-player-volume {
      display: flex;
      align-items: center;
      margin-left: 4px;
    }
    
    .win98-player-volume-icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
    
    .win98-player-volume-slider {
      width: 60px;
      height: 18px;
      background: #c0c0c0;
      position: relative;
      border: 2px inset #808080;
      display: flex;
      align-items: center;
    }
    
    /* Hide default input styling */
    .win98-player-volume-slider input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 8px;
      background: transparent;
      margin: 0;
      padding: 0;
      cursor: pointer;
    }
    
    /* Remove default focus styles */
    .win98-player-volume-slider input[type="range"]:focus {
      outline: none;
    }
    
    /* Style the track for different browsers */
    .win98-player-volume-slider input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 8px;
      background: #808080;
      border: none;
    }
    
    .win98-player-volume-slider input[type="range"]::-moz-range-track {
      width: 100%;
      height: 8px;
      background: #808080;
      border: none;
    }
    
    /* Style the thumb for different browsers */
    .win98-player-volume-slider input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 12px;
      height: 18px;
      background: #c0c0c0;
      border: 2px outset #dfdfdf;
      border-radius: 0;
      margin-top: -5px;
    }
    
    .win98-player-volume-slider input[type="range"]::-moz-range-thumb {
      width: 12px;
      height: 18px;
      background: #c0c0c0;
      border: 2px outset #dfdfdf;
      border-radius: 0;
    }
    
    .win98-player-volume-slider input[type="range"]:active::-webkit-slider-thumb {
      border-style: inset;
      border-color: #808080 #fff #fff #808080;
    }
    
    .win98-player-volume-slider input[type="range"]:active::-moz-range-thumb {
      border-style: inset;
      border-color: #808080 #fff #fff #808080;
    }
    
    .win98-player-status-bar {
      height: 20px;
      background: #000;
      color: #fff;
      font-size: 11px;
      padding: 2px 4px;
      display: flex;
      align-items: center;
    }
  `;
  
  document.head.appendChild(styleEl);
}

/**
 * Format time in MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Clamps a value between min and max
 * @param {number} val - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

/**
 * Makes an element draggable
 * @param {HTMLElement} element - Element to make draggable
 * @param {HTMLElement} handle - Element to use as drag handle
 */
function makeDraggable(element, handle) {
    let x = 0, y = 0, sx = 0, sy = 0, dragging = false;

    const onDown = (e) => {
        dragging = true;
        const p = e.touches ? e.touches[0] : e;
        sx = p.clientX;
        sy = p.clientY;

        const rect = element.getBoundingClientRect();
        x = rect.left;
        y = rect.top;

        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchend', onUp);
    };

    const onMove = (e) => {
        if (!dragging) return;

        const p = e.touches ? e.touches[0] : e;
        const nx = x + (p.clientX - sx);
        const ny = y + (p.clientY - sy);
        const maxX = window.innerWidth - element.offsetWidth;
        const maxY = window.innerHeight - element.offsetHeight;

        element.style.left = clamp(nx, 0, Math.max(0, maxX)) + 'px';
        element.style.top = clamp(ny, 0, Math.max(0, maxY)) + 'px';

        e.preventDefault?.();
    };

    const onUp = () => {
        dragging = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchend', onUp);
    };

    handle.addEventListener('mousedown', onDown);
    handle.addEventListener('touchstart', onDown, { passive: true });
}

/**
 * Creates a Windows 98 style media player
 * @param {Object} options - Configuration options
 * @returns {Object} - Media player control object
 */
export function createMediaPlayer(options = {}) {
  injectStyles();
  
  const {
    videos = [],
    width = 400,
    height = 300,
    autoplay = false,
    draggable = true,
    position = { top: '50px', left: '50px' },
    centered = false,
    initialVolume = 0.7
  } = options;
  

  const playerEl = document.createElement('div');
  playerEl.className = 'win98-player';
  playerEl.style.width = `${width}px`;
  playerEl.style.top = position.top;
  
  
  if (centered) {
    playerEl.style.left = '50%';
    playerEl.style.transform = 'translateX(-50%)';
  } else {
    playerEl.style.left = position.left;
  }
  
 
  playerEl.innerHTML = `
    <div class="win98-player-titlebar">
      <div class="win98-player-title">
        <img src="./assets/icons/media-player.png" alt="Media Player">
        Windows Media Player
      </div>
      <div class="win98-player-controls">
        <button class="win98-player-btn" aria-label="Minimize">_</button>
        <button class="win98-player-btn" aria-label="Maximize">□</button>
        <button class="win98-player-btn" aria-label="Close">×</button>
      </div>
    </div>
    <div class="win98-player-content">
      <div class="win98-player-menu">
        <div class="win98-player-menu-item">File</div>
        <div class="win98-player-menu-item">View</div>
        <div class="win98-player-menu-item">Play</div>
        <div class="win98-player-menu-item">Navigate</div>
        <div class="win98-player-menu-item">Favorites</div>
        <div class="win98-player-menu-item">Help</div>
      </div>
      <video class="win98-player-video" width="${width}" height="${height - 100}"></video>
      <div class="win98-player-controls-bar">
        <div class="win98-player-transport">
          <button class="win98-player-transport-btn" data-action="play">▶</button>
          <button class="win98-player-transport-btn" data-action="pause">⏸</button>
          <button class="win98-player-transport-btn" data-action="stop">■</button>
          <button class="win98-player-transport-btn separator"></button>
          <button class="win98-player-transport-btn" data-action="prev">⏮</button>
          <button class="win98-player-transport-btn" data-action="rewind">◀◀</button>
          <button class="win98-player-transport-btn" data-action="forward">▶▶</button>
          <button class="win98-player-transport-btn" data-action="next">⏭</button>
        </div>
        <div class="win98-player-progress-container">
          <div class="win98-player-progress"></div>
        </div>
        <div class="win98-player-volume">
          <img class="win98-player-volume-icon" src="./assets/icons/volume.png" alt="Volume">
          <div class="win98-player-volume-slider">
            <input type="range" min="0" max="100" value="${initialVolume * 100}" aria-label="Volume control">
          </div>
        </div>
      </div>
      <div class="win98-player-status-bar">
        Ready
      </div>
    </div>
  `;
  

  document.body.appendChild(playerEl);
  
  const videoEl = playerEl.querySelector('.win98-player-video');
  const playBtn = playerEl.querySelector('[data-action="play"]');
  const pauseBtn = playerEl.querySelector('[data-action="pause"]');
  const stopBtn = playerEl.querySelector('[data-action="stop"]');
  const prevBtn = playerEl.querySelector('[data-action="prev"]');
  const rewindBtn = playerEl.querySelector('[data-action="rewind"]');
  const forwardBtn = playerEl.querySelector('[data-action="forward"]');
  const nextBtn = playerEl.querySelector('[data-action="next"]');
  const progressBar = playerEl.querySelector('.win98-player-progress');
  const progressContainer = playerEl.querySelector('.win98-player-progress-container');
  const menuItems = playerEl.querySelectorAll('.win98-player-menu-item');
  const titleBar = playerEl.querySelector('.win98-player-titlebar');
  const closeBtn = playerEl.querySelector('[aria-label="Close"]');
  const statusBar = playerEl.querySelector('.win98-player-status-bar');
  const volumeSlider = playerEl.querySelector('.win98-player-volume input');
  
  let currentVideoIndex = 0;
  
  if (draggable) {
    makeDraggable(playerEl, titleBar);
  }
  
  videoEl.volume = initialVolume;
  
  if (videos.length > 0) {
    loadVideo(0);
  }
  
  if (autoplay && videos.length > 0) {
    videoEl.autoplay = true;
  }
  
  playBtn.addEventListener('click', () => {
    videoEl.play();
    statusBar.textContent = 'Playing';
  });
  
  pauseBtn.addEventListener('click', () => {
    videoEl.pause();
    statusBar.textContent = 'Paused';
  });
  
  stopBtn.addEventListener('click', () => {
    videoEl.pause();
    videoEl.currentTime = 0;
    statusBar.textContent = 'Stopped';
  });
  
  prevBtn.addEventListener('click', () => {
    if (currentVideoIndex > 0) {
      loadVideo(currentVideoIndex - 1);
      videoEl.play();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentVideoIndex < videos.length - 1) {
      loadVideo(currentVideoIndex + 1);
      videoEl.play();
    }
  });
  
  rewindBtn.addEventListener('click', () => {
    videoEl.currentTime = Math.max(0, videoEl.currentTime - 10);
  });
  
  forwardBtn.addEventListener('click', () => {
    videoEl.currentTime = Math.min(videoEl.duration, videoEl.currentTime + 10);
  });
  
  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoEl.currentTime = pos * videoEl.duration;
  });
  
  volumeSlider.addEventListener('input', (e) => {
    const vol = e.target.value / 100;
    videoEl.volume = vol;
  });
  
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      statusBar.textContent = `Menu item clicked: ${item.textContent}`;
      setTimeout(() => {
        statusBar.textContent = 'Ready';
      }, 2000);
    });
  });
  
  closeBtn.addEventListener('click', () => {
    close();
  });
  
  videoEl.addEventListener('timeupdate', () => {
    const current = videoEl.currentTime;
    const duration = videoEl.duration || 0;
    const percent = (current / duration) * 100;
    
    progressBar.style.width = `${percent}%`;
  });
  

  videoEl.addEventListener('ended', () => {
    if (currentVideoIndex < videos.length - 1) {
      loadVideo(currentVideoIndex + 1);
      videoEl.play();
    } else {
      statusBar.textContent = 'Finished';
    }
  });
  
  /**
   * Loads a video by index
   * @param {number} index - Video index to load
   */
  function loadVideo(index) {
    if (index >= 0 && index < videos.length) {
      currentVideoIndex = index;
      const video = videos[index];
      
      videoEl.src = video.src;
      videoEl.load();
      
      statusBar.textContent = 'Ready';
    }
  }
  
  /**
   * Closes the media player
   */
  function close() {
    videoEl.pause();
    playerEl.remove();
  }
  
  // Return public API
  return {
    element: playerEl,
    play: () => videoEl.play(),
    pause: () => videoEl.pause(),
    stop: () => {
      videoEl.pause();
      videoEl.currentTime = 0;
      statusBar.textContent = 'Stopped';
    },
    loadVideo: (index) => loadVideo(index),
    setVolume: (level) => {
      const vol = Math.max(0, Math.min(1, level));
      videoEl.volume = vol;
      volumeSlider.value = vol * 100;
    },
    getVolume: () => videoEl.volume,
    getCurrentTime: () => videoEl.currentTime,
    getDuration: () => videoEl.duration,
    close: close,
    isPlaying: () => !videoEl.paused,
    onClose: (callback) => {
      closeBtn.addEventListener('click', () => {
        if (typeof callback === 'function') {
          callback();
        }
      });
    },
    center: () => {
      playerEl.style.left = '50%';
      playerEl.style.transform = 'translateX(-50%)';
    }
  };
}