import { SaveIcon } from '@heroicons/react/solid';
import { ipcRenderer } from 'electron';
import { log } from 'electron-log';
import { useEffect } from 'react';
import { styled } from '../../../../stitches.config';
import Spinner from '../../../core/Spinner';
import { useControls } from './Context';

const Icon = styled(SaveIcon, {
  color: '$success',
  height: '$space$9',
  cursor: 'pointer',
});

export default function ControlsSave() {
  const [controls, setControls] = useControls();

  useEffect(() => {
    let hasSaved = false;
    const saveListener = () => {
      if (hasSaved) return;
      setControls({
        ...controls,
        isSaving: true,
      });
    };
    ipcRenderer.on('save', saveListener);

    const savedListener = () => {
      hasSaved = true;
      log('Saved');
      setControls({
        ...controls,
        isSaving: false,
      });
    };
    ipcRenderer.on('saved', savedListener);

    return () => {
      ipcRenderer.removeListener('save', saveListener);
      ipcRenderer.removeListener('saved', savedListener);
    };
  }, [JSON.stringify(controls)]);

  const save = () => {
    if (controls.isStopping || controls.isStarting || controls.isSaving) return;
    ipcRenderer.emit('save');
  };

  return controls.isSaving ? (
    <Spinner />
  ) : (
    <div onClick={save} style={{ cursor: 'pointer' }}>
      <Icon />
    </div>
  );
}
