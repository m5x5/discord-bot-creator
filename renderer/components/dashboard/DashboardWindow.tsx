import { styled } from '../../stitches.config';
import ActionForm from './actions/ActionForm';
import CommandView from './command/CommandView';
import { useDashboardContext } from './DashboardContext';
import EventView from './event/EventView';
import LogView from './log/LogView';
import SettingsView from './settings';
import Sidebar from './sidebar/index';

const Container = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  margin: '0',
  darkenedColor2: '$gray800',
  fontFamily: '$sans',

  '>.navbar': {
    flexFlow: 'row',
    width: '4rem',
    flexBasis: 'content',
    display: 'flex',
    alignSelf: 'start',
    padding: '0',
  },

  '@bp1': {
    flexFlow: 'row',
    padding: 'inherit',

    '>.navbar': {
      height: '100vh',
      flexFlow: 'column',
      justifyContent: 'start',
    },
  },
});

const ViewContainer = styled('div', {
  padding: '$4',
  width: '100%',
});

export default function DashboardWindow() {
  const { mode, actionModalVisible, hideActionModal } = useDashboardContext();

  let isEvent = mode === 'event';

  return (
    <Container>
      <Sidebar selected={''} />
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
        <ActionForm
          show={actionModalVisible}
          onHide={hideActionModal}
          isEvent={isEvent}
        />
      </ViewContainer>
    </Container>
  );
}
