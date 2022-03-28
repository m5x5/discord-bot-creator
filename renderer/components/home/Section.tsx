import { ipcRenderer } from 'electron';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { styled } from '../../stitches.config';
import Button from '../core/Button';
import Spinner from '../core/Spinner';
import FolderList from './folder/List';

const Container = styled('div', {
  color: '$gray200',
  backgroundColor: '$gray800',
  width: 'clamp(400px, 80vw, 800px)',
  height: 'fit-content',
  borderRadius: '$1',
  padding: '$7',

  '> h1': {
    marginBottom: '$7',
    marginTop: '$2',
  },
});

const Subtitle = styled('div', {
  color: '$gray600',
  fontWeight: '500',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '$2',
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
    });
  };

  const getName = (path: string) => {
    path = path.replaceAll(/\\/g, '/');
    console.log('path', path);
    return path.split('/').pop();
  };

  const pickFolder = (): void => {
    if (!ipcRenderer) {
      throw new Error('ipcRenderer is not defined');
    }
    ipcRenderer.send('directoryDialog');
  };

  return (
    <Container>
      <Subtitle>
        {openingFolder ? (
          <>
            <Spinner inline={true} size={'small'} />
            Opening
          </>
        ) : (
          'Welcome to'
        )}
      </Subtitle>
      <h1>{openingFolder ? getName(openingFolder) : 'Discord Bot Creator'}</h1>
      {!openingFolder && (
        <div className="align-items-stretch">
          <FolderList setSettings={setSettings} />
          <div>
            <Button onClick={pickFolder} className="mt-3">
              Add Bot
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
