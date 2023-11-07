export function parseISOString(iso: string) {
  const b = iso.split(/\D+/).map(s => Number(s));
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export function isoToPretty(iso: string) {
  const date = parseISOString(iso);
  return dateToPretty(date);
}

export function dateToPretty(date: Date) {
  const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${dateStr} ${timeStr}`;
}