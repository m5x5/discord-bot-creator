import { styled } from '../../stitches.config';

const Link = styled('a', {
  color: '$link',
  textDecoration: 'none',
  position: 'relative',

  '&::before': {
    content: '',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '1.5px',
    bottom: 0,
    left: 0,
    backgroundColor: '$link',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
    transformOrigin: 'left',
  },

  '&:hover::before': {
    transform: 'scaleX(1)',
    height: '1.5px',
  },
});

export default Link;
