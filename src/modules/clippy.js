import metadata from "../data/clippy-metadata.json";

import { clamp, makeDraggable, sleep } from './utils';

const {
  spriteWidth: SPRITE_WIDTH,
  spriteHeight: SPRITE_HEIGHT,
  sheetWidth: SHEET_WIDTH,
  dialogueArrowHeight: ARROW_HEIGHT
} = metadata;
const STYLE_ID = "clippy-styles-v1";

/**
 * The OG AI assistant, Clippy has now come to the web! Clippy just wants to help.
 * Import Clippy onto your page and trigger his various emotes.
 */
class Clippy {
  /**
   * @param {HTMLElement} containerEl Container element to place Clippy in.
   * @param {Object} options A set of options you can pass.
   * @param {number} options.size The ratio to scale Clippy by; defaults to 1.
   * @param {string} options.startingEmote The name of the emote Clippy is rendered with.
   */
  constructor(options = {}) {
    this.clippyEl = null;
    this.dialogueWrapperEl = null;
    this.dialogueEl = null;
    this.currentEmote = null;
    this.animationTimer = null;
    this.size = options.size || 1;
    this.updateEmote = this.updateEmote.bind(this);

    // initialization
    this.generateStyles();
    this.render(this.options);
    makeDraggable(this.containerEl, this.containerEl);
    this.spriteSheetEl = document.querySelector(".clippy-spritesheet");
    this.updateEmote(options.startingEmote || metadata.emotes[0].name);
    this.createDialogue();
  }

  render(options) {
    this.containerEl = document.createElement('div');
    this.containerEl.className = "clippy-container";
    this.clippyEl = document.createElement('div');
    this.clippyEl.className = "clippy"
    this.clippyEl.innerHTML = `<img class="clippy-spritesheet" src="${metadata.spriteSheetPath}" />`;
    this.containerEl.appendChild(this.clippyEl);
    document.body.appendChild(this.containerEl);

    const rect = this.containerEl.getBoundingClientRect();
    const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
    const maxTop = Math.max(8, window.innerHeight - rect.height - 8);
  
    const left = options?.startPosition?.left ?? clamp(0, 8, maxLeft);
    const top = options?.startPosition?.top ?? clamp(window.innerHeight - rect.height, 8, maxTop);
  
    this.containerEl.style.left = `${left}px`;
    this.containerEl.style.top = `${top}px`;
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

  // returnToIdle() {
    
  // }

  generateStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const baseStyles = `
            .clippy-container {
              position: fixed;
              width: calc(${SPRITE_WIDTH}px * ${this.size});
              height: calc(${SPRITE_HEIGHT}px * ${this.size});
            }

            .clippy {
              position: fixed;
              height: calc(${SPRITE_HEIGHT}px * ${this.size});
              width: calc(${SPRITE_WIDTH}px * ${this.size});
              overflow: hidden;
              cursor: move;
            }
        
            .clippy-spritesheet {
              width: calc(${SHEET_WIDTH}px * ${this.size});
              image-rendering: pixelated;
              filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.4));
              user-drag: none;
              -webkit-user-drag: none;
              user-select: none;
              -moz-user-select: none;
              -webkit-user-select: none;
              -ms-user-select: none;            
            }

            .clippy-dialogue-wrapper {
              position: relative;
            }


            .clippy-dialogue-wrapper::after {
              content: url("../assets/speech-arrow.png");
              position: absolute;
              left: 30px;
              bottom: -24px;
            }
            
            .clippy-dialogue {
              background: #ffffc1;
              border: solid 1px black;
              color: black;
              padding: 15px;
              font-family: "W95FA"
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

  createDialogue() {
    this.dialogueWrapperEl = document.createElement("div");
    this.dialogueWrapperEl.className = "clippy-dialogue-wrapper";
    this.containerEl.appendChild(this.dialogueWrapperEl);

    // wrapper using css clip-path to add pixelated corner effect
    const pixelatedCornerEl = document.createElement("div");
    pixelatedCornerEl.className = "pixel-corners--wrapper";
    this.dialogueWrapperEl.appendChild(pixelatedCornerEl);

    this.dialogueEl = document.createElement("div");
    this.dialogueEl.className = "clippy-dialogue pixel-corners";
    pixelatedCornerEl.appendChild(this.dialogueEl);

    this.setDialogueContent();
    this.repositionDialogue();
  }

  setDialogueContent() {
    if (!this.dialogueEl) return;

    this.dialogueEl.innerHTML = `
      <p class="clippy-dialogue-content">wassuhhhhhhhhhhh</p>
      <p> ehh </p>
      <p> ehh </p>
      <p> ehh </p>
      <p> ehh </p>
    `
  }

  repositionDialogue() {
    if (!this.dialogueWrapperEl) return;

    const dialogueHeight = this.dialogueWrapperEl.getBoundingClientRect().height;
    console.log(dialogueHeight);
    this.dialogueWrapperEl.style.left = `${SPRITE_WIDTH * this.size / 2.5}px`;
    this.dialogueWrapperEl.style.top = `-${ARROW_HEIGHT + dialogueHeight}px`;
  }
}

export default Clippy;
