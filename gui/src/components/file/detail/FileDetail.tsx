import {useAccessStore} from "@/stores/accessStore.ts";

interface FileDetailProps {
  className?: string;
}

export function FileDetail({ className }: FileDetailProps) {
  const {curFile} = useAccessStore();
  return (
    <div className={className}>
      {curFile && (
        <div>my permission: {curFile.myPerm}</div>
      )}
    </div>
  )
}
