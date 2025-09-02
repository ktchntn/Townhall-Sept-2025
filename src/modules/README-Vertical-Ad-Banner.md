# 90s-Style Vertical Ad Banner

A nostalgic component that creates authentic 90s-style vertical ad banners for your web applications. Perfect for retro websites, April Fools' jokes, or any project that needs that classic web 1.0 aesthetic.

![90s Vertical Ad Banner Example](https://placeholder-for-banner-screenshot.png)

## Features

- 🌈 Authentic 90s styling with gradient backgrounds and Comic Sans
- ✨ Optional sparkle and floating animation effects
- 🔢 Animated visitor counter that decreases over time
- 📱 Responsive design that works on modern devices
- 🎯 Customizable position (left or right side of the screen)
- 🖼️ Support for custom images and text
- 🔄 Callback functions for button clicks and close events

## Installation

Import the module into your project:

```javascript
import { createVerticalAdBanner } from './modules/vertical-ad-banner.js';
```

## Basic Usage

Create a simple banner with default settings:

```javascript
createVerticalAdBanner();
```

## Customization Options

create a fully customized banner:

```javascript
const banner = createVerticalAdBanner({
  position: 'left',                // 'left' or 'right' side of the screen
  header: 'AMAZING OFFER!',        // Banner headline text
  imageSrc: '/path/to/image.gif',  // Path to your banner image
  imageAlt: 'Special offer',       // Alt text for accessibility
  text: 'Limited time offer!',     // Main banner text
  buttonText: 'CLICK HERE',        // Text for the call-to-action button
  counterStart: 9999,              // Starting value for visitor counter
  counterEnd: 1,                   // Ending value for visitor counter
  counterSpeed: 100,               // Speed of counter decrease in ms
  floatingEffect: true,            // Enable/disable floating animation
  sparkleEffect: true,             // Enable/disable sparkle effect
  
  // Callback when button is clicked
  onButtonClick: () => {
    alert('Thanks for clicking!');
  },
  
  // Callback when banner is closed
  onClose: () => {
    console.log('Banner was closed');
  }
});
```

## API Reference

### `createVerticalAdBanner(options)`

Creates and displays a vertical ad banner.

#### Parameters

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | string | `'right'` | Position of the banner (`'left'` or `'right'`) |
| `header` | string | `'HOT DEAL!'` | Header text displayed at the top |
| `imageSrc` | string | `/assets/amazing_free_stuff.gif` | Path to the banner image |
| `imageAlt` | string | `'90s Advertisement'` | Alt text for the image |
| `text` | string | `'Click NOW for your FREE download!'` | Main text content |
| `buttonText` | string | `'Download'` | Text for the call-to-action button |
| `counterStart` | number | `9999` | Starting value for the visitor counter |
| `counterEnd` | number | `1` | Minimum value for the counter |
| `counterSpeed` | number | `100` | Milliseconds between counter decrements |
| `floatingEffect` | boolean | `true` | Enable floating animation for the image |
| `sparkleEffect` | boolean | `true` | Enable sparkle effect around the header |
| `onButtonClick` | function | Alert message | Callback when button is clicked |
| `onClose` | function | `null` | Callback when banner is closed |

#### Returns

An object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `element` | HTMLElement | The banner DOM element |
| `close` | function | Method to programmatically close the banner |

## Examples

### Basic Banner

```javascript
createVerticalAdBanner({
  header: 'SPECIAL OFFER',
  text: 'Get your FREE screensaver pack!',
  buttonText: 'DOWNLOAD NOW'
});
```

### Banner with Custom Image and Callbacks

```javascript
const banner = createVerticalAdBanner({
  position: 'left',
  header: 'HOT DEAL!',
  imageSrc: '/assets/amazing_free_stuff.gif',
  text: 'Get your FREE anniversary gift pack! Limited time offer!',
  buttonText: 'CLAIM NOW',
  counterStart: 8888,
  onButtonClick: () => {
    alert('Congratulations! Your gift has been claimed!');
  },
  onClose: () => {
    console.log('User closed the banner');
  }
});
```
### Programmatically Closing the Banner

```javascript
const banner = createVerticalAdBanner();

// Close the banner after 10 seconds
setTimeout(() => {
  banner.close();
}, 10000);
```