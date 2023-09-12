import { Dispatch, SetStateAction } from 'react';

export interface FileResponse {
  type: string;
  name: string;
  modified: string;
  size: number;
}

interface SubProps {
  files: FileResponse[];
  selection: string[];
  setSelection: Dispatch<SetStateAction<string[]>>;
}
