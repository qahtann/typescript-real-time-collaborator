"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Download, Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/stores/app-store"
import { toast } from "sonner"
import { useYjsDoc } from "@/hooks/use-yjs-doc"

export function Header() {
  const { user, roomId, setRoomId, setUser, isConnected, initializeUser } =
    useAppStore()
  const [localRoomId, setLocalRoomId] = useState(roomId)
  const [localUserName, setLocalUserName] = useState(user?.name || "")
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const { yText } = useYjsDoc({
    roomId,
    user,
  })

  useEffect(() => {
    initializeUser()
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle("dark", storedTheme === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [initializeUser])

  const handleJoinRoom = () => {
    if (!localRoomId.trim()) {
      toast.error("Please enter a room ID")
      return
    }
    if (!localUserName.trim()) {
      toast.error("Please enter your name")
      return
    }
    if (user) {
      setUser({ ...user, name: localUserName })
    }
    setRoomId(localRoomId.trim())
    toast.success(`Joined room: ${localRoomId}`)
  }

  const handleShareRoom = () => {
    const url = `${window.location.origin}?room=${roomId}`
    navigator.clipboard.writeText(url)
    toast.success("Room URL copied to clipboard!")
  }

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    toast.success("Room ID copied!")
  }

  const handleExport = () => {
    if (!yText) {
      toast.error("No content to export")
      return
    }
    const content = yText.toString()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `collaboration-${roomId || "untitled"}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("File exported!")
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Real-Time Collaborator</h1>
          {isConnected && (
            <Badge variant="secondary" className="gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Connected
            </Badge>
          )}
        </div>

        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Room ID"
            value={localRoomId}
            onChange={(e) => setLocalRoomId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleJoinRoom()
              }
            }}
            className="max-w-[200px]"
          />
          <Input
            placeholder="Your name"
            value={localUserName}
            onChange={(e) => setLocalUserName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleJoinRoom()
              }
            }}
            className="max-w-[200px]"
          />
          <Button onClick={handleJoinRoom} size="sm">
            Join
          </Button>
          {roomId && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyRoomId}
                title="Copy Room ID"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShareRoom}
                title="Share Room"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={handleExport}
            title="Export"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
