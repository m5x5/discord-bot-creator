import { Form } from 'react-bootstrap';
import { styled } from '../../../stitches.config';
import Label from '../../core/Label';
import Select from '../../core/Select';
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

  const comTypes = [
    { value: '0', label: 'Normal Command' },
    { value: '1', label: 'Includes Word' },
    { value: '2', label: 'Matches Regular Expression' },
    { value: '3', label: 'Any Message' },
  ];

  const comType =
    comTypes.find((c) => c.value === command.comType) || comTypes[0];

  const restrictions = [
    { value: '0', label: 'None' },
    { value: '1', label: 'Server Only' },
    { value: '2', label: 'Owner Only' },
    { value: '3', label: 'DMs Only' },
  ];

  const restriction =
    restrictions.find((r) => r.value === command.restriction) ||
    restrictions[0];

  return (
    <Container>
      <Group>
        <Label>Name</Label>
        <HandlerNameInput />
      </Group>
      <Form>
        <Group>
          <Label>Command Type</Label>
          <Select
            value={comType}
            onChange={onChangeComType}
            options={comTypes}
          />
        </Group>
        <Group>
          <Label>Command Restriction</Label>
          <Select
            value={restriction}
            onChange={onChangeRestriction}
            options={restrictions}
          />
        </Group>
        <Group>
          <Label>Permissions</Label>
          <PermissionSelect />
        </Group>
      </Form>
    </Container>
  );
}
