import {VStack} from "@/util/css/layoutComponents.ts";
import {FileResponse} from "@/client/access/types.ts";
import {FileCommentList} from "@/components/file/detail/comment/FileCommentList.tsx";
import {useMyData} from "@/hooks/query/accountQueries.tsx";
import {FileTags} from "@/components/file/detail/tag/FileTags.tsx";
import {Roles} from "@/components/file/detail/role/Roles.tsx";
import {Authorities} from "@/components/file/detail/authority/Authorities.tsx";
import {FileInfo} from "@/components/file/detail/info/FileInfo.tsx";
import {Table, TableBody} from "@/components/ui/table.tsx";
import {AttrRow} from "@/components/common/AttrRow.tsx";

interface FileDetailProps {
  className?: string;
  file: FileResponse;
}

const layout = "border rounded-lg p-4";
const item = "my-4 mx-1";

function DefaultPermission({ file, className }: { file: FileResponse, className?: string }) {
  return (
    <div className={className}>
      <h4 className="text-lg font-normal">Details</h4>
      <Table>
        <TableBody>
          <AttrRow name="member" value={file.memberDefaultPerm} />
          <AttrRow name="guest" value={file.guestDefaultPerm} />
          <AttrRow name="me" value={file.myPerm} />
        </TableBody>
      </Table>
    </div>
  )
}

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
        <Roles file={file} className={item} />
        <Authorities file={file} className={item} />
      </div>
      {me && <FileCommentList file={file} me={me} className={layout} />}
    </VStack>
  )
}
