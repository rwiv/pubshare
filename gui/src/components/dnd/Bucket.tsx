import { useDrop } from 'react-dnd';

export function Bucket() {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'MY_BOX',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'red' : 'white' }}>
      {canDrop ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
}
