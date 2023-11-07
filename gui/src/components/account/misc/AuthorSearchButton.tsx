import React, {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {findByNameContains} from "@/client/artwork/authorClient.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Center, VStack} from "@/util/css/layoutComponents.ts";
import {Input} from "@/components/ui/input.tsx";

function AuthorSearchArea() {

  const [authors, setAuthors] = useState<Author[]>([]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value;
    if (name === "") {
      setAuthors([]);
      return;
    }
    const authors = await findByNameContains(name)
    setAuthors(authors);
  }

  return (
    <Center>
      <VStack>
        <Center>
          <Input className="w-72" onChange={onChange}/>
        </Center>
        <ScrollArea className="h-72 w-72 m-2 rounded-lg border">
          <div className="p-4">
            {authors.map((author) => (
              <div key={author.id}>
                <Button variant="link" className="w-60 justify-start">
                  <div>{author.name}</div>
                </Button>
                <Separator className="my-1" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </VStack>
    </Center>
  )
}

export function AuthorSearchButton() {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Search Authors</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Search Authors</DialogTitle>
          <DialogDescription>
            search authors
          </DialogDescription>
        </DialogHeader>
        <AuthorSearchArea />
      </DialogContent>
    </Dialog>
  )
}