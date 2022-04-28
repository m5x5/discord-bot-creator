import { styled } from '../../stitches.config';
import CommandView from './command/CommandView';
import { useDashboardContext } from './DashboardContext';
import EventView from './event/EventView';
import LogView from './log/LogView';
import SettingsView from './settings';
import Sidebar from './sidebar/index';

const Container = styled('div', {
  display: 'grid',
  margin: '0',
  darkenedColor2: '$gray800',
  flexFlow: 'row',
  gridTemplateColumns: 'auto auto 6fr',
  gridTemplateRows: '1fr',
  maxWidth: '100vw',
});

const ViewContainer = styled('div', {
  padding: '$4',
  boxSizing: 'border-box',
  height: '100vh',
  overflow: 'auto',
});

export default function DashboardWindow() {
  const { mode } = useDashboardContext();

  return (
    <Container>
      <Sidebar />
      <ViewContainer>
        {(() => {
          switch (mode) {
            case 'event':
              return <EventView />;
            case 'command':
              return <CommandView />;
            case 'logs':
              return <LogView />;
            case 'settings':
              return <SettingsView />;
          }
        })()}
      </ViewContainer>
    </Container>
  );
}
