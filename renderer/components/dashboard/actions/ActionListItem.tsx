import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { styled } from '../../../stitches.config';
import { useDashboardContext } from '../DashboardContext';
import ActionForm from './ActionForm';

const Item = styled('div', {
  fontFamily: '$sans',
  color: '$light',
  display: 'flex',
  flexFlow: 'column',
  gap: '$2',
  width: '100%',
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

const renderTooltip = (error) => (props) =>
  (
    <Tooltip id="button-tooltip" {...props}>
      {error}
    </Tooltip>
  );

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

  return (
    <div>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip(error?.message)}
        show={!!error}
      >
        <Item className={error ? 'border-danger' : ''}>
          <div className="top" onClick={toggle}>
            <p>{action?.name}</p>
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
      </OverlayTrigger>
    </div>
  );
}
