"use client"

import { cn } from "@/lib/utils"

interface MusicNoteProps {
  className?: string
  delay?: number
}

export function MusicNote({ className, delay = 0 }: MusicNoteProps) {
  return (
    <div
      className={cn("text-2xl opacity-60 animate-bounce", className)}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "3s",
      }}
    >
      🎵
    </div>
  )
}
