import {ChevronDownIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import React from "react";

interface IconProps {
  collapsed: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Icon({ collapsed, onClick }: IconProps) {
  const icon = collapsed
    ? <ChevronDownIcon className="w-6 h-6 p-1 hover:bg-gray-300 rounded-lg" />
    : <ChevronRightIcon className="w-6 h-6 p-1 hover:bg-gray-300 rounded-lg" />;

  return (
    <div className="w-8 h-8 mt-1.5 flex justify-center" onClick={onClick}>{icon}</div>
  )
}

interface TreeTitleProps {
  depth: number;
  content: string;
  onClick: () => void;
  onIconClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  collapsed: boolean;
}

export function TreeHead({ depth, content, onClick, onIconClick, collapsed }: TreeTitleProps) {
  return (
    <div onClick={onClick} css={{
      display: "flex",
      alignItems: "center",
      paddingLeft: `${depth * 20}px`,
      height: "32px",
      "&:hover": {
        backgroundColor: "#f6f6f2",
        cursor: "pointer",
        borderRight: "solid 5px",
      },
    }}>
      <Icon collapsed={collapsed} onClick={onIconClick} />
      {content}
    </div>
  )
}