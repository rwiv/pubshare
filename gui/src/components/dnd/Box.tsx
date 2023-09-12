import { useDrag } from 'react-dnd';

export function Box() {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'MY_BOX',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={drag}>box</div>
    </div>
  );
}
