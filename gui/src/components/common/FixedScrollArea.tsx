import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {ReactNode} from "react";

interface FixedScrollAreaProps {
  maxHeight: number;
  children: ReactNode;
}

export function FixedScrollArea({ maxHeight, children }: FixedScrollAreaProps) {
  return (
    <ScrollArea>
      <div css={{maxHeight}}>
        {children}
      </div>
    </ScrollArea>
  )
}