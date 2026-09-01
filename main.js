const { app, BrowserWindow, ipcMain, session, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;

function applyCsp() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;"
        ],
      },
    });
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 640,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#f7f1e6',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  applyCsp();
  mainWindow.loadFile('renderer/index.html');

  mainWindow.webContents.once('did-finish-load', () => {
    setTimeout(() => autoUpdater.checkForUpdates().catch(() => {}), 3000);
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });

// ── 자동 업데이트 ──
autoUpdater.on('update-available', (info) => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: '업데이트 알림',
    message: `새 버전(v${info.version})이 있습니다.`,
    detail: '백그라운드에서 다운로드를 시작합니다. 완료되면 알려드리겠습니다.',
    buttons: ['확인'],
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: '업데이트 준비 완료',
    message: '새 버전 다운로드가 완료되었습니다.',
    detail: '지금 재시작하면 업데이트가 적용됩니다.',
    buttons: ['지금 재시작', '나중에'],
    defaultId: 0,
  }).then(({ response }) => {
    if (response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on('error', (err) => {
  console.log('AutoUpdater error:', err.message);
});

autoUpdater.on('update-not-available', () => {
  console.log('최신 버전 사용 중');
});

autoUpdater.on('download-progress', (progress) => {
  mainWindow.setProgressBar(progress.percent / 100);
});

// ── IPC ──
ipcMain.on('go-app', () => {
  // 캐시된 이전 프로필 상태(bfcache)가 재사용되지 않도록 매번 새 쿼리로 로드
  mainWindow.loadFile('renderer/app.html', { search: `t=${Date.now()}` });
});

ipcMain.on('logout', () => {
  mainWindow.setProgressBar(-1);
  mainWindow.loadFile('renderer/index.html');
});

ipcMain.on('check-update', () => {
  autoUpdater.checkForUpdates().catch(() => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: '업데이트 확인',
      message: '업데이트를 확인할 수 없습니다.',
      detail: '인터넷 연결을 확인해주세요.',
      buttons: ['확인'],
    });
  });
});
