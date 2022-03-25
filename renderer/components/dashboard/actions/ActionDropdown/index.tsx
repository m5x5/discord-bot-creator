import { styled } from '../../../../stitches.config';
import Select from '../../../core/Select';
import { useDashboardContext } from '../../DashboardContext';
import OptionLabel from './OptionLabel';

const Container = styled('div', {
  '>.rbt': {
    '>.rbt-menu': {
      backgroundColor: '$gray900',
    },
    '>div': {
      '>.rbt-input, >.rbt-input-hint': {
        fontSize: '1.0rem',
        fontWeight: 'normal',
      },
    },
  },
});

export default function ActionDropdown({ create }) {
  const { actionSchemas, updateAction, addAction } = useDashboardContext();

  const select = (selected) => {
    if (!selected) return;
    const newAction = { name: selected.name };

    selected.fields.forEach((field) => {
      newAction[field] = '';
    });

    if (create) {
      addAction(newAction);
    } else {
      updateAction(newAction, false);
    }
  };

  return (
    <Container>
      <Select
        options={actionSchemas}
        formatOptionLabel={(data) => <OptionLabel data={data} />}
        onChange={select}
      />
    </Container>
  );
}
