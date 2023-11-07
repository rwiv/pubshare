import React, {useState} from 'react'
import {TreeHead} from "@/components/tree/TreeHead.tsx";
import {NodeItem, RawItem} from "@/components/tree/types";

interface TreeNodeProps {
  item: NodeItem;
  setRawData: React.Dispatch<React.SetStateAction<RawItem[]>>;
  depth?: number;
}

export function TreeNode({ item, setRawData, depth = 0 }: TreeNodeProps) {
  const [collapsed, setCollapsed] = useState(false);

  function toggleCollapse() {
    console.log("hello");
  }

  async function onIconClick() {
    setRawData(tree => [
      ...tree,
      { pmenuId: "root", menuId: "a" },
      { pmenuId: "root", menuId: "b" },
      { pmenuId: "a", menuId: "aa" },
      { pmenuId: "a", menuId: "ab" },
      { pmenuId: "b", menuId: "ba" },
      { pmenuId: "b", menuId: "bb" },
    ])
    setCollapsed(prevValue => !prevValue);
  }

  if(item.children.length > 0) {
    return (
      <div>
        <TreeHead
          depth={depth}
          collapsed={collapsed}
          content={item.menuId}
          onClick={toggleCollapse}
          onIconClick={onIconClick}
        />
        <div css={{
          overflow: "hidden",
          maxHeight: collapsed ? "100%" : "0",
        }}>
          {item.children.map((child) => (
            <TreeNode key={child.menuId} item={child} depth={depth + 1} setRawData={setRawData} />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <TreeHead
        depth={depth}
        collapsed={collapsed}
        content={item.menuId}
        onClick={toggleCollapse}
        onIconClick={onIconClick}
      />
    )
  }
}
