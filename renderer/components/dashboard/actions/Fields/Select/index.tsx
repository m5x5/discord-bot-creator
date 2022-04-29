import { styled } from '../../../../../stitches.config';
import Label from '../../../../core/Label';
import Select from '../../../../core/Select';
import { useDashboardContext } from '../../../DashboardContext';

const Container = styled('div', {
  fontFamily: '$sans',
  marginBottom: '0.5rem',
  verticalAlign: 'top',
  variants: {
    display: {
      inline: {
        display: 'inline-block',
        marginRight: '0.5rem',
        width: 'calc(50% - 0.5rem)',
      },
      block: {
        display: 'block',
      },
    },
  },
});

export default function SelectField({ field, options = [], config, ...props }) {
  const { updateField } = useDashboardContext();

  const onChange = ({ value }) => {
    updateField(field, value);
  };

  return (
    <Container display={config.inline ? 'inline' : 'block'}>
      <Label>{config.title}</Label>
      <Select {...props} onChange={onChange} options={options} />
    </Container>
  );
}
