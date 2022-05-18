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

type Props = {
  create?: boolean;
};

export default function ActionDropdown({ create }: Props) {
  const { actionSchemas, updateAction, addAction } = useDashboardContext();

  const select = (selected) => {
    if (!selected) return;
    const newAction = { name: selected.name };

    // Clear all values to insert a fresh action
    if (selected.fields) {
      selected.fields.forEach((field) => {
        newAction[field] = '';
      });
    } else if (selected.form) {
      const keys = Object.keys(selected.form);
      keys.forEach((key) => {
        newAction[key] = '';
      });
    }

    if (create) {
      addAction(newAction);
    } else {
      updateAction(newAction, false);
    }
  };

  const filter = ({ data }, input) => {
    if (!data?.name) return false;
    const name = data.name.toLowerCase();
    const search = input.toLowerCase();
    console.log({ name, search });
    return name.includes(search);
  };

  return (
    <Container>
      <Select
        options={actionSchemas}
        formatOptionLabel={(data) => <OptionLabel data={data} />}
        onChange={select}
        filterOption={filter}
      />
    </Container>
  );
}
