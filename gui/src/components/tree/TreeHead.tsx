import {TriangleDownIcon, TriangleRightIcon} from "@radix-ui/react-icons";

interface IconProps {
  collapsed: boolean;
  onClick: () => void;
}

function Icon({ collapsed, onClick }: IconProps) {
  const icon = collapsed ? <TriangleDownIcon /> : <TriangleRightIcon />;
  return (
    <div onClick={onClick}>{icon}</div>
  )
}

interface TreeTitleProps {
  depth: number;
  content: string;
  onClick: () => void;
  onIconClick: () => void;
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