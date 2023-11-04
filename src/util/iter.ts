export function find<T>(arr: T[], cond: (elem: T) => boolean): T | null {
  for (const elem of arr) {
    if (cond(elem)) return elem;
  }
  return null;
}

export function filterMap<T, R>(
  arr: T[],
  cond: (elem: T) => { ok: boolean; res: R },
) {
  const result: R[] = [];
  for (const elem of arr) {
    const res = cond(elem);
    if (res.ok) {
      result.push(res.res);
    }
  }
  return result;
}
