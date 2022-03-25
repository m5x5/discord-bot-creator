import { PlayIcon } from '@heroicons/react/solid';
import { ipcRenderer } from 'electron';
import { log } from 'electron-log';
import { styled } from '../../../../stitches.config';
import Spinner from '../../../core/Spinner';
import { useControls } from './Context';

const Icon = styled(PlayIcon, {
  color: '$success',
  height: '$space$9',
  cursor: 'pointer',
});

export default function ControlsStart() {
  const [controls, setControls] = useControls();
  const { isStopping, isStarting, isSaving } = controls;

  const run = () => {
    if (isStopping || isStarting || isSaving) return;
    setControls({ ...controls, isStarting: true });

    ipcRenderer.on('onBotRun', (_event, res = {}) => {
      log({ res });
      if (res.success) {
        setControls({ ...controls, isStarting: false, isRunning: true });
      } else {
        setControls({ ...controls, isStarting: false, isRunning: false });
      }
    });
    ipcRenderer.send('onBotRun');
  };

  return isStarting ? (
    <Spinner />
  ) : (
    <div onClick={run}>
      <Icon />
    </div>
  );
}
