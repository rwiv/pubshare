import {HStack} from "@/util/css/layoutComponents.ts";
import {SmallIconButton} from "@/components/common/SmallIconButton.tsx";
import {PlusIcon} from "@radix-ui/react-icons";
import React from "react";

interface FileHeaderProps {
  title: string;
  onAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function FileHeader({ title, onAdd }: FileHeaderProps) {
  return (
    <HStack className="items-center" css={{gap: 4}}>
      <h4 className="text-lg font-normal">{title}</h4>
      <SmallIconButton className="w-7 h-7" onClick={onAdd}>
        <PlusIcon className="p-1.5" />
      </SmallIconButton>
    </HStack>
  )
}
