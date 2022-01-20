const path = require('path');
const execa = require('execa');

const defaultCommand = 'dev';
const commands = new Set(['init', 'build', defaultCommand]);

let cmd = process.argv[2];
let args = [];
let nodeArgs = [];

const inspectArg = process.argv.find((arg) => arg.includes('--inspect'));
if (inspectArg) {
  nodeArgs.push(inspectArg);
}

if (commands.has(cmd)) {
  args = process.argv.slice(3);
} else {
  cmd = defaultCommand;
  args = process.argv.slice(2);
}

const defaultEnv = cmd === 'dev' ? 'development' : 'production';
// @ts-ignore
process.env.NODE_ENV = process.env.NODE_ENV || defaultEnv;

const cli = path.join(__dirname, `nextron-${cmd}`);

const startProcess = () => {
  const proc = execa('node', [...nodeArgs, cli, ...args], { stdio: 'inherit' });
  proc.on('close', (code, signal) => {
    if (code !== null) {
      process.exit(code);
    }
    if (signal) {
      if (signal === 'SIGKILL') {
        process.exit(137);
      }
      process.exit(1);
    }
    process.exit(0);
  });
  proc.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
  return proc;
};

const proc = startProcess();

const wrapper = () => {
  if (proc) {
    proc.kill();
  }
};
process.on('SIGINT', wrapper);
process.on('SIGTERM', wrapper);
process.on('exit', wrapper);
