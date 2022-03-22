import { styled } from '../../stitches.config';

const Button = styled('button', {
  color: 'white',
  border: 'none',
  borderRadius: '$1',
  padding: '0.5rem 1rem',
  fontWeight: '500',
  fontSize: '$2',
  fontFamily: '$sans',
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        '&:hover': {
          backgroundColor: '$primaryDark',
        },
      },
      secondary: {
        backgroundColor: '$gray800',
        '&:hover': {
          darkenedColor1: '$gray800',
        },
        '&:active': {
          darkenedColor2: '$gray800',
        },
      },
      success: {
        backgroundColor: '$success',
        color: '$black',
        '&:hover': {
          darkenedColor4: '$success',
        },
        '&:active': {
          darkenedColor5: '$success',
        },
      },
    },
    width: {
      full: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export default Button;
