import { ipcRenderer } from 'electron';
import path from 'path';
import { useEffect, useState } from 'react';
import { CloseButton } from 'react-bootstrap';
import { styled } from '../../../stitches.config';
import { useHomeContext } from '../HomeContext';

const Container = styled('div', {
  darkenedColor3: '$gray800',
  border: 'none',
  borderRadius: '0.75rem',
  fontFamily: 'Open Sans',
  padding: '1rem 1rem',
  transition: 'all 0.2s ease-in-out',
  marginBottom: '1rem',
  cursor: 'pointer',
  display: 'grid',
  gridTemplateRows: 'auto auto auto',
  gap: '1rem',

  '&:hover': {
    boxShadow: '0px 7px 10px rgba(0, 0, 0, 0.3)',
  },
  '>.icon': {
    color: '$gray800',
    height: '2rem',
  },
  '>h3': {
    fontSize: '1.2rem',
    fontWeight: '400',
    color: '$gray400',
  },
  '>p': {
    fontSize: '1rem',
    color: '$gray500',
    margin: '0',
    '&:hover': {
      textDecoration: 'underline',
    },
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
    <Container onClick={openFolder}>
      {/* <BotIcon url={info.url} /> */}
      <h3>{info.name || name}</h3>

      <CloseButton onClick={handleRemove} />
    </Container>
  );
}
