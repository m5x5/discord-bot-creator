import { XIcon } from '@heroicons/react/solid';
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { styled } from '../../../stitches.config';
import { useDashboardContext } from '../DashboardContext';

const Item = styled('div', {
  fontFamily: '$sans',
  color: '$light',
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between',
  width: '100%',
  borderRadius: '$1',
  border: '1px solid $gray900',
  padding: '$2 $3',

  '> p': {
    margin: 0,
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
  } = useDashboardContext();

  const remove = (e) => {
    e.stopPropagation();
    removeAction(index);
  };

  const select = () => {
    updateActionIndex(index);
    showActionModal();
  };

  const error = errors.find((e) => {
    return e.handlerIndex === handlerIndex && e.actionIndex === index;
  });

  return (
    <Col>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip(error?.message)}
        show={!!error}
      >
        <Item className={error ? 'border-danger' : ''} onClick={select}>
          <p>{action?.name}</p>
          <CloseButton onClick={remove} />
        </Item>
      </OverlayTrigger>
    </Col>
  );
}
