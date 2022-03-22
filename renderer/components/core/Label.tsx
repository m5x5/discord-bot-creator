import { styled } from '../../stitches.config';

const Container = styled('label', {
  display: 'block',
  fontFamily: '$sans',
  color: '#9C9C9C',
  fontSize: '0.7rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginBottom: '0.3rem',
  paddingLeft: '0.2rem',
});

export default function Label({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}
