# Grow Your Focus Garden - Electron Desktop App

A calm and aesthetic Pomodoro timer desktop application where you grow virtual flowers during focus sessions.

## Features

- 🌸 Choose from 5 beautiful flowers (Daisy, Tulip, Sunflower, Rose, Lotus)
- ⏱️ Timed focus sessions (25-60 minutes)
- 🌱 Watch your flower grow through 5 stages as you focus
- 🏡 Collect completed flowers in your personal garden
- 🎵 Optional lofi music background
- 💾 LocalStorage persistence for your flower collection

## Technology Stack

- **Frontend**: React 18.3.1, React Router, Tailwind CSS
- **Desktop Framework**: Electron.js
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Development

Run the app in development mode with hot-reload:

```bash
npm run electron:dev
```

This will:
1. Start the Vite dev server at http://localhost:5173
2. Launch the Electron app automatically
3. Enable hot-reload for React components
4. Open DevTools for debugging

### Building for Production

Build the React app:

```bash
npm run build
```

Package the Electron app (without installer):

```bash
npm run package
```

Create distributable installers:

```bash
npm run dist
```

This will create platform-specific installers in the `release` folder:
- **macOS**: .dmg and .zip files
- **Windows**: .exe (NSIS installer) and portable .exe
- **Linux**: .AppImage and .deb

## Project Structure

```
├── electron/
│   ├── main.cjs          # Electron main process
│   └── preload.cjs       # Preload script for security
├── src/
│   ├── app/
│   │   ├── components/   # React components
│   │   ├── screens/      # Screen components
│   │   ├── routes.ts     # React Router configuration
│   │   └── types.ts      # TypeScript types
│   └── styles/           # CSS and Tailwind files
├── package.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev` - Start Vite dev server only
- `npm run electron` - Start Electron with compiled build
- `npm run electron:dev` - Full development mode (Vite + Electron)
- `npm run build` - Build React app for production
- `npm run electron:build` - Build and package Electron app
- `npm run package` - Package app without creating installer
- `npm run dist` - Create distributable installers

## How to Use

1. **Choose a Flower**: Select from 5 flower types, each with different focus durations
2. **Grow**: Click the "Grow" button to start your focus session
3. **Focus**: Watch your flower grow through 5 stages as the timer counts down
4. **Pause/Resume**: Use the pause button if you need a break
5. **Garden**: View all your completed focus sessions in your personal garden
6. **Repeat**: Grow more flowers to build your collection!

## Customization

The app uses Quicksand font throughout for a calm, cozy aesthetic. Colors are soft pastels with rounded UI elements and subtle shadows.

## License

Private - All Rights Reserved
