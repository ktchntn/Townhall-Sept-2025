import metadata from "../data/clippy-metadata.json";

import { clamp, makeDraggable } from "./utils";

const {
  spriteWidth: SPRITE_WIDTH,
  spriteHeight: SPRITE_HEIGHT,
  sheetWidth: SHEET_WIDTH,
  dialogueArrowHeight: ARROW_HEIGHT,
  defaultEmote: DEFAULT_EMOTE,
} = metadata;
const STYLE_ID = "clippy-styles-v1";

/**
 * @typedef {Object} DialogueContentData
 * @property {string} slideId Unique identifier of the content.
 * @property {string} message Main message of content
 * @property {string} [recipient] Recipient of message
 * @property {string} [sender] Sender of message
 * @property {Object[]} [buttons] Array of buttons to display and their action
 * @property {string} buttons[].text Text to display on button
 * @property {("next" | "previous" | "disabled" | "hide" | "hide-and-leave" )} [buttons[].action] Behaviour of button
 * @property {string | string[]} [emote] A single emote or array of emotes that Clippy will display.
 * @property {("loop" | "stop-at-end" | "return-to-blink")} [endBehaviour] Behaviour of emote when it reaches the end
 * @property {boolean} [playImmediately] Flag to play animation immediately when this method is called.
 * @property {boolean} [nextSlideOnEmoteEnd] Flag to switch to the next slide once the emote(s) end.
 */

/**
 * @typedef {Object} EmoteData
 * @property {string} name Name of emote
 * @property {number} rowIndex Row position of emote in sprite sheet
 * @property {number} duration Duration of emote in milliseconds
 * @property {number} numFrames Number of frames of the emote
 */

/**
 * The OG AI assistant, Clippy has now come to the web! Clippy just wants to help.
 * Spawn Clippy onto your page and:
 * - trigger his various emotes
 * - give him content to display
 * @class
 */
class Clippy {
  spriteSheetEl = null;
  containerEl = null;

  /**
   * Create an instance of Clippy.
   * @param {HTMLElement} containerEl Container element to place Clippy in.
   * @param {Object} options A set of options you can pass.
   * @param {number} [options.size] The ratio to scale Clippy by; defaults to 1.
   * @param {string} [options.startingEmote] The name of the emote Clippy is rendered with.
   * @param {DialogueContentData[]} [options.slides] An array of data to display on Clippy's dialogue box
   * @param {{ left: number, top: number }} [options.startingPosition] Position where Clippy first renders
   */
  constructor(options = {}) {
    this.clippyEl = null;
    this.dialogueWrapperEl = null;
    this.dialogueEl = null;
    this.currentEmote = options.startingEmote || DEFAULT_EMOTE;
    this.currentEndBehaviour = null;
    this.emoteArray = options.startingEmote
      ? [options.startingEmote]
      : ["blink"];
    this.currentEmoteIndex = 0;
    this.queuedEmote = null;
    this.size = options.size || 1;
    this.slides = options.slides || [];
    this.currentSlideIndex = 0;
    this.emoteEndCallback = null;

    // Public methods
    this.queueNextEmote = this.queueNextEmote.bind(this);
    this.setDialogueContent = this.setDialogueContent.bind(this);
    this.showDialogue = this.showDialogue.bind(this);
    this.hideDialogue = this.hideDialogue.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.playCurrentEmote = this.playCurrentEmote.bind(this);
    this.updatePosition = this.updatePosition.bind(this);

    // Initialization
    this.renderStyles();
    this.render(options?.startingPosition);
    makeDraggable(this.containerEl, this.containerEl);
    this.spriteSheetEl = document.querySelector(".clippy-spritesheet");
    this.queueNextEmote(this.currentEmote);
  }

  /**
   * Renders Clippy onto the page.
   * @public
   * @param {{ left: number, top: number }} startingPosition Position on page where Clippy renders
   */
  render(startingPosition) {
    this.containerEl = document.createElement("div");
    this.containerEl.className = "clippy-container";
    this.clippyEl = document.createElement("div");
    this.clippyEl.className = "clippy";
    this.clippyEl.innerHTML = `<img class="clippy-spritesheet" src="${metadata.spriteSheetPath}" draggable="false"/>`;
    this.containerEl.appendChild(this.clippyEl);
    document.body.appendChild(this.containerEl);
    this.updatePosition(startingPosition);
  }

  /**
   * Moves Clippy to a specified position
   * @param {{ left: number, top: number }} position
   */
  updatePosition(position) {
    const rect = this.containerEl.getBoundingClientRect();
    const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
    const maxTop = Math.max(8, window.innerHeight - rect.height - 8);

    const left = position?.left ?? clamp(0, 8, maxLeft);
    const top =
      position?.top ?? clamp(window.innerHeight - rect.height, 8, maxTop);

    this.containerEl.style.left = `${left}px`;
    this.containerEl.style.top = `${top}px`;
  }

  /**
   * Queues Clippy's next emote(s).
   * @public
   * @param {string | string[]} emote A single emote or array of emotes that Clippy will display.
   * If it is an array of emotes, they will be played in order.
   * If playImmediately is disabled, Clippy is in the middle of an emote, play the queued emote(s) once the current emote ends.
   * @param {("loop" | "stop-at-end" | "return-to-blink")} [endBehaviour] Behaviour of emote when it reaches the end
   * @param {boolean} [playImmediately] Flag to play animation immediately when this method is called.
   */
  queueNextEmote(
    emote,
    endBehaviour = "return-to-blink",
    playImmediately = false
  ) {
    this.previousEmoteArray = this.emoteArray;
    this.emoteArray = !Array.isArray(emote) ? [emote] : emote;

    // queue up emote
    this.queuedEmote = {
      emoteName: this.emoteArray[0],
      endBehaviour,
    };

    // add listeners
    this.spriteSheetEl.removeEventListener("animationend", this.onAnimationEnd); // prevent duplicate listeners
    this.spriteSheetEl.addEventListener("animationend", this.onAnimationEnd);

    // auto play if just initialized or ended
    if (this.currentEndBehaviour === null || playImmediately) {
      this.spriteSheetEl.removeAttribute("style");
      this.onAnimationEnd();
    }
  }

  /**
   * Plays the currently set emote.
   * @private
   */
  playCurrentEmote() {
    setTimeout(() => {
      this.spriteSheetEl.classList.add(`anim_${this.currentEmote}`);
      this.stopOnFinalEmote();
    }, 10);
  }

  /**
   * Event handler when the current emote ends which sets and plays the next emote.
   * @private
   */
  onAnimationEnd() {
    this.spriteSheetEl.classList.remove(`anim_${this.currentEmote}`);
    const isLastEmote = this.currentEmoteIndex === this.emoteArray.length - 1;

    if (
      this.currentEndBehaviour === "return-to-blink" &&
      isLastEmote &&
      !this.queuedEmote
    ) {
      this.emoteArray = ["blink"];
      this.currentEndBehaviour = "loop";
    }

    if (
      isLastEmote &&
      this.emoteEndCallback &&
      !(
        JSON.stringify(this.emoteEndCallback?.slideEmote) ===
        JSON.stringify(this.emoteArray) // TODO: Find a better way to make sure the slides don't match
      )
    ) {
      this.emoteEndCallback.cb();
      this.emoteEndCallback = null;
    }

    const { emoteName: queuedEmoteName, endBehaviour: queuedEndBehaviour } =
      this.queuedEmote || {};

    // if emote was queued, set next emote to the queued one - otherwise, play emote in current array
    this.currentEmoteIndex = this.queuedEmote
      ? 0
      : (this.currentEmoteIndex + 1) % this.emoteArray.length;
    this.currentEmote =
      queuedEmoteName || this.emoteArray[this.currentEmoteIndex];
    this.currentEndBehaviour = queuedEndBehaviour || this.currentEndBehaviour;
    this.queuedEmote = null;

    this.playCurrentEmote();
  }

  /**
   * Stops the current emote at the last frame if configured to do so
   * and there is no queued emote.
   * @private
   */
  stopOnFinalEmote() {
    const isLastEmote = this.currentEmoteIndex === this.emoteArray.length - 1;
    if (
      this.currentEndBehaviour === "stop-at-end" &&
      isLastEmote &&
      !this.queuedEmote
    ) {
      this.spriteSheetEl.style.animationFillMode = "forwards";
      this.spriteSheetEl.removeEventListener(
        "animationend",
        this.onAnimationEnd
      );
      this.currentEndBehaviour = null;
    }
  }

  /**
   * Generates all styles necessary for this class.
   * @private
   * @returns {void}
   */
  renderStyles() {
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
              pointer-events: none;
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
              font-family: "W95FA";
              font-size: 20px;
              width: max-content;
              max-width: 75vw;
            }

            .clippy-dialogue-button {
              padding: 5px;
              font-family: inherit;
              font-size: 18px;
              background: #ffffc1;
            }

            .clippy-dialogue-button:not(:disabled) {
              cursor: pointer;
            }

            .clippy-dialogue-button:not(:disabled):hover {
              background: #f1e9b6ff;
            }

            .clippy-dialogue-button:not(:disabled):active {
              background: #d1c995ff;
            }

            .clippy-dialogue-button:disabled {
              opacity: 0.7;
            }

            .clippy-dialogue-button-wrapper:only-child {
              margin: 0 auto;
            }

            .clippy-dialogue-button-wrapper:not(:last-child) {
              margin-right: 10px;
            }

            .clippy-dialogue-button-wrapper:disabled {
                opacity: 0.7;
            }

            .clippy-dialogue-button-section {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding-top: 15px;
              border-top: solid 1px black;
            }
              
            .hidden {
              display: none;
            }

            @media only screen and (min-width: 1300px) {
              .clippy-dialogue {
                font-size: 28px;
                max-width: 50vw;
              }
              
              .clippy-dialogue-button {
                font-size: 24px;
              }
            }
        `;

    const animClasses = metadata.emotes.map(
      (emote) => `
            .anim_${emote.name} {
                animation: ${emote.name} ${
        emote.duration
      }ms steps(2, jump-none);
                ${
                  emote.fillMode ? `animation-fill-mode: ${emote.fillMode}` : ""
                }
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

  /**
   * Creates css keyframes for all of Clippy's animations given an emote data object
   * @private
   * @param {EmoteData} emoteData Emote data object
   * @returns {string} CSS keyframes for Clippy's animations
   */
  generateKeyframes(emoteData) {
    const { rowIndex, numFrames } = emoteData;
    const keyframes = [];
    const frameIncrements = 100 / numFrames;

    for (let n = 0; n < numFrames; n++) {
      const percentKeyframe = n === numFrames - 1 ? 100 : n * frameIncrements;
      const offsetX = -SPRITE_WIDTH * this.size * n;
      const offsetY = -SPRITE_HEIGHT * this.size * rowIndex;
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

  /**
   * Renders and displays Clippy's dialogue box.
   * @private
   * @returns {void}
   */
  renderDialogue() {
    if (!this.slides || this.slides?.length === 0) return;

    this.dialogueWrapperEl = document.createElement("div");
    this.dialogueWrapperEl.className = "clippy-dialogue-wrapper";
    this.containerEl.appendChild(this.dialogueWrapperEl);

    // wrapper using css clip-path to add pixelated corner effect
    const pixelatedCornerEl = document.createElement("div");
    pixelatedCornerEl.className = "pixel-corners-8--wrapper";
    this.dialogueWrapperEl.appendChild(pixelatedCornerEl);

    this.dialogueEl = document.createElement("div");
    this.dialogueEl.className = "clippy-dialogue pixel-corners-8";
    pixelatedCornerEl.appendChild(this.dialogueEl);

    this.setDialogueContent(this.currentSlideIndex);
  }

  /**
   * Sets the content of Clippy's dialogue box to one of the slides.
   * @public
   * @param {number} slideIndex Index of the slide to set
   * @returns {void}
   */
  setDialogueContent(slideIndex) {
    if (!this.dialogueEl || slideIndex < 0) return;
    const slideData = this.slides[slideIndex];

    // render content
    this.dialogueEl.innerHTML = `
      <p class="clippy-dialogue-message">
        ${slideData.recipient ? `${slideData.recipient} — ` : ""}${
      slideData.message
    }
      </p>
      ${
        slideData.sender
          ? `<p class="clippy-dialogue-sender">– ${slideData.sender}</p>`
          : ""
      }
    `;
    this.currentSlideIndex = slideIndex;

    // render buttons
    if (slideData.buttons) {
      const buttons = slideData.buttons.map((buttonData) => {
        const buttonWrapperEl = document.createElement("div");
        buttonWrapperEl.className =
          "clippy-dialogue-button-wrapper pixel-corners-4--wrapper";
        const buttonEl = document.createElement("button");
        buttonEl.className = "clippy-dialogue-button";
        buttonEl.innerText = buttonData.text;

        switch (buttonData.action) {
          case "next":
            if (this.currentSlideIndex === this.slides.length - 1) {
              buttonWrapperEl.disabled = true;
              buttonEl.disabled = true;
            } else {
              buttonEl.addEventListener("click", () => {
                this.setDialogueContent(
                  Math.abs(this.currentSlideIndex + 1) % this.slides.length
                );
              });
            }
            break;
          case "previous":
            if (this.currentSlideIndex === 0) {
              buttonWrapperEl.disabled = true;
              buttonEl.disabled = true;
            } else {
              buttonEl.addEventListener("click", () => {
                this.setDialogueContent(
                  Math.abs(this.currentSlideIndex - 1) % this.slides.length
                );
              });
            }
            break;
          case "disabled":
            buttonWrapperEl.disabled = true;
            buttonEl.disabled = true;
            break;
          case "hide":
            buttonEl.addEventListener("click", () => {
              this.hideDialogue();
            });
            break;
          case "hide-and-leave":
            buttonEl.addEventListener("click", () => {
              this.hideDialogue();
              this.queueNextEmote("bike-leave", "stop-at-end", true);
            });
            break;
          default:
            break;
        }

        buttonWrapperEl.appendChild(buttonEl);
        return buttonWrapperEl;
      });

      const buttonSection = document.createElement("div");
      buttonSection.className = "clippy-dialogue-button-section";
      buttons.forEach((buttonEl) => buttonSection.appendChild(buttonEl));
      this.dialogueEl.appendChild(buttonSection);
    }

    // set one time callback to change to next slide when emote(s) end
    if (slideData.nextSlideOnEmoteEnd) {
      this.emoteEndCallback = {
        cb: () => {
          this.setDialogueContent(
            Math.abs(this.currentSlideIndex + 1) % this.slides.length
          );
        },
        slideEmote: [...slideData.emote],
      };
    }

    // queue / play emote
    if (slideData.emote) {
      this.queueNextEmote(
        slideData.emote,
        slideData.endBehaviour || "return-to-blink",
        slideData.playImmediately
      );
    }

    this.repositionDialogue();
  }

  /**
   * Positions dialogue box to be on top of Clippy.
   * @private
   * @returns {void}
   */
  repositionDialogue() {
    if (!this.dialogueWrapperEl) return;

    const dialogueHeight =
      this.dialogueWrapperEl.getBoundingClientRect().height;
    this.dialogueWrapperEl.style.left = `${(SPRITE_WIDTH * this.size) / 2.5}px`;
    this.dialogueWrapperEl.style.top = `-${ARROW_HEIGHT + dialogueHeight}px`;
  }

  /**
   * Shows Clippy's dialogue box on the currently selected slide.
   * @public
   */
  showDialogue() {
    if (!this.dialogueWrapperEl) {
      this.renderDialogue();
    }

    this.dialogueWrapperEl.classList.remove("hidden");
  }

  /**
   * Hide's Clippy's dialogue box.
   * @public
   */
  hideDialogue() {
    if (!this.dialogueWrapperEl) return;

    this.dialogueWrapperEl.classList.add("hidden");
  }
}

export default Clippy;
