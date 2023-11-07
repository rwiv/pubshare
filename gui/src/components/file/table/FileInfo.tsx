import {FileResponse} from "@/client/access/types.ts";

interface FileInfoProps {
  file: FileResponse;
}

export function FileInfo({ file }: FileInfoProps) {
  return (
    <>
      <div>my permission: {file.myPerm}</div>
      <div>hello</div>
    </>
  )
}
