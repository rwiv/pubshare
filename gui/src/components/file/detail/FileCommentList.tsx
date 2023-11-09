import { Textarea } from "@/components/ui/textarea"
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {FileResponse} from "@/client/access/types.ts";

interface FileCommentListProps {
  file: FileResponse;
}

export function FileCommentList({ file }: FileCommentListProps) {

  const [content, setContent] = useState("");

  const onSubmit = () => {

  }

  return (
    <div>
      <div className="grid w-full gap-2">
        <Textarea onChange={e => setContent(e.target.value)} />
        <Button onClick={onSubmit}>Add Comment</Button>
      </div>
    </div>
  )
}