import { XIcon } from '@heroicons/react/solid';
import { styled } from '../../../stitches.config';
import { useDashboardContext } from '../DashboardContext';
import ActionForm from './ActionForm';

const Item = styled('div', {
  fontFamily: '$sans',
  color: '$light',
  display: 'flex',
  flexFlow: 'column',
  gap: '$2',
  maxWidth: '100%',
  borderRadius: '$1',
  border: '1px solid $gray900',

  '> .top': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexFlow: 'row',
    width: '100%',
    padding: '$2 $2 $2 $3',
    boxSizing: 'border-box',
    cursor: 'pointer',

    '> p': {
      margin: 0,
    },

    '> .error': {
      fontSize: '$1',
      color: '$danger',
    },
  },

  variants: {
    errored: {
      true: {
        borderColor: '$danger',
      },
    },
  },
});

const CloseButton = styled(XIcon, {
  color: '$gray700',
  width: '$space$5',
  cursor: 'pointer',

  '&:hover': {
    color: '$danger',
  },
});

const Content = styled('div', {
  padding: '0 $3 $2 $3',
});

export default function ActionItem({
  action,
  index,
  isExpanded,
  onClick = () => {},
}) {
  const {
    removeAction,
    updateActionIndex,
    showActionModal,
    handlerIndex,
    errors,
    mode,
  } = useDashboardContext();

  const remove = (e) => {
    e.stopPropagation();
    removeAction(index);
  };

  const toggle = () => {
    updateActionIndex(index);
    showActionModal();
    onClick();
  };

  const error = errors.find((e) => {
    return e.handlerIndex === handlerIndex && e.actionIndex === index;
  });

  return (
    <Item errored={!!error}>
      <div className="top" onClick={toggle}>
        <p>{action?.name}</p>
        <p className="error">{error?.message}</p>
        <CloseButton onClick={remove} />
      </div>

      {isExpanded && (
        <Content>
          <ActionForm
            show
            onHide={() => showActionModal(false)}
            isEvent={mode === 'event'}
          />
        </Content>
      )}
    </Item>
  );
}
