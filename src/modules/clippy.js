import metadata from "../data/clippy-metadata.json";

const {
  spriteWidth: SPRITE_WIDTH,
  spriteHeight: SPRITE_HEIGHT,
  sheetWidth: SHEET_WIDTH
} = metadata;
const STYLE_ID = "clippy-styles-v1";

/**
 * Clippy
 */
class Clippy {
  /**
   * @param {HTMLElement} containerEl Container element to place Clippy in.
   * @param {Object} options A set of options you can pass.
   * @param {number} options.size The ratio to scale Clippy by; defaults to 1.
   * @param {string} options.startingEmote The name of the emote Clippy is rendered with.
   */
  constructor(containerEl, options = {}) {
    this.containerEl = containerEl;
    this.currentEmote = null;
    this.size = options.size || 1;
    this.updateEmote = this.updateEmote.bind(this);
    this.generateStyles();
    this.render();
    this.spriteSheetEl = document.querySelector(".clippy-spritesheet");
    this.updateEmote(options.startingEmote || metadata.emotes[0].name);
  }

  render() {
    this.containerEl.innerHTML = `
        <div class="clippy">
            <img class="clippy-spritesheet" src="${metadata.spriteSheetPath}" />
        </div>
      `;
  }

  /**
   * Update Clippy's animation to one of the possible emotes.
   * @param {string} emoteName Name of the emote to update to.
   */
  updateEmote(emoteName) {
    if (this.currentEmote) {
      this.spriteSheetEl.classList.toggle(`anim_${this.currentEmote}`);
    }

    setTimeout(() => {
      this.currentEmote = emoteName;
      this.spriteSheetEl.classList.toggle(`anim_${emoteName}`);
    }, 10);
  }

  generateStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const baseStyles = `
            .clippy {
                height: calc(${SPRITE_HEIGHT}px * ${this.size});
                width: calc(${SPRITE_WIDTH}px * ${this.size});
                overflow: hidden;
            }
        
            .clippy-spritesheet {
                width: calc(${SHEET_WIDTH}px * ${this.size});
                image-rendering: pixelated;
            }
        `;

    const animClasses = metadata.emotes.map(
      (emote) => `
            .anim_${emote.name} {
                animation: ${emote.name} ${emote.duration}ms steps(2, jump-none);
                ${emote.fillMode ? `animation-fill-mode: ${emote.fillMode}` : ""}
            }
        `
    );

    const keyframes = metadata.emotes.map((emote) =>
      this.generateKeyframes(emote)
    );

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      baseStyles + animClasses.join("\n") + keyframes.join("\n");
    document.head.appendChild(style);
  }

  generateKeyframes(emoteData) {
    const { rowIndex, numFrames } = emoteData;
    const keyframes = [];
    const frameIncrements = 100 / numFrames;

    for (let n = 0; n < numFrames; n++) {
      const percentKeyframe = n === numFrames - 1 ? 100 : n * frameIncrements;
      const offsetX = -SPRITE_WIDTH * this.size * n;
      const offsetY =
        -SPRITE_HEIGHT * this.size * rowIndex;
      keyframes.push(`
                ${percentKeyframe}% {
                    transform: translate3d(${offsetX}px, ${offsetY}px, 0);
                }
            `);
    }
    return `
            @keyframes ${emoteData.name} {
                ${keyframes.join("\n")}
            }
        `;
  }
}

export default Clippy;
