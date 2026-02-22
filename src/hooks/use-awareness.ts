import { useEffect, useState } from "react"
import { Awareness } from "y-protocols/awareness"
import { getAwarenessStates, updateAwareness } from "@/lib/yjs-setup"
import { AwarenessState, CursorPosition, Selection } from "@/lib/types"

interface UseAwarenessOptions {
  awareness: Awareness | null
  updateCursor?: (cursor: CursorPosition | null) => void
  updateSelection?: (selection: Selection | null) => void
}

export function useAwareness({ awareness, updateCursor, updateSelection }: UseAwarenessOptions) {
  const [states, setStates] = useState<Map<number, AwarenessState>>(new Map())

  useEffect(() => {
    if (!awareness) return

    const updateStates = () => {
      const newStates = getAwarenessStates(awareness)
      setStates(new Map(newStates))
    }

    // Initial state
    updateStates()

    // Listen for changes
    awareness.on("change", updateStates)

    // Update local awareness when cursor/selection changes
    if (updateCursor || updateSelection) {
      const updateLocalAwareness = () => {
        const state: Partial<AwarenessState> = {}
        if (updateCursor) {
          // This will be called from Monaco editor
        }
        if (updateSelection) {
          // This will be called from Monaco editor
        }
      }
    }

    return () => {
      awareness.off("change", updateStates)
    }
  }, [awareness, updateCursor, updateSelection])

  const updateLocalCursor = (cursor: CursorPosition | null) => {
    if (!awareness) return
    updateAwareness(awareness, { cursor: cursor || undefined })
    if (updateCursor) {
      updateCursor(cursor)
    }
  }

  const updateLocalSelection = (selection: Selection | null) => {
    if (!awareness) return
    updateAwareness(awareness, { selection: selection || undefined })
    if (updateSelection) {
      updateSelection(selection)
    }
  }

  return {
    states,
    updateLocalCursor,
    updateLocalSelection,
  }
}
