import { ipcRenderer } from 'electron';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { styled } from '../../stitches.config';
import Button from '../core/Button';
import FolderList from './folder/List';

const Container = styled('div', {
  color: '$gray200',
  backgroundColor: '$gray800',
  width: 'clamp(400px, 80vw, 800px)',
  height: 'fit-content',
  borderRadius: '$1',
  padding: '$7',

  '> h4': {
    color: '$gray600',
    marginBottom: '0.1rem',
  },

  '> h1': {
    marginBottom: '$7',
  },
});

export default function Section() {
  const [openingFolder, setOpeningFolder] = useState('');
  const router = useRouter();
  // Can be used to create a bot
  const setSettings = (folder) => {
    ///@ts-ignore
    window._folder = folder;
    setOpeningFolder(folder);
    if (!ipcRenderer) {
      throw new Error('ipcRenderer is not defined');
    }
    ipcRenderer.send('chooseDirectory', folder);
    ipcRenderer.once('chooseDirectory', () => {
      router.push(`/dashboard`);
      setOpeningFolder('');
    });
  };

  const pickFolder = (): void => {
    if (!ipcRenderer) {
      throw new Error('ipcRenderer is not defined');
    }
    ipcRenderer.send('directoryDialog');
  };

  return (
    <Container>
      <h4>Welcome to</h4>
      <h1>Discord Bot Creator</h1>
      {/* <BotList /> */}
      <div className="align-items-stretch">
        <FolderList setSettings={setSettings} />
        <div>
          <Button onClick={pickFolder} className="mt-3">
            Add Bot
          </Button>
        </div>
      </div>
    </Container>
  );
}
