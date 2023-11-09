import {SubmitHandler, useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {useEffect, useState} from "react";
import {HStack} from "@/util/css/layoutComponents.ts";
import {useQueryClient} from "@tanstack/react-query";
import {HttpError} from "@/client/common/HttpError.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {prettifyCode} from "@/client/common/errorUtil.ts";
import {FileTagCreationByTagName} from "@/client/file/types";
import {createFileTag, fileTagQueryKeys} from "@/client/file/fileTagClient.ts";
import {Input} from "@/components/ui/input.tsx";

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tag</DialogTitle>
          <DialogDescription>
            Please fill out the form
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField control={form.control} name="tagName" render={({ field }) => (
              <FormItem>
                <FormLabel>Tag Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
          </form>
        </Form>
        <DialogFooter>
          <HStack className="justify-end gap-3 mx-3 my-1">
            <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return { setOpen, component };
}
