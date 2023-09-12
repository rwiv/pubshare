import { useRef } from 'react';
import { useCtxMenu } from './useCtxMenu.tsx';
import { CtxMenu } from './CtxMenu.tsx';
import { ReactNode } from 'react';

interface ContextMenuBoundaryProps {
  menuContent: ReactNode;
  children: ReactNode;
}

export function CtxMenuBoundary({
  menuContent,
  children,
}: ContextMenuBoundaryProps) {
  const ctxElem = useRef<HTMLDivElement>(null);
  const { state } = useCtxMenu({ ref: ctxElem });

  return (
    <div ref={ctxElem}>
      <CtxMenu menuContent={menuContent} ctxMenuState={state} />
      {children}
    </div>
  );
}
