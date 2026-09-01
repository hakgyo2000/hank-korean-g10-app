const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  goApp: () => ipcRenderer.send('go-app'),
  logout: () => ipcRenderer.send('logout'),
  checkUpdate: () => ipcRenderer.send('check-update'),
});
