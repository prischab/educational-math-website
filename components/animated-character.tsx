"use client"

import { cn } from "@/lib/utils"

interface AnimatedCharacterProps {
  type: "owl" | "cat" | "robot"
  className?: string
}

export function AnimatedCharacter({ type, className }: AnimatedCharacterProps) {
  const characters = {
    owl: {
      emoji: "🦉",
      bgColor: "bg-primary",
      animation: "bounce-gentle",
    },
    cat: {
      emoji: "🐱",
      bgColor: "bg-secondary",
      animation: "wiggle",
    },
    robot: {
      emoji: "🤖",
      bgColor: "bg-accent",
      animation: "bounce-gentle",
    },
  }

  const character = characters[type]

  return (
    <div
      className={cn(
        "w-24 h-24 rounded-full flex items-center justify-center text-4xl cursor-pointer hover:scale-110 transition-transform",
        character.bgColor,
        character.animation,
        className,
      )}
    >
      {character.emoji}
    </div>
  )
}
