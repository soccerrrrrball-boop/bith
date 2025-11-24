# 🎂 Interactive 3D Birthday Cake Website

An advanced, responsive single-page website featuring a realistic 3D scene where users can interactively cut a birthday cake with mouse/touch controls.

## ✨ Features

- **3D Interactive Scene**: Built with React Three Fiber and Three.js
- **Mouse/Touch Controls**: Drag the knife to cut the cake
- **Realistic Animations**: GSAP-powered smooth animations and transitions
- **Particle Effects**: Crumbs, frosting particles, and confetti
- **Candle Interactions**: Click to light/blow candles, double-click for wish effect
- **Progress Tracking**: Visual progress bar showing cut completion
- **Share Functionality**: Capture and download/share snapshots
- **Accessibility**: Full keyboard support and ARIA labels
- **Mobile Optimized**: Touch gestures and responsive design
- **WebGL Fallback**: 2D canvas animation for unsupported devices
- **Music Player**: Optional birthday music with play/pause

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## 🎮 Controls

### Mouse/Touch
- **Drag**: Move the knife to cut the cake
- **Click candle**: Toggle candle on/off
- **Double-click candle**: Trigger "make a wish" sparkle effect

### Keyboard
- **Enter**: Trigger cut animation
- **Space**: Toggle music play/pause
- **Arrow Keys**: Move knife (Left/Right/Up/Down)
- **1-4**: Toggle candles (1-4)

## 📁 Project Structure

```
birthday-cake-3d/
├── src/
│   ├── components/
│   │   ├── Scene.jsx          # Main 3D scene container
│   │   ├── Cake.jsx           # Cake model with split animation
│   │   ├── Knife.jsx          # Interactive knife component
│   │   ├── Candles.jsx        # Candle components with interactions
│   │   ├── Particles.jsx      # Particle systems (crumbs, confetti)
│   │   ├── Lighting.jsx       # Scene lighting setup
│   │   ├── UI.jsx             # Main UI container
│   │   ├── Loader.jsx         # Loading screen with progress
│   │   ├── ProgressBar.jsx    # Cut progress indicator
│   │   ├── WelcomeMessage.jsx # Welcome screen
│   │   ├── ShareCard.jsx      # Share/download functionality
│   │   ├── MusicPlayer.jsx    # Music controls
│   │   └── Fallback2D.jsx    # 2D canvas fallback
│   ├── hooks/
│   │   └── useKeyboardControls.js  # Keyboard accessibility
│   ├── utils/
│   │   └── animations.js      # GSAP animation utilities
│   ├── store.js              # Zustand state management
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Changing the Birthday Name

Edit `src/components/WelcomeMessage.jsx`:

```jsx
<h1>🎂 Happy Birthday, [Name]! 🎂</h1>
```

### Adding Custom 3D Models

1. Export your cake model as GLB/GLTF format
2. Place in `public/models/`
3. Update `src/components/Cake.jsx`:

```jsx
import { useGLTF } from '@react-three/drei'

const { scene } = useGLTF('/models/cake.glb')
```

### Custom Audio

Replace placeholder audio in:
- `src/components/Candles.jsx` (candle blow sound)
- `src/components/MusicPlayer.jsx` (background music)

Place audio files in `public/audio/` and update paths.

## 🎯 Performance Optimizations

- **LODs**: Level-of-detail models for different device capabilities
- **Compressed Textures**: Use KTX2/Basis compression
- **Draco Compression**: Compress GLTF geometry
- **Progressive Loading**: Suspense boundaries for async loading
- **Mobile Detection**: Lower poly models on mobile devices

## ♿ Accessibility

- Full keyboard navigation support
- ARIA labels on all interactive elements
- Focus outlines for keyboard users
- Screen reader friendly
- High contrast UI elements

## 📱 Mobile Support

- Touch gesture support for dragging
- Pinch-to-zoom (limited range)
- Optimized performance for mobile devices
- Responsive UI layout

## 🧪 Testing

```bash
npm test
```

Unit tests cover:
- Cut action detection
- Candle toggle functionality
- Share snapshot generation
- Keyboard controls

## 📦 Production Build

```bash
npm run build
```

Output will be in the `dist/` directory, ready for deployment.

## 🎁 Assets

### 3D Models Needed

For production, you'll need:
- **Cake Model**: Multi-tiered birthday cake (GLB/GLTF)
  - Optional: Morph targets or separate halves for split animation
- **Character Model**: Stylized female character (optional, for future enhancement)
- **Knife Model**: Simple knife geometry (currently procedural)

### Audio Files

- Ambient birthday music (loop)
- Candle flame whoosh sound
- Cake cutting sound effect
- Confetti pop sound

**Note**: Ensure all assets are royalty-free or properly licensed.

### Recommended Asset Sources

- **3D Models**: Sketchfab, TurboSquid, or custom Blender exports
- **Audio**: Freesound.org, Zapsplat, or custom recordings
- **Textures**: Poly Haven, CC0 Textures

## 🐛 Troubleshooting

### WebGL Not Supported

The app automatically falls back to a 2D canvas version if WebGL is unavailable.

### Performance Issues

- Reduce particle count in `src/components/Particles.jsx`
- Lower shadow map resolution in `src/components/Lighting.jsx`
- Disable post-processing effects on low-end devices

### Audio Not Playing

- Check browser autoplay policies
- Ensure audio files are properly loaded
- Verify Howler.js initialization

## 📄 License

This project is provided as-is for educational and personal use. Ensure all third-party assets (3D models, audio) are properly licensed.

## 🙏 Credits

Built with:
- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [GSAP](https://greensock.com/gsap/)
- [Howler.js](https://howlerjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🎉 Enjoy!

Have fun cutting the cake and celebrating birthdays! 🎂🎈🎉

"# bith" 
