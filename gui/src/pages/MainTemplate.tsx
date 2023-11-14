import {AppHeader} from "@/components/layout/header/AppHeader.tsx";
import React, {ReactNode, useEffect, useRef} from "react";

function getHeight(elem: HTMLDivElement | null) {
  if (elem === null) {
    return 0;
  }
  return Math.max(elem.scrollHeight, elem.offsetHeight, elem.clientHeight);
}

interface MainTemplateProps {
  children: ReactNode;
  height?: number;
  setHeight?: React.Dispatch<React.SetStateAction<number>>;
}

export function MainTemplate({ children, height, setHeight }: MainTemplateProps) {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (setHeight) {
      setHeight(window.innerHeight - getHeight(ref.current));
    }
  }, [ref, setHeight]);
  
  return (
    <div className="flex flex-col min-h-screen max-h-screen">
      <div ref={ref}>
        <AppHeader />
      </div>
      <div className="flex flex-row" css={{minHeight: height}}>
        {children}
      </div>
    </div>
  );
}
