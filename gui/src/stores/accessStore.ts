import {create} from "zustand";
import {FileResponse} from "@/client/access/types.ts";
import {rootFileResponse} from "@/client/access/rootFileResponse.ts";

interface AccessState {
  curFile: FileResponse | null;
  curDirectory: FileResponse;
  setCurFile: (file: FileResponse | null) => void;
  setCurDirectory: (file: FileResponse) => void;
}

export const useAccessStore = create<AccessState>(set => ({
  curFile: null,
  curDirectory: rootFileResponse,
  setCurFile: curFile => set(state => ({ ...state, curFile })),
  setCurDirectory: curDirectory => set(state => ({ ...state, curDirectory })),
}));
