import {FileResponse} from "@/client/access/types.ts";
import {Table, TableBody} from "@/components/ui/table.tsx";
import {isoToPretty} from "@/util/date.ts";
import {AttrRow} from "@/components/common/AttrRow.tsx";

interface FileInfoProps {
  file: FileResponse;
  className?: string;
}

export function FileInfo({ file, className }: FileInfoProps) {
  return (
    <div className={className}>
      <h4 className="text-lg font-normal">Info</h4>
      <Table>
        <TableBody>
          <AttrRow name="id" value={file.id.toString()} />
          <AttrRow name="type" value={file.isDirectory ? "directory" : "file"} />
          <AttrRow name="path" value={file.path} />
          <AttrRow name="size" value={file.size?.toString() ?? ""} />
          <AttrRow name="last modified" value={isoToPretty(file.lastModified)} />
        </TableBody>
      </Table>
    </div>
  )
}
