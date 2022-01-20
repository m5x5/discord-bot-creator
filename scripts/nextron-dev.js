const arg = require('arg');
const delay = require('delay');
const execa = require('execa');
const configure = require('../webpack.config');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const log = require('../logger');
const pidtree = require('pidtree');

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '--port': Number,
  '--remote-debugging-port': Number,
  '--inspect': Number,
  '--run-only': Boolean,
  '-v': '--version',
  '-p': '--port',
  '-r': '--run-only',
});

const rendererPort = args['--port'] || 8888;
// const remoteDebuggingPort = args["--remote-debugging-port"] || 5858;
// const inspectPort = args["--inspect"] || 9292;

const execaOptions = {
  cwd: process.cwd(),
  stdio: 'inherit',
  windowsHide: false,
};

async function killTree(pid) {
  const pids = await pidtree(pid);
  for (const pid of pids) {
    try {
      process.kill(pid, 'SIGKILL');
    } catch (e) {
      // ignore
    }
  }
}

async function dev() {
  let firstCompile = true;
  let watching;
  let mainProcess;
  let rendererProcess;

  const startMainProcess = () => {
    log('Starting main process...');
    mainProcess = execa(
      'electron',
      [
        '.',
        `${rendererPort}`,
        // `--remote-debugging-port=${remoteDebuggingPort}`,
        // `--inspect=${inspectPort}`,
      ],
      {
        detached: false,
        ...execaOptions,
      }
    );
    mainProcess.unref();
  };

  const startRendererProcess = () => {
    const child = execa('next', ['-p', rendererPort, 'renderer'], execaOptions);
    child.on('close', () => {
      process.exit(0);
    });
    return child;
  };

  const killWholeProcess = () => {
    if (watching) {
      watching.close(() => {});
    }
    if (mainProcess) {
      mainProcess.kill();
    }
    if (rendererProcess) {
      rendererProcess.kill();
    }
  };

  const webpackCallback = async (err) => {
    log('firstCompile: ' + firstCompile);
    if (err) {
      console.error(err.stack || err);
    }

    if (firstCompile) {
      log('Setting firstCompile to false');
      firstCompile = false;
    }

    if (!err) {
      if (!firstCompile && mainProcess) {
        log('Killing main process');
        killTree(mainProcess.pid);
        mainProcess.kill();
      }
      startMainProcess();
    }
  };

  process.on('SIGINT', killWholeProcess);
  process.on('SIGTERM', killWholeProcess);
  process.on('exit', killWholeProcess);

  rendererProcess = startRendererProcess();

  // wait until renderer process is ready
  await delay(8000);

  const compiler = webpack(
    merge(configure('development'), {
      entry: path.join(process.cwd(), 'main', `background.ts`),
    })
  );
  if (args['--run-only']) {
    compiler.run(webpackCallback);
  } else {
    watching = compiler.watch({}, webpackCallback);
  }
}

dev();
