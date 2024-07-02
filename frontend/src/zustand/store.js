import { create } from 'zustand'

export const useUserStore = create((set) => ({
  userData: null,
  notification: null,
  setUserData: (value) => set(() => ({ userData: value })),
  setNotification: (value) => set(() => ({notification: value}))
}))