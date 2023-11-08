import {useAccessStore} from "@/stores/accessStore.ts";

interface FileInfoProps {
  className?: string;
}

export function FileInfo({ className }: FileInfoProps) {
  const {curFile} = useAccessStore();
  return (
    <div className={className}>
      {curFile && (
        <div>my permission: {curFile.myPerm}</div>
      )}
    </div>
  )
}
