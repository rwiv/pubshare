import {ContextMenu, ContextMenuPortal, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";
import {ReactNode} from "react";

interface ContextMenuProps {
  menuContent: ReactNode;
  children: ReactNode;
}

export function ContextMenuBoundary({ menuContent, children }: ContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuPortal>
        {menuContent}
      </ContextMenuPortal>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
    </ContextMenu>
  )
}