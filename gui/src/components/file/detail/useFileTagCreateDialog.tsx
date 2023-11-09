import {SubmitHandler, useForm} from "react-hook-form";
import { Form } from "@/components/ui/form.tsx";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {HttpError} from "@/client/common/HttpError.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {prettifyCode} from "@/client/common/errorUtil.ts";
import {FileTagCreationByTagName} from "@/client/file/types";
import {createFileTag, fileTagQueryKeys} from "@/client/file/fileTagClient.ts";
import {InputFormField} from "@/components/common/form/InputFormField.tsx";
import {DialogTemplate} from "@/components/common/DialogTemplate.tsx";

interface FileTagCreationForm {
  fileId: string;
  tagName: string;
}

export function useFileTagCreateDialog(fileId: number) {

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<FileTagCreationForm>({
    defaultValues: {
      fileId: "",
      tagName: "",
    }
  });

  useEffect(() => {
    form.setValue("fileId", `${fileId}`);
  }, [fileId, form]);

  const onSubmit: SubmitHandler<FileTagCreationForm> = async form => {
    if (form.fileId === "" || form.tagName === "") {
      throw Error("form data is empty");
    }
    const creation: FileTagCreationByTagName = {
      fileId: parseInt(form.fileId),
      tagName: form.tagName,
    }

    try {
      await createFileTag(creation);
      await queryClient.invalidateQueries({ queryKey: [fileTagQueryKeys.fileId, fileId] });
      setOpen(false);
    } catch (e) {
      if (e instanceof HttpError) {
        toast({
          title: prettifyCode(e.code),
          description: e.message,
          action: (<ToastAction altText="Close">Close</ToastAction>),
        });
      }
    }
  };

  const component = (
    <DialogTemplate
      title="Add Tag" description="Please fill out the form"
      open={open} setOpen={setOpen}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form className="space-y-4">
          <InputFormField form={form} fieldName="tagName" label="Tag Name" />
        </form>
      </Form>
    </DialogTemplate>
  )

  return { setOpen, component };
}
