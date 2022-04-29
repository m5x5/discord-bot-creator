import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
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
  padding: '$2 $3',

  '> .top': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexFlow: 'row',
    width: '100%',

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

export default function ActionItem({ action, index }) {
  const {
    removeAction,
    updateActionIndex,
    showActionModal,
    handlerIndex,
    errors,
    mode,
  } = useDashboardContext();
  const [show, setShow] = useState(false);

  const remove = (e) => {
    e.stopPropagation();
    removeAction(index);
  };

  const toggle = () => {
    updateActionIndex(index);
    showActionModal();
    setShow(!show);
  };

  const error = errors.find((e) => {
    return e.handlerIndex === handlerIndex && e.actionIndex === index;
  });
  console.log(handlerIndex, index);
  console.log(errors, error);

  return (
    <div>
      <Item errored={!!error}>
        <div className="top" onClick={toggle}>
          <p>{action?.name}</p>
          <p className="error">{error?.message}</p>
          <CloseButton onClick={remove} />
        </div>

        {show && (
          <ActionForm
            show
            onHide={() => showActionModal(false)}
            isEvent={mode === 'event'}
          />
        )}
      </Item>
    </div>
  );
}
