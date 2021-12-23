import { exec } from 'child_process';
import { Client } from 'discord.js';
import { dialog, ipcMain } from 'electron';
import { log } from 'electron-log';
import { copyFiles } from './copy-file';
import { addFolder, getFolders } from './folders';
import { Runner } from './index';
import Loader from './Loader';
import { clearLogs } from './logs';
import { validateFile } from './validate-files';

let loader: Loader | null = null;
let runner;

const BOT_FILES = [
  './data/settings.json',
  './data/players.json',
  './data/servers.json',
  './data/commands.json',
  './data/events.json',
  './package.json',
  './bot.js',
];

ipcMain.on('directoryDialog', async (event) => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
  });
  loader = new Loader({ filePath: filePaths[0] });
  runner = new Runner({ filePath: filePaths[0] });
  addFolder(filePaths[0]);

  event.sender.send('directoryDialog', filePaths[0]);
});

ipcMain.on('getLastDirectories', (event) => {
  event.sender.send('getLastDirectories', getFolders());
});

ipcMain.on('chooseDirectory', async (event, folder) => {
  if (typeof folder !== 'string') return;

  // Populate with files
  const invalidFiles = BOT_FILES.filter((file) => !validateFile(folder, file));
  log(invalidFiles);
  await copyFiles(folder, invalidFiles);

  loader = new Loader({ filePath: folder });
  runner = new Runner({ filePath: folder });

  log('npm installation is starting');
  const process = exec('npm install', {
    cwd: folder,
  });
  process.once('exit', () => {
    event.sender.send('chooseDirectory', folder);
    log('npm installation finished');
  });
});

ipcMain.on('getSettings', async (event, folder: string) => {
  console.log({ folder });
  if (typeof folder !== 'string') folder = loader.filePath;
  console.log('Getting settings');
  const settings = await Loader.getSettings(folder);
  event.sender.send('getSettings', settings);
});

ipcMain.handle('getBotInfo', async (event, folder: string) => {
  console.log({ folder });
  console.log('Getting bot info');
  if (typeof folder !== 'string') folder = null;
  const settings = JSON.parse(Loader.getSettings(folder));
  const token = settings?.token;
  const client = new Client({
    partials: ['USER'],
    intents: [],
  });
  console.log('Logging in');
  await client.login(token);
  console.log('Logged in');
  const icon = client.user.displayAvatarURL({ format: 'png' });
  const name = client.user.username;

  return { url: icon, name };
});

ipcMain.on('getActions', async (event) => {
  let actions = await loader?.getLocalActions();
  event.sender.send('getActions', actions);
});

// ipcMain.on('getConfig', async (event) => {
//   const config = await loader?.getConfig();
//   event.sender.send('getConfig', config);
// });

ipcMain.on('getCommands', async (event) => {
  const commands = await loader?.getCommands();
  event.sender.send('getCommands', commands);
});

ipcMain.on('getEvents', async (event) => {
  const events = await loader?.getEvents();
  event.sender.send('getEvents', events);
});

ipcMain.on('saveSettings', async (event, settings) => {
  await loader?.saveSettings(settings);
  event.sender.send('saveSettings', { success: true, settings });
});

ipcMain.on('saveCommands', async (event, commands) => {
  await loader?.saveCommands(commands);
  event.sender.send('saveCommands', { success: true, commands });
});

ipcMain.on('saveEvents', async (event, events) => {
  await loader?.saveEvents(events);
  event.sender.send('saveEvents', { success: true, events });
});

// Runner Events

ipcMain.on('onBotRun', async (event) => {
  try {
    await runner?.run();
    event.sender.send('onBotRun', { success: true });
  } catch (error) {
    event.sender.send('onBotRun', { success: false, error });
  }
});

ipcMain.on('onBotStop', async (event) => {
  try {
    await runner?.stop();
    event.sender.send('onBotStop', { success: true });
  } catch (error) {
    event.sender.send('onBotStop', { success: false, error });
  }
});

ipcMain.on('getLogs', () => {
  ipcMain.emit('onBotLog');
});

ipcMain.on('clearLogs', (event) => {
  clearLogs();
  event.sender.send('clearLogs', { success: true });
});
