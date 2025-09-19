
// Matrix Rain Background Component (ES module)

/**
 * Creates a Matrix-style "digital rain" effect on a target element.
 *
 * @param {object} [options={}] - Configuration options for the effect.
 * @param {HTMLElement} [options.target=document.body] - The element to apply the background to.
 * @param {string} [options.color='#0f0'] - The color of the falling characters.
 * @param {number} [options.fontSize=16] - The font size of the characters.
 * @param {number} [options.speed=0.05] - The fade speed of the trails (0 to 1). Lower is slower.
 * @param {number} [options.fallSpeed=1] - The speed at which characters fall.
 * @param {string} [options.characters='アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789'] - The characters to use in the rain.
 * @param {number} [options.zIndex=-1] - The z-index of the canvas element.
 * @returns {object} An object with control methods { start, stop, destroy }.
 */
export function createMatrixBackground(options = {}) {
    const {
        target = document.body,
        color = '#0f0',
        fontSize = 16,
        speed = 0.05,
        fallSpeed = 0.5,
        characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789',
        zIndex = -1
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = zIndex;

    const targetStyle = window.getComputedStyle(target);
    if (targetStyle.position === 'static') {
        target.style.position = 'relative';
    }

    target.appendChild(canvas);

    let columns;
    let drops;
    let animationId;
    let isActive = true;

    function setup() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = target.clientWidth * dpr;
        canvas.height = target.clientHeight * dpr;
        ctx.scale(dpr, dpr);

        columns = Math.floor(target.clientWidth / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    }

    function draw() {
        if (!isActive) return;

        ctx.fillStyle = `rgba(0, 0, 0, ${speed})`;
        ctx.fillRect(0, 0, target.clientWidth, target.clientHeight);

        ctx.fillStyle = color;
        ctx.font = `${fontSize}px 'Courier New', Courier, monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > target.clientHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i] += fallSpeed;
        }

        animationId = requestAnimationFrame(draw);
    }

    setup();
    draw();

    const resizeObserver = new ResizeObserver(setup);
    resizeObserver.observe(target);

    // Public API
    return {
        element: canvas,

        stop() {
            isActive = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        },

        start() {
            if (!isActive) {
                isActive = true;
                draw();
            }
        },

        destroy() {
            this.stop();
            resizeObserver.disconnect();
            if (canvas.parentNode) {
                canvas.remove();
            }
        }
    };
}

console.log('Matrix Rain Background module loaded successfully');