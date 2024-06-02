import { create } from 'zustand'

export const useUserStore = create((set) => ({
  userData: null,
  setUserData: (value) => set(() => ({ userData: value })),
}))