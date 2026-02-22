import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomColor(): string {
  const colors = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // amber
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#f97316", // orange
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function generateRandomName(): string {
  const adjectives = ["Swift", "Bright", "Clever", "Bold", "Quick", "Sharp", "Smart", "Nimble"]
  const nouns = ["Coder", "Editor", "Writer", "Dev", "Hacker", "Builder", "Maker", "Creator"]
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${adj}${noun}${Math.floor(Math.random() * 100)}`
}
