export function isCurrent(to: string, path: string) {
  const base = "text-sm font-medium transition-colors hover:text-primary";

  if (to === "/") {
    if (path === to) {
      return base;
    } else {
      return base + " text-muted-foreground";
    }
  }

  if (path.includes(to)) {
    return base;
  } else {
    return base + " text-muted-foreground";
  }
}
