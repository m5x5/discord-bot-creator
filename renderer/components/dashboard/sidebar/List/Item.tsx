import { styled } from '../../../../stitches.config';
import { useDashboardContext } from '../../DashboardContext';

const Container = styled('div', {
  fontFamily: '$sans',
  cursor: 'pointer',
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0',
  padding: '0.5rem 1rem',
  borderRadius: '$1',
  color: '$gray100',
  width: '100%',
  boxSizing: 'border-box',

  '> .errors': {
    backgroundColor: '$danger',
    fontSize: '$1',
    padding: '0 $1',
    borderRadius: '$1',
  },

  variants: {
    color: {
      active: {
        lightenedColor3: '$gray800',
        '&:hover': {
          lightenedColor4: '$gray800',
        },
      },
      initial: {
        color: '$light',
        '&:hover': {
          darkenedColor1: '$gray800',
        },
      },
    },
  },
});

type Props = {
  d: any;
  i: number;
  [key: string]: any;
};

export default function SidebarListItem({ d, i, ...props }: Props) {
  const { errors } = useDashboardContext();

  return (
    <Container {...props}>
      <span dangerouslySetInnerHTML={{ __html: d?.name }} className="w-100" />
      {errors.filter((e) => e.handlerIndex === i).length ? (
        <div className="errors">
          {errors.filter((e) => e.handlerIndex === i).length}
        </div>
      ) : null}
    </Container>
  );
}
