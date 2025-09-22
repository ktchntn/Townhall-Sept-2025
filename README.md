
# Townhall 1990 - A Nostalgic 90s Web Experience

This project recreates the authentic look and feel of 90s-era websites, complete with popup windows, blinking text, animated banners, and glitter effects. Perfect for nostalgic web experiences or themed events.

## Features

- **Nineties Popup**: Authentic 90s-style popup windows with:
  - Draggable functionality
  - Minimize/maximize controls
  - Focus trapping for accessibility
  - Configurable content and behaviors
  - Optional "annoy mode" and bounce animations

- **Vertical Ad Banner**: Classic sidebar advertisements with:
  - Blinking text and sparkle effects
  - Animated visitor counters
  - Floating image effects
  - Configurable positions (left/right)

- **Glitter Background**: Add sparkles and glitter effects to any element with:
  - Adjustable density settings
  - Rainbow color options
  - Drift and rain animation effects

- **Clippy**: The World's first AI assistant, Clippy is here and he just wants to help. Spawn Clippy onto your page and:
  - Set and play his various emotes
  - Give him content to display

## Getting Started

### Prerequisites

- Node.js (for development server)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/townhall-sept-2025.git
   ```
2. Navigate to the project directory:
    ```bash
    cd townhall-sept-2025
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and navigate to:
    ```bash
    http://localhost:3000
    ```

## Usage Examples

### 90s Pop-up

```javascript
import { createPopup } from './modules/nineties-popup.js';

createPopup({
  title: '*** Best Viewed in 800x600 ***',
  headline: 'INCREDIBLE OFFER',
  subhead: 'Free upgrade to "Deluxe Clipart Pack"!',
  bullets: [
    'Unlimited glitter text (terms apply)',
    'Premium cursor trails (rainbow mode)',
    'Bonus: 30-day ICQ "invisible" status'
  ],
  ctaText: 'Install Now',
  onCta: () => alert('Installing... just kidding. Your IT team is safe.'),
  annoyMode: true,
  allowBounce: true
});
```

### Vertical Ad Banner

```javascript
import { createVerticalAdBanner } from './modules/vertical-ad-banner.js';

const banner = createVerticalAdBanner({
  position: 'right',
  header: 'HOT DEAL!',
  imageSrc: '/assets/amazing_free_stuff.gif',
  text: 'Get your FREE download pack! Limited time offer!',
  buttonText: 'CLAIM NOW',
  counterStart: 9999,
  onButtonClick: () => {
    alert('Congratulations! Your download is a free animated cursor pack!');
  }
});

// To remove the banner later:
banner.close();
```

### Glitter Background

```javascript
import { enablePageGlitter } from './modules/glitter-background.js';

const glitter = enablePageGlitter({
  density: 'medium',
  enableRainbow: true,
  enableDrift: true,
  enableRain: false
});

// To disable glitter effects:
glitter.disable();
```

### Clippy
The OG AI assistant, Clippy has now come to the web! Clippy just wants to help.
Spawn Clippy onto your page and:
- trigger his various emotes
- give him content to display

**Kind**: global class  

* [Clippy](#Clippy)
    * [new Clippy(containerEl, options)](#new_Clippy_new)
    * [.render(options)](#Clippy+render)
    * [.queueNextEmote(emote, [endBehaviour], [playImmediately])](#Clippy+queueNextEmote)
    * [.setDialogueContent(slideIndex)](#Clippy+setDialogueContent) ⇒ <code>void</code>
    * [.showDialogue()](#Clippy+showDialogue)
    * [.hideDialogue()](#Clippy+hideDialogue)

<a name="new_Clippy_new"></a>

#### new Clippy(containerEl, options)
Create an instance of Clippy.


| Param | Type | Description |
| --- | --- | --- |
| containerEl | <code>HTMLElement</code> | Container element to place Clippy in. |
| options | <code>Object</code> | A set of options you can pass. |
| [options.size] | <code>number</code> | The ratio to scale Clippy by; defaults to 1. |
| [options.startingEmote] | <code>string</code> | The name of the emote Clippy is rendered with. |
| [options.slides] | [<code>Array.&lt;DialogueContentData&gt;</code>](#DialogueContentData) | An array of data to display on Clippy's dialogue box |
| [options.startingPosition] | <code>Object</code> | Position where Clippy first renders |

<a name="Clippy+render"></a>

#### clippy.render(options)
Renders Clippy onto the page.

**Kind**: instance method of [<code>Clippy</code>](#Clippy)  
**Access**: public  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="Clippy+queueNextEmote"></a>

#### clippy.queueNextEmote(emote, [endBehaviour], [playImmediately])
Queues Clippy's next emote(s).

**Kind**: instance method of [<code>Clippy</code>](#Clippy)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| emote | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | A single emote or array of emotes that Clippy will display. If it is an array of emotes, they will be played in order. If playImmediately is disabled, Clippy is in the middle of an emote, play the queued emote(s) once the current emote ends. |
| [endBehaviour] | <code>&quot;loop&quot;</code> \| <code>&quot;stop-at-end&quot;</code> \| <code>&quot;return-to-blink&quot;</code> | <code>return-to-blink</code> | Behaviour of emote when it reaches the end |
| [playImmediately] | <code>boolean</code> | <code>false</code> | Flag to play animation immediately when this method is called. |

<a name="Clippy+setDialogueContent"></a>

#### clippy.setDialogueContent(slideIndex) ⇒ <code>void</code>
Sets the content of Clippy's dialogue box to one of the slides.

**Kind**: instance method of [<code>Clippy</code>](#Clippy)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| slideIndex | <code>number</code> | Index of the slide to set |

<a name="Clippy+showDialogue"></a>

#### clippy.showDialogue()
Shows Clippy's dialogue box on the currently selected slide.

**Kind**: instance method of [<code>Clippy</code>](#Clippy)  
**Access**: public  
<a name="Clippy+hideDialogue"></a>

#### clippy.hideDialogue()
Hide's Clippy's dialogue box.

**Kind**: instance method of [<code>Clippy</code>](#Clippy)  
**Access**: public  
<a name="DialogueContentData"></a>

### DialogueContentData : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Main message of content |
| [recipient] | <code>string</code> | Recipient of message |
| [sender] | <code>string</code> | Sender of message |
| [buttons] | <code>Array.&lt;Object&gt;</code> | Array of buttons to display and their action |
| buttons[].text | <code>string</code> | Text to display on button |
| [buttons[].action] | <code>&quot;next&quot;</code> \| <code>&quot;previous&quot;</code> \| <code>&quot;disabled&quot;</code> \| <code>&quot;hide&quot;</code> \| <code>&quot;hide-and-leave&quot;</code> | Behaviour of button |
| [emote] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | A single emote or array of emotes that Clippy will display. |
| [endBehaviour] | <code>&quot;loop&quot;</code> \| <code>&quot;stop-at-end&quot;</code> \| <code>&quot;return-to-blink&quot;</code> | Behaviour of emote when it reaches the end |
| [playImmediately] | <code>boolean</code> | Flag to play animation immediately when this method is called. |
| [nextSlideOnEmoteEnd] | <code>boolean</code> | Flag to switch to the next slide once the emote(s) end. |

<a name="EmoteData"></a>

### EmoteData : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of emote |
| rowIndex | <code>number</code> | Row position of emote in sprite sheet |
| duration | <code>number</code> | Duration of emote in milliseconds |
| numFrames | <code>number</code> | Number of frames of the emote |
