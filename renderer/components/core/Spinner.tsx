import { keyframes } from '@stitches/react';
import { styled } from '../../stitches.config';

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const Spinner = styled('div', {
  border: '3px solid $gray600',
  borderBottom: '3px dashed $success',
  height: '$space$6',
  width: '$space$6',
  borderRadius: '50%',
  boxSizing: 'border-box',
  animation: `${spin} 1.2s linear infinite`,

  variants: {
    color: {
      success: {
        borderBottom: '3px solid $success',
      },
      danger: {
        borderBottom: '3px solid $danger',
      },
      info: {
        borderBottom: '3px solid $info',
      },
    },
    inline: {
      true: {
        display: 'inline-block',
      },
      false: {
        display: 'block',
      },
    },
    size: {
      small: {
        height: '$space$4',
        width: '$space$4',
      },
    },
  },
});

export default Spinner;
