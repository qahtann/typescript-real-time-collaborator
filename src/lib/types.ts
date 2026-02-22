export interface User {
  id: number
  name: string
  color: string
}

export interface ChatMessage {
  id: string
  userId: number
  userName: string
  message: string
  timestamp: number
}

export interface CursorPosition {
  lineNumber: number
  column: number
}

export interface Selection {
  startLineNumber: number
  startColumn: number
  endLineNumber: number
  endColumn: number
}

export interface AwarenessState {
  user: User
  cursor?: CursorPosition
  selection?: Selection
}
