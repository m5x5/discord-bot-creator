import useSettings from '../../../../lib/useSettings';
import { styled } from '../../../../stitches.config';
import Button from '../../../core/Button';
import { useDashboardContext } from '../../DashboardContext';
import { useControls } from './Context';
import ControlsSave from './Save';
import ControlsStart from './Start';
import ControlsStop from './Stop';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

export default function SidebarBotControls() {
  const { updateMode } = useDashboardContext();
  const [controls] = useControls();
  const [settings] = useSettings();

  if (!settings?.token) {
    return <Button onClick={() => updateMode('settings')}>Add token</Button>;
  }

  return (
    <Container>
      {controls.isRunning ? (
        <>
          <ControlsSave />
          <ControlsStop />
        </>
      ) : (
        <ControlsStart />
      )}
    </Container>
  );
}
