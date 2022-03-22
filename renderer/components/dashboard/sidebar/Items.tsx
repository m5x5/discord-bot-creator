import {
  ChatAlt2Icon,
  CogIcon,
  LightningBoltIcon,
  TerminalIcon,
} from '@heroicons/react/solid';
import { styled } from '../../../stitches.config';
import { useDashboardContext } from '../DashboardContext';

const Item = styled('div', {
  width: '3rem',
  height: '3rem',
  padding: '0.6rem 0.6rem',
  cursor: 'pointer',
  '>svg': {
    width: '100%',
    height: '100%',
    filter: 'grayscale(100%) opacity(0.5)',
    color: '$primary',
    transition: '0.2s',
  },
  '&:hover': {
    '>svg': {
      color: '$primary',
      filter: 'grayscale(0) opacity(1)',
    },
  },
  '>.active': {
    '>svg': {
      color: '$primary',
      filter: 'grayscale(0%) opacity(1)',
    },
  },
});

const Bar = styled('div', {
  flex: '0 0 4rem',
  padding: '0',
  borderRight: '1px solid rgba(0, 0, 0, 0.3)',

  '>.navbar': {
    flex: '0 0 4rem',
  },
});

export default function SidebarItems() {
  const { updateMode, mode } = useDashboardContext();

  const setMode = (mode) => () => updateMode(mode);

  return (
    <Bar className="navbar">
      <Item
        className={mode === 'command' ? 'active' : ''}
        onClick={setMode('command')}
      >
        <ChatAlt2Icon />
      </Item>
      <Item
        className={mode === 'event' ? 'active' : ''}
        onClick={setMode('event')}
      >
        <LightningBoltIcon />
      </Item>
      <Item
        className={mode === 'logs' ? 'active' : ''}
        onClick={setMode('logs')}
      >
        <TerminalIcon />
      </Item>
      <Item onClick={setMode('settings')} className="mt-auto">
        <CogIcon />
      </Item>
    </Bar>
  );
}
