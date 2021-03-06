import { fork } from 'child_process';
import { ipcMain } from 'electron';
import { log } from 'electron-log';
import path from 'path';
import { copyFiles } from './copy-file';
import Loader from './Loader';

export default class Runner {
  filePath: string;
  botProcess: any;
  constructor(runner = { filePath: '' }) {
    this.filePath = runner.filePath;
    process.on('exit', () => {
      if (this.botProcess) {
        this.botProcess.kill();
        this.botProcess = null;
      }
    });
  }
  async run() {
    const settings = JSON.parse(Loader.getSettings(this.filePath));
    if (settings?.updateBeforeRun) {
      await copyFiles(this.filePath);
    }

    return new Promise(async (resolve, reject) => {
      log('Running:', this.filePath);
      if (this.botProcess) await this.stop();
      const botFile = path.join(this.filePath, 'bot.js');

      this.botProcess = fork(botFile, {
        cwd: this.filePath,
        detached: true,
      });

      this.botProcess.on('message', (message) => {
        if (typeof message === 'object') {
          log(JSON.stringify(message, null, 2));
        } else {
          log('from script: ' + message);
        }

        if (message === 'ready') return resolve('Ready');
        if (message.type === 'error') {
          delete message.type;
          ipcMain.emit('onBotError', message);
        }
      });

      this.botProcess.on('exit', (code) => {
        log('Bot process exited with code:', code);
        reject();
      });
    });
  }
  stop() {
    if (!this.botProcess) return;

    log('Stopping:', this.botProcess.pid);

    if (this.botProcess) {
      this.botProcess.kill();
      this.botProcess = null;
    }
  }
}
