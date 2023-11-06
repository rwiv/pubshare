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
  const token = JSON.parse(sessionStorage["token"])["state"]["token"];
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
}
