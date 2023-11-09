import axios from "axios";
import {HttpError, HttpErrorResponse} from "@/client/common/HttpError.ts";

export async function runCatching<T>(fn: () => T) {
  try {
    return await fn();
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
