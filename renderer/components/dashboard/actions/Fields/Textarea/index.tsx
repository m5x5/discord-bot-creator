import { styled } from '../../../../../stitches.config';
import Label from '../../../../core/Label';
import MyTextarea from '../../../../core/Textarea';
import { useDashboardContext } from '../../../DashboardContext';

type Props = {
  field: string;
  [key: string]: any;
};

const Container = styled('div', {
  fontFamily: '$sans',
  marginBottom: '0.5rem',
  variants: {
    display: {
      inline: {
        display: 'inline-block',
        width: 'calc(50% - 0.5rem)',
      },
      block: {
        display: 'block',
      },
    },
  },
});

const Description = styled('span', {
  fontFamily: '$sans',
  fontSize: '0.8rem',
  color: '$gray600',
  display: 'block',
});

export default function Textarea({ field, config, isEvent, ...props }: Props) {
  const { updateField } = useDashboardContext();

  const onChange = (e) => {
    updateField(field, e.target.value);
  };

  return (
    <Container display={config.inline ? 'inline' : 'block'}>
      <Label>{config.title}</Label>
      <MyTextarea
        {...props}
        onChange={onChange}
        placeholder={config.placeholder}
        width="full"
      ></MyTextarea>
      <Description>{config.description}</Description>
    </Container>
  );
}
