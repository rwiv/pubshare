import {AppHeader} from "@/components/layout/AppHeader.tsx";
import {HStack} from '@/util/css/layoutComponents.ts';
import {ReactNode} from "react";
import {mq} from "@/util/css/MediaQueryHelper.ts";

interface MainTemplateProps {
  children: ReactNode
}

export function MainTemplate({ children }: MainTemplateProps) {

  const left = mq.m_all(1,1,2,2,3,3);
  const center = mq.m_all(10,10,8, 8,6,6);
  const right = mq.m_all(1,1,2,2,3,3);

  return (
    <>
      <AppHeader />
      <HStack>
        <div css={left}/>
        <div css={center}>
          {children}
        </div>
        <div css={right}/>
      </HStack>
    </>
  );
}
