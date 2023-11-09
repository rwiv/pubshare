import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog.tsx";
import {HStack} from "@/util/css/layoutComponents.ts";
import {Button} from "@/components/ui/button.tsx";
import React, {ReactNode} from "react";

interface DialogTemplateProps {
  children: ReactNode;
  title: string;
  description?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function DialogTemplate({ children, title, description, open, setOpen, onSubmit }: DialogTemplateProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <HStack className="justify-end gap-3 mx-3 my-1">
            <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmit}>Submit</Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
