import {VStack} from "@/util/css/layoutComponents.ts";
import {FileResponse} from "@/client/access/types.ts";
import {FileCommentList} from "@/components/file/detail/comment/FileCommentList.tsx";
import {useMyData} from "@/hooks/query/accountQueries.tsx";
import {FileTags} from "@/components/file/detail/tag/FileTags.tsx";
import {FileRoles} from "@/components/file/detail/role/FileRoles.tsx";
import {FileAuthorities} from "@/components/file/detail/authority/FileAuthorities.tsx";
import {FileInfo} from "@/components/file/detail/info/FileInfo.tsx";
import {Table, TableBody} from "@/components/ui/table.tsx";
import {AttrRow} from "@/components/common/AttrRow.tsx";

interface FileDetailProps {
  className?: string;
  file: FileResponse;
}

const layout = "border rounded-lg p-4";
const item = "my-4 mx-1";

export function FileDetail({ className, file }: FileDetailProps) {

  const {data: me} = useMyData();

  return (
    <VStack className={className}>
      <div className={layout}>
        <h4 className="text-xl font-normal">Details</h4>
        <FileInfo file={file} className={item} />
        <FileTags file={file} className={item} />
      </div>
      <div className={layout}>
        <h4 className="text-xl font-normal">Permission</h4>
        <DefaultPermission file={file} className={item} />
        <FileRoles file={file} className={item} />
        <FileAuthorities file={file} className={item} />
      </div>
      {me && <FileCommentList file={file} me={me} className={layout} />}
    </VStack>
  )
}

function DefaultPermission({ file, className }: { file: FileResponse, className?: string }) {
  return (
    <div className={className}>
      <h4 className="text-lg font-normal">Default</h4>
      <Table className="my-1.5">
        <TableBody>
          <AttrRow name="member">{file.memberDefaultPerm}</AttrRow>
          <AttrRow name="guest">{file.guestDefaultPerm}</AttrRow>
          <AttrRow name="me">{file.myPerm}</AttrRow>
        </TableBody>
      </Table>
    </div>
  )
}
