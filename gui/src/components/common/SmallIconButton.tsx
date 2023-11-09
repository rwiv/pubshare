import React, {ReactNode} from "react";
import {Button} from "@/components/ui/button.tsx";

interface SmallIconButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function SmallIconButton({ children, onClick }: SmallIconButtonProps) {
  return (
    <Button
      asChild variant="ghost" size="icon"
      className="h-9 w-9 rounded-full cursor-pointer"
      css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
