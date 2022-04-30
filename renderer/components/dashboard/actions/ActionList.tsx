import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { styled } from '../../../stitches.config';
import Label from '../../core/Label';
import { useDashboardContext } from '../DashboardContext';
import ActionDropdown from './ActionDropdown';
import ActionItem from './ActionListItem';

const Flexbox = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  gap: '1rem',
});

const List = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  gap: '0.5rem',
});

export default function ActionList() {
  const { actions, reorderAction } = useDashboardContext();
  const [expanded, setExpanded] = useState(-1);
  const isExpanded = (i: number) => i === expanded;

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    reorderAction(result.source.index, result.destination.index);
  };

  return (
    <Flexbox>
      <div>
        <Label>Actions</Label>
        <ActionDropdown create />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" ignoreContainerClipping>
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {actions.map((action, i) => (
                <Draggable
                  key={'key-' + action.name + '-' + i}
                  draggableId={action.name + '-' + i}
                  index={i}
                  isDragDisabled={isExpanded(i)}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      key={i}
                    >
                      <ActionItem
                        action={action}
                        index={i}
                        isExpanded={isExpanded(i)}
                        onClick={() => setExpanded(isExpanded(i) ? -1 : i)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Flexbox>
  );
}
