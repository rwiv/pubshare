import { Textarea } from "@/components/ui/textarea"
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {FileResponse} from "@/client/access/types.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {
  createFileComment,
  deleteFileComment,
  fileCommentQueryKeys,
  findFileCommentsByFileId
} from "@/client/file/fileCommentClient.ts";
import {HStack, VStack} from "@/util/css/layoutComponents.ts";
import {AccountResponse} from "@/client/account/types.ts";
import {Cross1Icon} from "@radix-ui/react-icons";
import {SmallIconButton} from "@/components/common/SmallIconButton.tsx";

interface FileCommentListProps {
  file: FileResponse;
  me: AccountResponse;
}

export function FileCommentList({ file, me }: FileCommentListProps) {

  const queryClient = useQueryClient();
  const [textContent, setTextContent] = useState("");
  const {data: fileComments} = useQuery({
    queryKey: [fileCommentQueryKeys.fileId, file.id],
    queryFn: ctx => findFileCommentsByFileId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  const onSubmit = async () => {
    await createFileComment({
      content: textContent,
      fileId: file.id,
      createdById: me.id,
    });
    await queryClient.invalidateQueries({ queryKey: [fileCommentQueryKeys.fileId, file.id] });
  }

  const onDelete = async (fileCommentId: number) => {
    await deleteFileComment(fileCommentId);
    await queryClient.invalidateQueries({ queryKey: [fileCommentQueryKeys.fileId, file.id] })
  }

  return (
    <VStack>
      <h1>Comments</h1>
      {fileComments.map(fileComment => (
        <HStack key={fileComment.id}>
          <h2 className="m-1">{fileComment.content}</h2>
          <SmallIconButton onClick={() => onDelete(fileComment.id)}>
            <Cross1Icon className="p-2.5" />
          </SmallIconButton>
        </HStack>
      ))}
      <div className="grid w-full gap-2">
        <Textarea onChange={e => setTextContent(e.target.value)} />
        <Button onClick={onSubmit}>Add Comment</Button>
      </div>
    </VStack>
  )
}