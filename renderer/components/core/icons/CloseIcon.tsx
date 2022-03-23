import { XIcon } from '@heroicons/react/solid';
import { styled } from '../../../stitches.config';

const Icon = styled(XIcon, {
  visibility: 'hidden',
  transition: '0.2',
  cursor: 'pointer',
  color: '$secondary',
});

export default Icon;
