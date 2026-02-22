import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User } from "@/lib/types"
import { generateRandomColor, generateRandomName } from "@/lib/utils"

interface AppState {
  user: User | null
  roomId: string
  isConnected: boolean
  setUser: (user: User) => void
  setRoomId: (roomId: string) => void
  setConnected: (connected: boolean) => void
  initializeUser: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      roomId: "",
      isConnected: false,
      setUser: (user) => set({ user }),
      setRoomId: (roomId) => set({ roomId }),
      setConnected: (isConnected) => set({ isConnected }),
      initializeUser: () => {
        const stored = localStorage.getItem("app-storage")
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed.state?.user) {
            return
          }
        }
        set({
          user: {
            id: Date.now(),
            name: generateRandomName(),
            color: generateRandomColor(),
          },
        })
      },
    }),
    {
      name: "app-storage",
    }
  )
)
