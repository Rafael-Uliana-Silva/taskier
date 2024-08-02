import React from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, children, isDraggable }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    cursor: 'grab',
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDraggable ? 1 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isDraggable ? { ...attributes, ...listeners } : {})}
    >
      {children}
    </div>
  );
};

SortableItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isDraggable: PropTypes.bool.isRequired,
};

export default SortableItem;
