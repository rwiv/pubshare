import { ReactNode } from 'react';

interface MenuProps {
  ctxMenuState: ContextMenuState;
  menuContent: ReactNode;
}

export const CtxMenu = ({ ctxMenuState, menuContent }: MenuProps) => {
  const { visible, x, y } = ctxMenuState;

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        display: visible ? 'block' : 'none',
      }}
    >
      {menuContent}
    </div>
  );
};
