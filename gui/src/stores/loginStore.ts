import {create} from 'zustand';
import {createJSONStorage, persist} from "zustand/middleware";

export interface TokenState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useTokenStore = create<TokenState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      token: null,
      setToken: token => set(() => ({ token })),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
