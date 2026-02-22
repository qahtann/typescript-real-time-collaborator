"use client"

import { useState, useEffect } from "react"
import { Users, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAwareness } from "@/hooks/use-awareness"
import { AwarenessState, ChatMessage } from "@/lib/types"
import { useAppStore } from "@/stores/app-store"
import * as Y from "yjs"

interface SidebarProps {
  awareness: any
  yText: Y.Text | null
}

export function Sidebar({ awareness, yText }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"users" | "chat">("users")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [messageInput, setMessageInput] = useState("")
  const { user } = useAppStore()
  const { states } = useAwareness({ awareness })

  // Chat using Yjs Array
  useEffect(() => {
    if (!yText || !user) return

    // Get or create chat array
    const doc = yText.doc
    const chatArray = doc.getArray<ChatMessage>("chat")

    const updateMessages = () => {
      const messages = chatArray.toArray()
      setChatMessages(messages)
    }

    updateMessages()
    chatArray.observe(updateMessages)

    return () => {
      chatArray.unobserve(updateMessages)
    }
  }, [yText, user])

  const handleSendMessage = () => {
    if (!messageInput.trim() || !user || !yText) return

    const doc = yText.doc
    const chatArray = doc.getArray<ChatMessage>("chat")

    const message: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      userId: user.id,
      userName: user.name,
      message: messageInput.trim(),
      timestamp: Date.now(),
    }

    chatArray.push([message])
    setMessageInput("")
  }

  const onlineUsers = Array.from(states.values())
    .map((state) => (state as AwarenessState).user)
    .filter((u) => u && u.id !== user?.id)

  return (
    <div className="flex h-full w-80 flex-col border-l bg-background">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "users"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="h-4 w-4" />
          Users ({onlineUsers.length + 1})
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "chat"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "users" ? (
          <div className="space-y-4">
            {user && (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Avatar style={{ backgroundColor: user.color }}>
                  <AvatarFallback className="text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">You</p>
                </div>
                <Badge variant="secondary">Online</Badge>
              </div>
            )}
            <Separator />
            {onlineUsers.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Online Users
                </p>
                {onlineUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <Avatar style={{ backgroundColor: u.color }}>
                      <AvatarFallback className="text-white">
                        {u.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{u.name}</p>
                    </div>
                    <Badge variant="secondary">Online</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No other users online
              </p>
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex-1 space-y-2 overflow-y-auto">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-lg p-2 ${
                    msg.userId === user?.id
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  style={{
                    maxWidth: "80%",
                  }}
                >
                  <p className="text-xs font-medium opacity-70">
                    {msg.userName}
                  </p>
                  <p className="text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage} size="sm">
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
