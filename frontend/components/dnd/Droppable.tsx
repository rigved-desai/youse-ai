import {useDroppable} from '@dnd-kit/core';
import { PropsWithChildren, ReactNode } from 'react';

export type DroppableProps = {
    id: string,
}

export function Droppable({children, id} : PropsWithChildren<DroppableProps>) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style} className='flex-grow'>
      {children}
    </div>
  );
}