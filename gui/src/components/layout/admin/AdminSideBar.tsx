import {Link, useLocation} from "react-router-dom";
import {isCurrent} from "@/util/path.ts";
import {VStack} from "@/util/css/layoutComponents.ts";

interface AdminSideBarProps {
  className?: string;
}

const linkStyle = "m-2";

export function AdminSideBar({ className }: AdminSideBarProps) {

  const location = useLocation();

  return (
    <VStack className={className}>
      <div className={linkStyle}>
        <Link to="/accounts" className={isCurrent("/", location.pathname)}>Accounts</Link>
      </div>
      <div className={linkStyle}>
        <Link to="/roles" className={isCurrent("/roles", location.pathname)}>Role</Link>
      </div>
    </VStack>
  )
}