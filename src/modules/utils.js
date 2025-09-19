/**
 * Sleep for an amount of ms
 * @param {number} ms milliseconds to sleep for
 * @returns {Promise<typeof setTimeout>} promise runs a setTimeout for an amount of ms
 */
export function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
} 

/**
 * Clamps a value between min and max
 * @param {number} val - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
 export function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

/**
 * Makes an element draggable by its handle
 * @param {HTMLElement} popup - Element to make draggable
 * @param {HTMLElement} handle - Element to use as drag handle
 */
 export function makeDraggable(popup, handle) {
    let x = 0, y = 0, sx = 0, sy = 0, dragging = false;
  
    const onDown = (e) => {
      dragging = true;
      const p = e.touches ? e.touches[0] : e;
      sx = p.clientX;
      sy = p.clientY;
  
      const rect = popup.getBoundingClientRect();
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
      const maxX = window.innerWidth - popup.offsetWidth;
      const maxY = window.innerHeight - popup.offsetHeight;
  
      popup.style.left = clamp(nx, 0, Math.max(0, maxX)) + 'px';
      popup.style.top = clamp(ny, 0, Math.max(0, maxY)) + 'px';
  
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
  
  