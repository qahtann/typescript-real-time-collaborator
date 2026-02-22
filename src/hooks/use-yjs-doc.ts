import { useEffect, useState, useRef } from "react"
import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"
import { createYjsDoc, createWebsocketProvider, getAwareness } from "@/lib/yjs-setup"
import { User } from "@/lib/types"
import { toast } from "sonner"

interface UseYjsDocOptions {
  roomId: string
  user: User | null
  wsUrl?: string
}

export function useYjsDoc({ roomId, user, wsUrl }: UseYjsDocOptions) {
  const [doc, setDoc] = useState<Y.Doc | null>(null)
  const [provider, setProvider] = useState<WebsocketProvider | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [yText, setYText] = useState<Y.Text | null>(null)
  const docRef = useRef<Y.Doc | null>(null)
  const providerRef = useRef<WebsocketProvider | null>(null)

  useEffect(() => {
    if (!roomId || !user) {
      return
    }

    // Create Yjs document
    const newDoc = createYjsDoc()
    docRef.current = newDoc
    setDoc(newDoc)

    // Get Y.Text for the editor
    const text = newDoc.getText("monaco")
    setYText(text)

    // Create WebSocket provider
    const wsUrlFinal = wsUrl || import.meta.env.VITE_WS_URL || "ws://localhost:1234"
    const newProvider = createWebsocketProvider(newDoc, roomId, user, wsUrlFinal)
    providerRef.current = newProvider
    setProvider(newProvider)

    // Handle connection events
    newProvider.on("status", (event: { status: string }) => {
      if (event.status === "connected") {
        setIsConnected(true)
        toast.success("Connected to room")
      } else if (event.status === "disconnected") {
        setIsConnected(false)
        toast.warning("Disconnected from room")
      }
    })

    newProvider.on("sync", (isSynced: boolean) => {
      if (isSynced) {
        setIsConnected(true)
      }
    })

    // Cleanup
    return () => {
      if (providerRef.current) {
        providerRef.current.destroy()
      }
      if (docRef.current) {
        docRef.current.destroy()
      }
    }
  }, [roomId, user, wsUrl])

  const awareness = provider ? getAwareness(provider) : null

  return {
    doc,
    provider,
    yText,
    awareness,
    isConnected,
  }
}
