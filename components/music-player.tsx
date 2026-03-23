"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface MusicPlayerProps {
  streak: number
}

export function MusicPlayer({ streak }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentNote, setCurrentNote] = useState<string | null>(null)

  // Musical notes for different streak levels
  const notes = [
    { note: "C4", frequency: 261.63, emoji: "🎵" },
    { note: "D4", frequency: 293.66, emoji: "🎶" },
    { note: "E4", frequency: 329.63, emoji: "🎼" },
    { note: "F4", frequency: 349.23, emoji: "🎹" },
    { note: "G4", frequency: 392.0, emoji: "🎺" },
    { note: "A4", frequency: 440.0, emoji: "🎸" },
    { note: "B4", frequency: 493.88, emoji: "🥁" },
    { note: "C5", frequency: 523.25, emoji: "🎤" },
  ]

  const playNote = (frequency: number, duration = 500) => {
    if (typeof window === "undefined") return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    } catch (error) {
      console.log("Audio not supported")
    }
  }

  const playMelody = () => {
    if (streak === 0) return

    setIsPlaying(true)
    const noteIndex = Math.min(streak - 1, notes.length - 1)
    const selectedNote = notes[noteIndex]

    setCurrentNote(selectedNote.emoji)
    playNote(selectedNote.frequency)

    // For streaks > 3, play a short melody
    if (streak >= 3) {
      setTimeout(() => playNote(selectedNote.frequency * 1.25), 200)
      setTimeout(() => playNote(selectedNote.frequency * 1.5), 400)
    }

    setTimeout(() => {
      setIsPlaying(false)
      setCurrentNote(null)
    }, 1000)
  }

  useEffect(() => {
    if (streak > 0) {
      playMelody()
    }
  }, [streak])

  return (
    <div className="text-center">
      <div className="mb-4">
        {currentNote ? (
          <div className="text-4xl animate-bounce">{currentNote}</div>
        ) : (
          <div className="text-4xl opacity-50">🎵</div>
        )}
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        {streak === 0 && "Get your first answer right to hear music!"}
        {streak === 1 && "Nice! You heard your first note!"}
        {streak >= 2 && streak < 3 && "Great streak! The music is getting better!"}
        {streak >= 3 && "Amazing! You're creating beautiful melodies!"}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={playMelody}
        disabled={streak === 0 || isPlaying}
        className="text-accent border-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
      >
        🎵 Replay Music
      </Button>
    </div>
  )
}
