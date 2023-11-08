export function getFilenameByKey(key: string) {
  if (isDirKey(key)) {
    key = key.substring(0, key.length - 1);
  }
  const chunks = key.split("/");
  return chunks[chunks.length - 1];
}

export function getParentKey(key: string) {
  if (isDirKey(key)) {
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

export function isDirKey(key: string) {
  return key.charAt(key.length - 1) === "/";
}
