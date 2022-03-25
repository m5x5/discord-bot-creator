import { XIcon } from '@heroicons/react/solid';
import { ipcRenderer } from 'electron';
import path from 'path';
import { useEffect, useState } from 'react';
import { styled } from '../../../stitches.config';
import { useHomeContext } from '../HomeContext';

const Container = styled('div', {
  darkenedColor3: '$gray800',
  borderRadius: '$1',
  padding: '$3',
  marginBottom: '1rem',
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gap: '1rem',

  '> h3': {
    fontSize: '1.2rem',
    fontWeight: '400',
    color: '$gray400',
    cursor: 'pointer',
    margin: '0',
    transition: 'color 0.2s ease-in-out',

    '&:hover': {
      color: '$link',
    },
  },
});

const CloseButton = styled(XIcon, {
  color: '$gray800',
  height: '1.5rem',
  width: '1.5rem',
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: '$gray600',
  },
});

type Props = {
  folder: string;
  setSettings: (folder: string) => void;
};

type BotInfo = {
  name?: string;
  url?: string;
};

export default function FolderCard({ folder, setSettings }: Props) {
  const [info, setInfo] = useState<BotInfo>({});
  const name = (folder || '').split(path.sep).pop();
  const { removeFolder } = useHomeContext();

  const openFolder = (): void => {
    setSettings(folder);
  };

  const handleRemove = () => {
    removeFolder(folder);
  };

  useEffect(() => {
    ipcRenderer.invoke('getBotInfo', folder).then((botInfo) => {
      if (botInfo) {
        setInfo(botInfo);
      }
    });
  }, []);

  return (
    <Container>
      <h3 onClick={openFolder}>{info.name || name}</h3>

      <CloseButton onClick={handleRemove} />
    </Container>
  );
}
