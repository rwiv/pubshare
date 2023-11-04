export function find<T>(arr: T[], cond: (elem: T) => boolean): T | null {
  for (const elem of arr) {
    if (cond(elem)) return elem;
  }
  return null;
}
