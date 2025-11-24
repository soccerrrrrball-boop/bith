# Assets Guide

This document outlines the assets needed for the birthday cake website and where to place them.

## Required Assets

### 3D Models

Place GLB/GLTF files in `public/models/`:

- **cake.glb** (or cake.gltf)
  - Multi-tiered birthday cake model
  - Optional: Include morph targets or separate halves for split animation
  - Recommended: Draco compression for smaller file size
  - Texture formats: KTX2 or Basis for optimal compression

- **knife.glb** (optional)
  - Currently using procedural geometry
  - Can be replaced with custom model

- **character.glb** (optional, for future enhancement)
  - Stylized female character with simple arm rig
  - For adding character to scene

### Audio Files

Place audio files in `public/audio/`:

- **birthday-music.mp3** (or .ogg, .wav)
  - Ambient birthday music (looping)
  - Update path in `src/components/MusicPlayer.jsx`

- **candle-blow.mp3**
  - Candle flame whoosh sound
  - Update path in `src/components/Candles.jsx`

- **cake-cut.mp3** (optional)
  - Cake cutting sound effect
  - Can be added to cut sequence

- **confetti-pop.mp3** (optional)
  - Confetti burst sound
  - Can be added to particle effects

### Textures

Place texture files in `public/textures/`:

- **confetti-texture.png** (optional)
  - Background confetti texture
  - Can be used for UI backgrounds

- **cake-texture.jpg** (if not embedded in GLB)
  - Cake texture maps
  - Frosting, sprinkles, etc.

### Image Assets

Place images in `public/images/`:

- **fallback-cake.png** (optional)
  - 2D sprite for low-power device fallback
  - Used in `src/components/Fallback2D.jsx`

## Asset Optimization

### 3D Models

1. **Compression**:
   - Use Draco compression for geometry
   - Compress textures with KTX2 or Basis
   - Optimize polygon count (target: <10k triangles for cake)

2. **LODs**:
   - Create multiple detail levels
   - Use lower poly models for mobile

3. **Textures**:
   - Maximum 2048x2048 resolution
   - Use compressed formats (KTX2, Basis)
   - Bake lighting if possible

### Audio

1. **Formats**:
   - Provide multiple formats (MP3, OGG, WAV)
   - Use OGG for better compression
   - Keep file sizes under 1MB per track

2. **Optimization**:
   - Normalize audio levels
   - Trim silence from beginning/end
   - Use appropriate bitrates (128kbps for music, 64kbps for effects)

## Licensing

**Important**: Ensure all assets are:
- Royalty-free
- Properly licensed for commercial use
- Attributed if required by license

### Recommended Sources

- **3D Models**: 
  - Sketchfab (filter by CC0/CC-BY)
  - TurboSquid (check license)
  - Poly Haven (CC0)
  - Blender (create custom)

- **Audio**:
  - Freesound.org (check license)
  - Zapsplat (requires attribution)
  - Incompetech (royalty-free with attribution)

- **Textures**:
  - Poly Haven (CC0)
  - CC0 Textures
  - AmbientCG

## File Structure

```
public/
├── models/
│   ├── cake.glb
│   ├── knife.glb (optional)
│   └── character.glb (optional)
├── audio/
│   ├── birthday-music.mp3
│   ├── candle-blow.mp3
│   ├── cake-cut.mp3 (optional)
│   └── confetti-pop.mp3 (optional)
├── textures/
│   ├── confetti-texture.png (optional)
│   └── cake-texture.jpg (optional)
└── images/
    └── fallback-cake.png (optional)
```

## Updating Code to Use Assets

### Cake Model

In `src/components/Cake.jsx`:

```jsx
import { useGLTF } from '@react-three/drei'

const { scene } = useGLTF('/models/cake.glb')
// Use scene instead of procedural geometry
```

### Audio Files

In `src/components/MusicPlayer.jsx`:

```jsx
birthdayMusic.current = new Howl({
  src: ['/audio/birthday-music.mp3', '/audio/birthday-music.ogg'],
  loop: true,
  volume: 0.3
})
```

In `src/components/Candles.jsx`:

```jsx
const candleBlowSound = new Howl({
  src: ['/audio/candle-blow.mp3'],
  volume: 0.3
})
```

## Current Implementation

The current implementation uses:
- **Procedural geometry** for cake and knife (no external models required)
- **Placeholder audio** (base64 encoded silence)
- **Procedural particles** (no texture sprites)

This allows the app to run immediately without external assets, but for production, replace with optimized 3D models and proper audio files.

