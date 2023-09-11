import {create} from "zustand";

interface MyData {
  username: string;
}
interface MyDataState {
  myData: MyData | null;
  setMyData: (my: MyData) => void
}
export const useMyDataStore = create<MyDataState>(set => ({
  myData: null,
  setMyData: (my) => set((state) => ({ myData: my }))
}));