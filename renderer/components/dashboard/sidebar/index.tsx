import { styled } from '../../../stitches.config';
import Button from '../../core/Button';
import Select from '../../core/Select';
import { useDashboardContext } from '../DashboardContext';
import SidebarBotControls from './Controls';
import ControlsContextProvider from './Controls/Context';
import SidebarItems from './Items';
import SidebarListItem from './List/Item';

const Items = styled('div', {
  maxWidth: '100vw',
  height: '100vh',

  '@bp1': {
    height: '100vh',
    display: 'flex',
    flexFlow: 'column',
  },
});

const Body = styled('div', {
  display: 'flex',
  padding: '$2',

  '@bp1': {
    flexGrow: '1',
    backgroundColor: '$gray800',

    '> .select': {
      display: 'none',
    },
  },
});

const Footer = styled('div', {
  padding: '0.3rem',
  borderTop: '1px solid rgba(0, 0, 0, 0.2)',
  backgroundColor: '$gray900',
});

const Nav = styled('div', {
  display: 'none',
  width: '100%',
  '@bp1': {
    display: 'flex',
    flexFlow: 'column',
  },
});

export default function Sidebar() {
  const {
    mode,
    handlers,
    commands,
    events,
    updateHandlerIndex,
    handlerIndex,
    addHandler,
  } = useDashboardContext();

  const list = commands
    ?.concat(events)
    .map((c, i) => ({ value: +i, label: c?.name }));
  const selected = list?.find((c) => c?.value === handlerIndex) || list?.[0];

  return (
    <>
      <SidebarItems />
      {['command', 'event'].includes(mode) && (
        <Items>
          <Body>
            <Nav>
              {handlers.map((d, i) => (
                <SidebarListItem
                  color={handlerIndex === i ? 'active' : 'initial'}
                  onClick={() => updateHandlerIndex(i)}
                  i={i}
                  d={d}
                />
              ))}
            </Nav>
            <Select
              id="command"
              value={selected}
              onChange={updateHandlerIndex}
              options={list}
              className="select"
            />
          </Body>
          <Footer>
            <ControlsContextProvider>
              <SidebarBotControls />
            </ControlsContextProvider>
          </Footer>
          <Footer className="d-flex flex-row justify-content-between align-items-center flex-wrap gap-2">
            <Button
              onClick={() => addHandler()}
              variant="secondary"
              width={'full'}
            >
              Add {mode === 'command' ? 'Command' : 'Event'}
            </Button>
          </Footer>
        </Items>
      )}
    </>
  );
}
