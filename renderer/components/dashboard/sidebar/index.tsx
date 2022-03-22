import { Card, Form, Nav } from 'react-bootstrap';
import { styled } from '../../../stitches.config';
import Button from '../../core/Button';
import { useDashboardContext } from '../DashboardContext';
import SidebarBotControls from './Controls';
import ControlsContextProvider from './Controls/Context';
import SidebarItems from './Items';
import SidebarListItem from './List/Item';

const Items = styled('div', {
  maxWidth: '100vw',
  height: '100vh',

  '>.card-body': {
    backgroundColor: '$gray800',
  },

  '@bp1': {
    height: '100vh',
    display: 'flex',
    flexFlow: 'column',

    '>.card-body': {
      flexGrow: '1',
    },
  },
});

const Footer = styled('div', {
  padding: '0.3rem',
  borderTop: '1px solid rgba(0, 0, 0, 0.2)',
  backgroundColor: '$gray900',
});

export default function Sidebar({ selected }) {
  const {
    mode,
    handlers,
    commands,
    events,
    updateHandlerIndex,
    handlerIndex,
    addHandler,
  } = useDashboardContext();

  return (
    <>
      <SidebarItems />
      {['command', 'event'].includes(mode) && (
        <Items>
          <Card.Body className="px-1 py-1 overflow-auto">
            <Nav variant="pills" className="flex-column d-md-block d-none">
              {handlers.map((d, i) => (
                <SidebarListItem
                  color={handlerIndex === i ? 'active' : 'initial'}
                  onClick={() => updateHandlerIndex(i)}
                  i={i}
                  d={d}
                ></SidebarListItem>
              ))}
            </Nav>
            <Form.Group className="d-md-none">
              <Form.Select
                id="command"
                value={selected}
                onChange={(e) => updateHandlerIndex(e.target.value)}
              >
                {commands?.concat(events || []).map((c, i) => (
                  <option
                    key={'select-' + c?.name + '-' + i}
                    onClick={() => updateHandlerIndex(i)}
                    value={i}
                  >
                    {c?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Card.Body>
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
              Add Command
            </Button>
          </Footer>
        </Items>
      )}
    </>
  );
}
