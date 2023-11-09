import {HTMLAttributes} from "react";
import {cn} from "@/lib/utils"
import {Link, useLocation} from "react-router-dom";

function isCurrent(to: string) {
  const location = useLocation();
  const base = "text-sm font-medium transition-colors hover:text-primary";

  if (to === "/") {
    if (location.pathname === to) {
      return base;
    } else {
      return base + " text-muted-foreground";
    }
  }

  if (location.pathname.includes(to)) {
    return base;
  } else {
    return base + " text-muted-foreground";
  }
}

export function NavBar({ className, ...props }: HTMLAttributes<HTMLElement>) {

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link to="/" className={isCurrent("/")}>Home</Link>
      <Link to="/roles" className={isCurrent("/roles")}>Role</Link>
      <Link to="/accounts" className={isCurrent("/accounts")}>Account</Link>
    </nav>
  )
}