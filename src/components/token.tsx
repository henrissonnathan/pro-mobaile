import create from 'zustand';

interface TokenStore {
  token: string | null;
  setToken: (newToken: string | null) => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  clearToken: () => set({ token: null }),
}));