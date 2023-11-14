import {cn} from "@/lib/utils.ts"
import {Link, useLocation} from "react-router-dom";
import {AccountResponse} from "@/client/account/types.ts";
import {accountTypes} from "@/common/accountTypes.ts";
import {isCurrent} from "@/util/path.ts";

interface NavBarProps {
  me: AccountResponse;
  className?: string;
}


export function NavBar({ me, className }: NavBarProps) {

  const location = useLocation();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link to="/" className={isCurrent("/", location.pathname)}>Home</Link>
      {me.type === accountTypes.ADMIN && (
        <Link to="/accounts" className={isCurrent("/accounts", location.pathname)}>Admin</Link>
      )}
    </nav>
  )
}