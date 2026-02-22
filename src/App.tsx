import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { CollaborativeEditor } from "@/components/editor/collaborative-editor"
import { useAppStore } from "@/stores/app-store"
import { useYjsDoc } from "@/hooks/use-yjs-doc"
import { Toaster } from "sonner"

function App() {
  const { user, roomId, initializeUser } = useAppStore()
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    initializeUser()

    // Check for room ID in URL
    const params = new URLSearchParams(window.location.search)
    const roomFromUrl = params.get("room")
    if (roomFromUrl) {
      useAppStore.getState().setRoomId(roomFromUrl)
    }

    // Listen for theme changes
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(isDark ? "dark" : "light")
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [initializeUser])

  const { doc, provider, yText, awareness, isConnected } = useYjsDoc({
    roomId,
    user,
  })

  useEffect(() => {
    if (provider) {
      useAppStore.getState().setConnected(isConnected)
    }
  }, [provider, isConnected])

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Initializing...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <CollaborativeEditor
            yText={yText}
            awareness={awareness}
            theme={theme}
          />
        </div>
        {roomId && awareness && (
          <Sidebar awareness={awareness} yText={yText} />
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
