import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"
import { Awareness } from "y-protocols/awareness"
import { User, AwarenessState } from "./types"

export function createYjsDoc(): Y.Doc {
  return new Y.Doc()
}

export function createWebsocketProvider(
  doc: Y.Doc,
  roomId: string,
  user: User,
  wsUrl: string = "ws://localhost:1234"
): WebsocketProvider {
  const provider = new WebsocketProvider(wsUrl, roomId, doc, {
    connect: true,
  })

  // Set awareness state
  provider.awareness.setLocalStateField("user", user)

  return provider
}

export function getAwareness(provider: WebsocketProvider): Awareness {
  return provider.awareness
}

export function updateAwareness(
  awareness: Awareness,
  state: Partial<AwarenessState>
): void {
  const currentState = awareness.getLocalState() as AwarenessState
  awareness.setLocalState({
    ...currentState,
    ...state,
  })
}

export function getAwarenessStates(awareness: Awareness): Map<number, AwarenessState> {
  return awareness.getStates()
}
