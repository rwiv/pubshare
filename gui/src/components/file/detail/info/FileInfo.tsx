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
      <Table className="my-1.5">
        <TableBody>
          <AttrRow name="id">{file.id.toString()}</AttrRow>
          <AttrRow name="type">{file.isDirectory ? "directory" : "file"}</AttrRow>
          <AttrRow name="path">{file.path}</AttrRow>
          <AttrRow name="size">{file.size?.toString() ?? ""}</AttrRow>
          <AttrRow name="last modified">{isoToPretty(file.lastModified)}</AttrRow>
        </TableBody>
      </Table>
    </div>
  )
}
