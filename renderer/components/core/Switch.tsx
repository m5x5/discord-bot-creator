import { styled } from '../../stitches.config';

const Group = styled('div', {
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
});

const Container = styled('div', {
  height: '1rem',
  width: '2rem',
  borderRadius: '$1',
  padding: '0.2rem',
  cursor: 'pointer',
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',

  '> div': {
    backgroundColor: '$gray800',
    height: '100%',
    width: '100%',
    borderRadius: '$1',
    gridColumnStart: '2',
  },

  variants: {
    enabled: {
      true: {
        backgroundColor: '$success',

        '> div': {
          gridColumnStart: '2',
        },
      },

      false: {
        backgroundColor: '$gray700',
        '> div': {
          gridColumnStart: '1',
        },
      },
    },
  },
});

export default function Switch({ checked: value, onChange, title }) {
  const toggle = () => {
    onChange(!value);
  };

  return (
    <Group>
      <Container onClick={toggle} title={title} enabled={!!value}>
        <div></div>
      </Container>
      {title}
    </Group>
  );
}
