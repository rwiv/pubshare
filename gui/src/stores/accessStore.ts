import {create} from "zustand";
import {FileResponse} from "@/client/access/types.ts";

interface AccessState {
  curFile: FileResponse | null;
  curDirectory: FileResponse | null;
  setCurFile: (file: FileResponse | null) => void;
  setCurDirectory: (file: FileResponse | null) => void;
}

export const useAccessStore = create<AccessState>(set => ({
  curFile: null,
  curDirectory: null,
  setCurFile: curFile => set(state => ({ ...state, curFile })),
  setCurDirectory: curDirectory => set(state => ({ ...state, curDirectory })),
}));
