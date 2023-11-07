export function getFilenameByKey(key: string) {
  if (key.charAt(key.length - 1) === '/') {
    key = key.substring(0, key.length - 1);
  }
  const chunks = key.split("/");
  return chunks[chunks.length - 1];
}

export function getParentKey(key: string) {
  if (key.charAt(key.length - 1) === '/') {
    key = key.substring(0, key.length - 1);
  }
  const chunks = key.split("/");
  chunks.pop();
  const result = chunks.join("/");
  if (result === "") {
    return result;
  } else {
    return result + "/";
  }
}
