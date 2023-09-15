import {MainNav} from "@/components/header/MainNav.tsx";
import {UserNav} from "@/components/header/UserNav.tsx";
import {Search} from "@/components/header/Search.tsx";

export function AppHeader() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
}