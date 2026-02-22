"use client"

import { useEffect, useRef, useState } from "react"
import Editor, { Monaco } from "@monaco-editor/react"
import * as Y from "yjs"
// @ts-ignore - y-monaco types may not be available
import { MonacoBinding } from "y-monaco/dist/y-monaco"
import { useAppStore } from "@/stores/app-store"
import { useAwareness } from "@/hooks/use-awareness"
import type { editor } from "monaco-editor"

interface CollaborativeEditorProps {
  yText: Y.Text | null
  awareness: any
  theme: "light" | "dark"
}

export function CollaborativeEditor({
  yText,
  awareness,
  theme,
}: CollaborativeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const bindingRef = useRef<MonacoBinding | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const { user } = useAppStore()
  const [isLoading, setIsLoading] = useState(true)

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor
    monacoRef.current = monaco

    if (!yText || !user) {
      setIsLoading(false)
      return
    }

    try {
      // Create Monaco binding
      const binding = new MonacoBinding(
        yText,
        editor.getModel()!,
        new Set([editor]),
        awareness
      )
      bindingRef.current = binding

      // Update awareness on cursor/selection change
      editor.onDidChangeCursorPosition((e) => {
        if (awareness && user) {
          awareness.setLocalStateField("cursor", {
            lineNumber: e.position.lineNumber,
            column: e.position.column,
          })
        }
      })

      editor.onDidChangeCursorSelection((e) => {
        if (awareness && user) {
          const selection = e.selection
          if (!selection.isEmpty()) {
            awareness.setLocalStateField("selection", {
              startLineNumber: selection.startLineNumber,
              startColumn: selection.startColumn,
              endLineNumber: selection.endLineNumber,
              endColumn: selection.endColumn,
            })
          } else {
            awareness.setLocalStateField("selection", undefined)
          }
        }
      })

      setIsLoading(false)
    } catch (error) {
      console.error("Error setting up Monaco binding:", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy()
      }
    }
  }, [])

  if (!yText) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Connecting to room...</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        theme={theme === "dark" ? "vs-dark" : "vs"}
        onMount={handleEditorDidMount}
        loading={isLoading ? "Loading editor..." : undefined}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  )
}
