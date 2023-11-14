import {mq} from "@/util/css/MediaQueryHelper.ts";

export function getMediaQuery() {
  const left = mq.m_all(1,1,2,2,3,3);
  const center = mq.m_all(10,10,8, 8,6,6);
  const right = mq.m_all(1,1,2,2,3,3);

  return { left, center, right };
}
