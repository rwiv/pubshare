import {_} from '@/util/csshelper/cssHelper.ts';
import {AppHeader} from "@/components/header/AppHeader.tsx";
import {HStack} from '@/util/csshelper/layoutComponents.ts';
import {ReactNode} from "react";

interface MainTemplateProps {
  children: ReactNode
}

export function MainTemplate({ children }: MainTemplateProps) {

  const left = _.m_all(1,1,2,2,3,3);
  const center = _.m_all(10,10,8, 8,6,6);
  const right = _.m_all(1,1,2,2,3,3);

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
