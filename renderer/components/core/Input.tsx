import { styled } from '../../stitches.config';

const Container = styled('input', {
  fontFamily: '$sans',
  fontSize: '$3',
  select: 'focus-within',
  padding: '$2 $3',
  borderRadius: '$1',
  border: '1px solid $gray900',
  backgroundColor: '$gray800',
  color: '$light',

  '&:focus': {
    borderColor: 'none',
    boxShadow: 'none !important',
    outline: 'none',
  },

  '&:focus-within': {
    borderColor: '$link !important',
    boxShadow: 'none !important',
    outline: 'none',
  },

  variants: {
    width: {
      full: {
        width: '100%',
      },
    },
  },
});

export default function Input(props) {
  return <Container {...props} />;
}
