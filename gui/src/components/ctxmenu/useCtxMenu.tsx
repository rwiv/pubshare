import { RefObject, useEffect, useState } from 'react';
import { CtxMenu } from './CtxMenu.tsx';

interface ContextProps {
  ref: RefObject<HTMLDivElement>;
}

export const useCtxMenu = ({ ref }: ContextProps) => {
  const [state, setState] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setState({ visible: true, x: event.clientX, y: event.clientY });
  };

  const handleClick = () => {
    setState({ visible: false, x: 0, y: 0 });
  };

  useEffect(() => {
    ref.current?.addEventListener('contextmenu', handleContextMenu);
  }, [ref]);

  useEffect(() => {
    ref.current?.addEventListener('click', handleClick);
  }, [ref]);

  return { state, handleContextMenu, Menu: CtxMenu };
};
