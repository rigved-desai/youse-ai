import {useDraggable} from '@dnd-kit/core';
import { PropsWithChildren, useState } from 'react';

export type DraggableProps = {
    id: string
}

export function Draggable({children, id}: PropsWithChildren<DraggableProps>) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}