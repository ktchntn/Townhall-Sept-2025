
# Windows 98 Media Player Component

A nostalgic recreation of the classic Windows Media Player from the 90s era, complete with authentic styling, draggable window functionality, and media playback controls.


## Overview

The Windows 98 Media Player component provides a fully functional media player with the classic Windows 98 aesthetic. It supports video playback with standard controls (play, pause, stop), volume adjustment, progress tracking, and playlist navigation. The component is designed to be a faithful recreation of the original Windows Media Player interface while providing modern functionality.

## Installation

The component is included in the project as an ES module. No additional installation is required.

## Basic Usage

```javascript
import { createMediaPlayer } from './modules/windows98-media-player.js';

// Create a simple media player with a single video
const player = createMediaPlayer({
  videos: [
    { title: "My Video", src: "./path/to/video.mp4" }
  ]
});
```

## Configuration Options

The `createMediaPlayer()` function accepts a configuration object with the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `videos` | Array | `[]` | Array of video objects with `title` and `src` properties |
| `width` | Number | `400` | Width of the player in pixels |
| `height` | Number | `300` | Height of the player in pixels |
| `autoplay` | Boolean | `false` | Whether to automatically play the first video |
| `draggable` | Boolean | `true` | Whether the player window can be dragged |
| `position` | Object | `{ top: '50px', left: '50px' }` | Initial position of the player |
| `centered` | Boolean | `false` | Whether to center the player horizontally |
| `initialVolume` | Number | `0.7` | Initial volume level (0-1) |

### Example with Full Configuration

```javascript
const mediaPlayer = createMediaPlayer({
  videos: [
    { title: "Introduction", src: "./videos/intro.mp4" },
    { title: "Tutorial", src: "./videos/tutorial.mp4" }
  ],
  width: 640,
  height: 480,
  autoplay: true,
  draggable: true,
  position: { top: '100px', left: '100px' },
  centered: true,
  initialVolume: 0.5
});
```
## API Reference

The `createMediaPlayer()` function returns an object with the following methods and properties:

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `element` | HTMLElement | The DOM element containing the media player |

### Methods

| Method | Parameters | Return Value | Description |
|--------|------------|--------------|-------------|
| `play()` | None | Promise | Starts playback of the current video |
| `pause()` | None | void | Pauses the current video |
| `stop()` | None | void | Stops playback and resets to the beginning |
| `loadVideo(index)` | `index`: Number | void | Loads a video from the playlist by index |
| `setVolume(level)` | `level`: Number (0-1) | void | Sets the volume level |
| `getVolume()` | None | Number (0-1) | Returns the current volume level |
| `getCurrentTime()` | None | Number | Returns the current playback position in seconds |
| `getDuration()` | None | Number | Returns the total duration of the current video in seconds |
| `close()` | None | void | Closes the media player and removes it from the DOM |
| `isPlaying()` | None | Boolean | Returns whether the video is currently playing |
| `onClose(callback)` | `callback`: Function | void | Sets a callback function to be called when the player is closed |
| `center()` | None | void | Centers the player horizontally on the screen |

## Events

The Windows 98 Media Player component handles various events to provide an interactive user experience that mimics the original Windows 98 Media Player.

### User Interface Events

| Event | Element | Description |
|-------|---------|-------------|
| `click` on play button | Transport controls | Starts video playback |
| `click` on pause button | Transport controls | Pauses video playback |
| `click` on stop button | Transport controls | Stops playback and resets to beginning |
| `click` on previous button | Transport controls | Loads the previous video in the playlist |
| `click` on next button | Transport controls | Loads the next video in the playlist |
| `click` on rewind button | Transport controls | Jumps backward 10 seconds |
| `click` on forward button | Transport controls | Jumps forward 10 seconds |
| `click` on progress bar | Progress container | Seeks to the clicked position in the video |
| `input` on volume slider | Volume control | Adjusts the playback volume |
| `click` on close button | Titlebar | Closes the media player |
| `click` on menu items | Menu bar | Shows status message (visual only) |

### Video Events

The component also listens for standard HTML5 video events:

| Event | Description |
|-------|-------------|
| `timeupdate` | Updates the progress bar as the video plays |
| `ended` | Automatically plays the next video or shows "Finished" status |
| `loadedmetadata` | Updates the player UI when video metadata is loaded |
| `error` | Handles video loading errors |

### Draggable Window

The media player window can be dragged around the screen by clicking and dragging the titlebar, providing an authentic Windows 98 window experience.

### Example: Adding Custom Event Handlers

You can extend the player's functionality by adding your own event handlers:

```javascript
const player = createMediaPlayer({ videos: [...] });

// Add a custom event handler for the video element
player.element.querySelector('.win98-player-video').addEventListener('play', () => {
  console.log('Video started playing');
});

// Track when the video is halfway complete
player.element.querySelector('.win98-player-video').addEventListener('timeupdate', (e) => {
  const video = e.target;
  if (video.currentTime >= video.duration / 2 && !video.halfwayReached) {
    console.log('Video is halfway complete');
    video.halfwayReached = true;
  }
});
```

## Styling

The component injects its own CSS styles that recreate the Windows 98 aesthetic, including:

- Classic Windows 98 window border and titlebar
- Blue gradient titlebar with window controls
- Gray interface with 3D-effect buttons
- Authentic Windows 98 icons and controls

## Usage Examples

```javascript
import { createMediaPlayer } from './modules/windows98-media-player.js';

// Define videos for the playlist
const videos = [
  { title: "Welcome Video", src: "./assets/videos/welcome.mp4" },
  { title: "Tutorial", src: "./assets/videos/tutorial.mp4" }
];

// Create the media player
const player = createMediaPlayer({
  videos: videos,
  width: 640,
  height: 480,
  centered: true,
  initialVolume: 0.8
});

// Add a close handler
player.onClose(() => {
  console.log("Media player was closed");
});

// Example of controlling the player programmatically
document.getElementById('play-button').addEventListener('click', () => {
  player.play();
});

document.getElementById('pause-button').addEventListener('click', () => {
  player.pause();
});
```
