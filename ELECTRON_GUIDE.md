# Quick Start Guide

## Running the Electron App

### Development Mode (Recommended for testing)

```bash
npm run electron:dev
```

This command will:
- Start the Vite development server
- Launch the Electron desktop application
- Enable hot-reload for instant updates
- Open DevTools for debugging

### Production Build

1. First, build the React application:
```bash
npm run build
```

2. Then package it as an Electron app:
```bash
npm run electron:build
```

The packaged app will be in the `release` folder.

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, stop other processes using that port or change the port in `vite.config.ts`.

### Electron Not Starting
Make sure all dependencies are installed:
```bash
npm install
```

### Build Errors
Clear the dist and node_modules folders, then reinstall:
```bash
rm -rf dist node_modules
npm install
```

## What Changed

The application has been converted from a web-only React app to an Electron desktop application. Here's what's new:

1. **Electron Files**:
   - `/electron/main.cjs` - Main Electron process (creates the desktop window)
   - `/electron/preload.cjs` - Preload script for security

2. **New Scripts**:
   - `electron:dev` - Run in development mode
   - `electron:build` - Build distributable app
   - `package` - Create app package
   - `dist` - Create installers for your platform

3. **Benefits**:
   - Runs as a native desktop app (no browser required)
   - Better performance
   - Access to system APIs (if needed in future)
   - Can be distributed as standalone app
   - Works offline by default

The React code itself remains unchanged - the same beautiful Pomodoro timer experience, now as a desktop app!
