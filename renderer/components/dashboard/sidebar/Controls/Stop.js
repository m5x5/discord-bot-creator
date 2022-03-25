import { StopIcon } from '@heroicons/react/solid';
import { ipcRenderer } from 'electron';
import { styled } from '../../../../stitches.config';
import Spinner from '../../../core/Spinner';
import { useControls } from './Context';

const Icon = styled(StopIcon, {
  color: '$danger',
  height: '$space$9',
  cursor: 'pointer',
});

export default function ControlsStop() {
  const [controls, setControls] = useControls();

  const stop = () => {
    if (controls.isStopping || controls.isStarting || controls.isSaving) return;
    setControls({ ...controls, isStopping: false, isRunning: false });
    ipcRenderer.on('onBotStop', onBotStop.bind(this));
    ipcRenderer.send('onBotStop');
  };

  const onBotStop = (_event, res = {}) => {
    if (res.success) {
      setControls({ ...controls, isStopping: false, isRunning: false });
    } else {
      setControls({ ...controls, isStopping: false, isRunning: true });
    }
  };

  return controls.isStopping ? (
    <Spinner color={'danger'} />
  ) : (
    <div onClick={stop} style={{ cursor: 'pointer' }}>
      <Icon />
    </div>
  );
}
