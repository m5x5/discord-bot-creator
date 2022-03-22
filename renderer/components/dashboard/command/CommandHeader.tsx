import { Form } from 'react-bootstrap';
import { styled } from '../../../stitches.config';
import Label from '../../core/Label';
import { useDashboardContext } from '../DashboardContext';
import HandlerNameInput from '../handlers/HandlerNameInput';
import PermissionSelect from './Header/PermissionSelect';

const Container = styled('div', {});

const Group = styled('div', {
  marginBottom: '$4',

  '> *': {
    display: 'block',
  },
});

export default function DashboardWindowHeader() {
  const { handler: command, updateHandler } = useDashboardContext();

  const onChangeComType = (e) => {
    updateHandler({ comType: e.target.value });
  };

  const onChangeRestriction = (e) => {
    updateHandler({ restriction: e.target.value });
  };

  return (
    <Container>
      <Group>
        <Label>Name</Label>
        <HandlerNameInput />
      </Group>
      <Form>
        <Group>
          <Label>Command Type</Label>
          <Form.Select value={command.comType} onChange={onChangeComType}>
            <option value="0">Normal Command</option>
            <option value="1">Includes Word</option>
            <option value="2">Matches Regular Expression</option>
            <option value="3">Any Message</option>
          </Form.Select>
        </Group>
        <Group>
          <Label>Command Restriction</Label>
          <Form.Select
            value={command.restriction}
            onChange={onChangeRestriction}
          >
            <option value="0">None</option>
            <option value="1">Server Only</option>
            <option value="2">Owner Only</option>
            <option value="3">DMs Only</option>
          </Form.Select>
        </Group>
        <Group>
          <Label>Permissions</Label>
          <PermissionSelect />
        </Group>
      </Form>
    </Container>
  );
}
