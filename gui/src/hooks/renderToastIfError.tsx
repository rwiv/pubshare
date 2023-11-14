import {HttpError} from "@/client/common/HttpError.ts";
import {prettifyCode} from "@/client/common/errorUtil.ts";
import {ToastAction, ToastActionElement, ToastProps} from "@/components/ui/toast.tsx";
import * as React from "react";

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type Toast = Omit<ToasterToast, "id">;

interface ToastResult {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
}

export async function renderToastIfError(toast: (x: Toast) => ToastResult, fn: () => Promise<void>) {

  try {
    await fn();
  } catch (e) {
    if (e instanceof HttpError) {
      toast({
        title: prettifyCode(e.code),
        description: e.message,
        action: (<ToastAction altText="Close">Close</ToastAction>),
      });
    }
  }
}
