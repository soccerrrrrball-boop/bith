# Quick Start Guide

Get up and running in 3 minutes!

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:3000`

## What You'll See

1. **Loading Screen**: Animated cake icon with progress bar
2. **Welcome Message**: Instructions for interacting with the cake
3. **3D Scene**: 
   - Birthday cake in the center
   - Knife that follows your mouse/touch
   - Four candles around the cake
   - Progress bar in top-right

## Try These Interactions

### Mouse/Touch
- **Drag** the knife over the cake to cut it
- **Click** a candle to light/blow it
- **Double-click** a candle for sparkle effect

### Keyboard
- **Enter**: Trigger cut animation
- **Space**: Toggle music
- **Arrow Keys**: Move knife
- **1-4**: Toggle candles

## After Cutting

1. Cake splits into two halves
2. Particles (crumbs, confetti) appear
3. Birthday message appears
4. Share card with snapshot option

## Troubleshooting

### Blank Screen
- Check browser console for errors
- Ensure WebGL is supported (most modern browsers)
- App will auto-fallback to 2D canvas if WebGL unavailable

### No Audio
- Browser may block autoplay
- Click the music button to enable
- Check browser audio permissions

### Performance Issues
- Close other browser tabs
- Try a different browser (Chrome/Firefox recommended)
- Reduce window size

## Next Steps

- Add custom 3D models (see `ASSETS.md`)
- Replace placeholder audio files
- Customize colors and text in components
- Deploy to production (see `README.md`)

Enjoy! 🎂🎉

