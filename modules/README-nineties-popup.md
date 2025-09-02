
# 90s-Style Popup Module

A nostalgic JavaScript module that creates authentic 90s-style popup windows with all the classic features: blinking text, draggable windows, "screensaver" bounce animations, and more!

## Features

- 🖱️ Draggable windows with classic titlebar
- ✨ Authentic 90s styling with gradients, inset borders, and blinking text
- 🔄 "Screensaver" bounce animation
- 🎯 Focus trapping for accessibility
- 🚫 Annoying "Are you sure?" follow-up popups
- 📱 Mobile-friendly with touch support
- 🌈 No dependencies, pure JavaScript

## Installation

Simply copy the `nineties-popup.js` file to your project.

## API Reference

### Main Function

```javascript
import { createPopup } from './modules/nineties-popup.js';

const popup = createPopup({
  // options here
});
```
The `createPopup()` function returns an object with:
- `element`: The popup DOM element
- `close()`: Method to programmatically close the popup

## Options you can pass to createPopup({...})

- `title` (string) – window titlebar text (blinks, very 1999).
- `headline` / `subhead` (string) – bold hero text.
- `bullets` (string[]) – list items with ★ markers.
- `ctaText` (string) – label for the green "Install/Claim" button.
- `onCta` (fn) – callback when CTA is clicked.
- `onClose` (fn) – callback when popup is closed.
- `allowBounce` (boolean) – screensaver-style window bounce.
- `autoFocus` (boolean) – focus first control on open.
- `annoyMode` (boolean) – clicking "No thanks" spawns a "WAIT! FINAL WARNING" popup.
- `startPosition` ({top,left}) – px coords to place the window.

## Drop-in across pages

Put nineties-popup.js in a shared /js/ folder.

On each HTML file, import with <script type="module"> and call createPopup(...) where you need it.

No CSS files required; styles are injected once per page.

## Usage Example

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>90s Popup Demo</title>
  </head>
  <body>
    <h1>My Page</h1>

    <button id="spawn">Spawn Popup</button>

    <script type="module">
      import { createPopup } from './modules/nineties-popup.js';

      document.getElementById('spawn').addEventListener('click', () => {
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
          onCta: () => alert('Installing… just kidding. Your IT team is safe.'),
          annoyMode: true,
          allowBounce: true
        });
      });

      // Optional: auto-show one on load
      window.addEventListener('DOMContentLoaded', () => {
        createPopup({
          title: 'YOU WON A SCREENSAVER',
          headline: 'FINAL NOTICE',
          subhead: 'Your free Flying Toasters expire soon!',
          bullets: ['Hypnotic 3D pipes', 'Minesweeper pro tips', 'Dial-up tone ringtone'],
          ctaText: 'Claim Toasters',
          allowBounce: true
        });
      });
    </script>
  </body>
</html>
```



