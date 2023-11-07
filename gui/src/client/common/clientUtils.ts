import axios from "axios";
import {HttpError, HttpErrorResponse} from "@/client/common/HttpError.ts";

export function runCatching<T>(fn: () => T) {
  try {
    return fn();
  } catch (e) {
    if (axios.isAxiosError<HttpErrorResponse>(e)) {
      const errorResponse = e.response?.data;
      if (errorResponse === undefined) {
        throw Error("HttpErrorResponse is undefined");
      }
      throw new HttpError(errorResponse);
    }
  }
}

export function getHeaderConfig() {
  return { headers: getHeaders() };
}

export function getHeaders() {
  const token = JSON.parse(sessionStorage["token"])["state"]["token"];
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function getFilenameByKey(key: string) {
  if (key.charAt(key.length - 1) === '/') {
    key = key.substring(0, key.length - 1);
  }
  const chunks = key.split("/");
  return chunks[chunks.length - 1];
}