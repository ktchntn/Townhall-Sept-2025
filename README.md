
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