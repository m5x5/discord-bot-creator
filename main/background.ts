import { app, globalShortcut, ipcMain, shell } from 'electron';
import serve from 'electron-serve';
import { createMenu, createWindow, Loader } from './helpers';
import './helpers/ipc';
import { addLog, getLogs } from './helpers/logs';

try {
  require('electron-reloader')(module);
} catch (e) {}

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 500,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
  }

  createMenu(mainWindow);

  // Register shortcuts
  globalShortcut.register('CommandOrControl+S', () => {
    const url = mainWindow.webContents.getURL();

    // Emit save event if we are in dashboard
    if (url.includes('/dashboard')) {
      mainWindow.webContents.send('save');
    }
  });

  // Open links in the browser instead
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  ipcMain.on('onBotLog', (log, _log) => {
    if (typeof log !== 'string') log = _log;
    if (log) addLog(log + '');
    mainWindow.webContents.send('onLogsUpdate', getLogs());
  });

  ipcMain.on('onBotError', (error) => {
    mainWindow.webContents.send('onErrorsUpdate', error);
  });

  Loader.watchActions((actions) => {
    mainWindow.webContents.send('actionsUpdate', actions);
  });
})();

app.on('window-all-closed', () => app.quit());
