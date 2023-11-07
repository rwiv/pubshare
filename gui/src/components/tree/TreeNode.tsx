import React, {useState} from 'react'
import {TreeHead} from "@/components/tree/TreeHead.tsx";
import {FileNode} from "@/components/tree/types";
import {FileResponse} from "@/client/access/types.ts";
import {list} from "@/client/access/accessClient.ts";
import {getFilenameByKey} from "@/client/access/accessUtils.ts";
import {useAccessStore} from "@/stores/accessStore.ts";

interface TreeNodeProps {
  file: FileNode;
  setRawData: React.Dispatch<React.SetStateAction<FileResponse[]>>;
  depth?: number;
}

export function TreeNode({ file, setRawData, depth = 0 }: TreeNodeProps) {
  const [collapsed, setCollapsed] = useState(false);
  const {setCurDirectory} = useAccessStore();

  function onClick() {
    setCurDirectory(file);
  }

  async function onIconClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    if (!file.isDirectory) return;

    if (!collapsed) {
      const files = await list(file.path);
      setRawData(origin => {
        const originIds = origin.map(file => file.id);
        const filtered = files.filter(file => !originIds.includes(file.id));
        return [
        ...origin,
        ...filtered,
      ]});
    }

    setCollapsed(prevValue => !prevValue);
  }

  return (file.children.length > 0 ? (
    <div>
      <TreeHead
        depth={depth}
        collapsed={collapsed}
        content={getFilenameByKey(file.path)}
        onClick={onClick}
        onIconClick={onIconClick}
      />
      <div css={{
        overflow: "hidden",
        maxHeight: collapsed ? "100%" : "0",
      }}>
        {file.children.map((child) => (
          <TreeNode key={child.id} file={child} depth={depth + 1} setRawData={setRawData} />
        ))}
      </div>
    </div>
  ): (
    <div>
      <TreeHead
        depth={depth}
        collapsed={collapsed}
        content={getFilenameByKey(file.path)}
        onClick={onClick}
        onIconClick={onIconClick}
      />
    </div>
  ));
}
