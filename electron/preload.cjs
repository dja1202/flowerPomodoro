const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// the electron APIs without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  isElectron: true,
});
