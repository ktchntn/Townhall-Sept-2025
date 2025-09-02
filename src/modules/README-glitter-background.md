# 90s Glitter Background

A nostalgic JavaScript module that adds customizable glitter and sparkle effects to your web pages, reminiscent of 90s web design.

## Overview

The `glitter-background.js` module provides an easy way to add animated glitter particles to any element on your webpage. It features various animation styles including floating, sparkling, twinkling, drifting, and even a rain effect. Perfect for adding that retro 90s feel to your modern web applications!

## Features

- Multiple animation types: float, sparkle, twinkle, drift, and rain
- Customizable particle density
- Rainbow color cycling option
- Configurable particle characters
- Custom color palettes
- Adjustable z-index for proper layering
- API for controlling the effect (start, stop, destroy)

## Installation

1. Include the module in your project:

```html
<script type="module">
  import { createGlitterBackground, enablePageGlitter } from './modules/glitter-background.js';
</script>
```

## Usage Examples

### Basic Usage
```javascript
// Create glitter effect on a specific element
const glitterElement = document.getElementById('glitter-container');
const glitter = createGlitterBackground(glitterElement, {
  animationType: 'float',
  density: 50,
  colors: ['#FF0000', '#00FF00', '#0000FF']
});

// Start the effect
glitter.start();
```

### Page-wide Glitter
```javascript
// Enable glitter across the entire page
enablePageGlitter({
  animationType: 'twinkle',
  density: 100,
  rainbow: true
});
```

### Advanced Configuration
```javascript
const advancedGlitter = createGlitterBackground(document.body, {
  animationType: 'drift',
  density: 75,
  characters: ['★', '✦', '✧', '✩', '✪'],
  colors: ['#FFD700', '#FFA500', '#FF6347'],
  zIndex: 1000,
  speed: 2
});
```

## API Reference

### `createGlitterBackground(element, options)`

Creates a glitter background effect on the specified element.

**Parameters:**
- `element` (HTMLElement): The DOM element to apply the effect to
- `options` (Object): Configuration options

**Options:**
- `animationType` (string): Type of animation ('float', 'sparkle', 'twinkle', 'drift', 'rain')
- `density` (number): Number of particles per 100px² (default: 30)
- `characters` (Array<string>): Characters to use as particles (default: ['✦', '✧', '✩', '✪'])
- `colors` (Array<string>): Color palette for particles (default: ['#FFFFFF', '#FFFF00', '#FF00FF'])
- `rainbow` (boolean): Whether to cycle through all colors (default: false)
- `zIndex` (number): CSS z-index value (default: 9999)
- `speed` (number): Animation speed multiplier (default: 1)

**Returns:**
- Object with methods: `start()`, `stop()`, `destroy()`

### `enablePageGlitter(options)`

Enables glitter effect across the entire page.

**Parameters:**
- `options` (Object): Configuration options (same as above)

**Returns:**
- Object with methods: `start()`, `stop()`, `destroy()`

## Animation Types

### Float
Particles move upward with random horizontal drift.

### Sparkle
Particles rapidly change opacity to create a sparkling effect.

### Twinkle
Particles slowly fade in and out with varying speeds.

### Drift
Particles move diagonally across the screen.

### Rain
Particles fall vertically from the top of the screen.

## Tips for Best Results

1. **Performance**: For better performance on mobile devices, reduce the density.
2. **Layering**: Use the `zIndex` option to ensure particles appear above other content.
3. **Colors**: Combine bright colors with low opacity for a subtle effect.
4. **Characters**: Use single characters for better performance.
5. **Responsive Design**: Consider adjusting density based on screen size.