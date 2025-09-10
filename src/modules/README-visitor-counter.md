# 90s-Style Visitor Counter Documentation

## Overview

The Visitor Counter module provides a nostalgic 90s-style hit counter that can be added to any webpage. It features customizable appearance options including themes, animations, and special effects that recreate the authentic feel of early web design.

## Installation

1. Include the `visitor-counter.js` module in your project:

```javascript
import { createVisitorCounter } from './modules/visitor-counter.js';
```

## Basic Usage

```javascript
const counter = createVisitorCounter({
    container: document.querySelector('.counter-container'),
    label: 'Visitors:',
    startValue: 9876,
    digits: 6
});
```

## API Reference
### Main Functions

#### `createVisitorCounter(options)`

Creates and returns a new visitor counter instance.

```javascript
const counter = createVisitorCounter({
    container: document.querySelector('.counter-container'),
    label: 'VISITORS',
    startValue: 1000,
    digits: 6,
    theme: 'blue'
});
```

#### `createHitCounter(options)`

Creates a preset LCD-style hit counter.

```javascript
const hitCounter = createHitCounter({
    container: document.querySelector('.footer'),
    startValue: 50000
});
```
#### `createOnlineCounter(options)`

Creates a dynamic "online now" counter that fluctuates randomly.

```javascript
const onlineCounter = createOnlineCounter({
    container: document.querySelector('.sidebar')
});
```
#### `addVisitorCounter(options)`

Convenience function to add a counter to common page locations.

```javascript
const pageCounter = addVisitorCounter({
    theme: 'amber',
    sparkleEffect: true
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `container` | Element | `document.body` | DOM element to append the counter to |
| `label` | String | `'VISITORS'` | Text label displayed above the counter |
| `startValue` | Number | `1` | Initial counter value |
| `digits` | Number | `6` | Number of digits to display |
| `theme` | String | `'default'` | Color theme (`'default'`, `'blue'`, `'red'`, `'amber'`, `'pink'`) |
| `size` | String | `'medium'` | Counter size (`'small'`, `'medium'`, `'large'`) |
| `blinkEffect` | Boolean | `true` | Whether the label should blink |
| `glowEffect` | Boolean | `false` | Whether digits should have a glowing effect |
| `lcdStyle` | Boolean | `false` | Use LCD display style instead of CRT |
| `crtEffect` | Boolean | `true` | Enable CRT scan line effect |
| `sparkleEffect` | Boolean | `false` | Add sparkle animations to corners |
| `autoIncrement` | Boolean | `false` | Automatically increase counter over time |
| `incrementInterval` | Number | `60000` | Milliseconds between auto-increments |
| `incrementMin` | Number | `1` | Minimum random increment amount |
| `incrementMax` | Number | `5` | Maximum random increment amount |
| `onValueChange` | Function | `null` | Callback when counter value changes |
| `customClass` | String | `''` | Additional CSS class(es) to add |

### Preset Themes
- `default`: Green text on black background (classic terminal look)
- `blue`: Blue text on dark background
- `red`: Red text on dark background
- `amber`: Amber text on dark background (vintage terminal)
- `pink`: Pink text on dark background (90s web style)
- `preset-geocities`: Yellow text on purple/blue gradient (via `customClass: 'vc-preset-geocities'`)
- `preset-windows98`: Black text on gray background (via `customClass: 'vc-preset-windows98'`)

### Return Value

The `createVisitorCounter` function returns an object with the following properties and methods:
| Property/Method | Type | Description |
|-----------------|------|-------------|
| `element` | Element | The counter DOM element |
| `setValue(value)` | Function | Sets the counter to a specific value |
| `increment(amount)` | Function | Increases the counter by the specified amount (default: 1) |
| `getValue()` | Function | Returns the current counter value |
| `remove()` | Function | Removes the counter from the DOM and cleans up |


## Examples

### Basic Counter

```javascript
const basicCounter = createVisitorCounter({
    container: document.querySelector('.footer'),
    label: 'PAGE VIEWS',
    startValue: 12345,
    digits: 6
});
```
### Fancy Animated Counter

```javascript
const fancyCounter = createVisitorCounter({
    container: document.querySelector('.sidebar'),
    label: 'TOTAL HITS',
    startValue: 987654,
    digits: 8,
    theme: 'pink',
    size: 'large',
    glowEffect: true,
    sparkleEffect: true,
    autoIncrement: true,
    incrementInterval: 30000
});
```

### LCD-Style Counter

```javascript
const lcdCounter = createVisitorCounter({
    container: document.querySelector('.header'),
    label: 'VISITORS',
    startValue: 5000,
    digits: 6,
    lcdStyle: true,
    crtEffect: false,
    blinkEffect: false
});
```
### Windows 98 Style Counter

```javascript
const win98Counter = createVisitorCounter({
    container: document.querySelector('.stats'),
    label: 'DOWNLOADS',
    startValue: 3210,
    digits: 5,
    crtEffect: false,
    customClass: 'vc-preset-windows98'
});
```

## Styling
The counter can be further customized using CSS by targeting the following classes:

- `.vc-container`: The main counter container
- `.vc-label`: The counter label
- `.vc-digits`: The container for all digits
- `.vc-digit`: Individual digit elements