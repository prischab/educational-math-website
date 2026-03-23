"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MathProblem } from "@/components/math-problem"
import { MusicPlayer } from "@/components/music-player"
import { ScoreDisplay } from "@/components/score-display"
import { AnimatedCharacter } from "@/components/animated-character"
import { RewardSystem } from "@/components/reward-system"
import { ProgressTracker } from "@/components/progress-tracker"
import Link from "next/link"

type Difficulty = "easy" | "medium" | "hard"
type Operation = "addition" | "subtraction" | "multiplication"

export default function GamePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [operation, setOperation] = useState<Operation>("addition")
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const [problemsSolved, setProblemsSolved] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    if (gameStarted && startTime === 0) {
      setStartTime(Date.now())
    }

    const interval = setInterval(() => {
      if (gameStarted && startTime > 0) {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [gameStarted, startTime])

  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 10)
    setStreak((prev) => {
      const newStreak = prev + 1
      setBestStreak((best) => Math.max(best, newStreak))
      return newStreak
    })
    setShowCelebration(true)

    setProblemsSolved((prev) => prev + 1)
    setCorrectAnswers((prev) => prev + 1)

    // Level up every 5 correct answers
    if ((score + 10) % 50 === 0) {
      setLevel((prev) => prev + 1)
    }

    setTimeout(() => setShowCelebration(false), 2000)
  }

  const handleWrongAnswer = () => {
    setStreak(0)
    setProblemsSolved((prev) => prev + 1)
    setWrongAnswers((prev) => prev + 1)
  }

  const resetGame = () => {
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setLevel(1)
    setGameStarted(false)
    setProblemsSolved(0)
    setCorrectAnswers(0)
    setWrongAnswers(0)
    setStartTime(0)
    setTimeSpent(0)
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-cyan-50 p-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="outline" className="text-primary border-primary bg-transparent">
                ← Back Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-primary font-[family-name:var(--font-fredoka)]">Math Game Setup</h1>
            <div></div>
          </div>

          {/* Game Setup */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-8 bg-card border-2 border-primary/20">
              <h2 className="text-2xl font-bold text-primary mb-6 font-[family-name:var(--font-fredoka)]">
                Choose Difficulty
              </h2>
              <div className="space-y-4">
                {[
                  { value: "easy", label: "Easy (1-10)", emoji: "🌟" },
                  { value: "medium", label: "Medium (1-50)", emoji: "⭐" },
                  { value: "hard", label: "Hard (1-100)", emoji: "🏆" },
                ].map((diff) => (
                  <Button
                    key={diff.value}
                    variant={difficulty === diff.value ? "default" : "outline"}
                    className="w-full text-left justify-start text-lg py-6"
                    onClick={() => setDifficulty(diff.value as Difficulty)}
                  >
                    <span className="mr-3">{diff.emoji}</span>
                    {diff.label}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-card border-2 border-secondary/20">
              <h2 className="text-2xl font-bold text-secondary mb-6 font-[family-name:var(--font-fredoka)]">
                Choose Operation
              </h2>
              <div className="space-y-4">
                {[
                  { value: "addition", label: "Addition (+)", emoji: "➕" },
                  { value: "subtraction", label: "Subtraction (-)", emoji: "➖" },
                  { value: "multiplication", label: "Multiplication (×)", emoji: "✖️" },
                ].map((op) => (
                  <Button
                    key={op.value}
                    variant={operation === op.value ? "secondary" : "outline"}
                    className="w-full text-left justify-start text-lg py-6"
                    onClick={() => setOperation(op.value as Operation)}
                  >
                    <span className="mr-3">{op.emoji}</span>
                    {op.label}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Character Guide */}
          <div className="text-center mb-8">
            <AnimatedCharacter type="owl" className="mx-auto mb-4" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Great choice! I'll help you practice {operation} problems. Every correct answer will play a beautiful
              musical note!
            </p>
          </div>

          <div className="text-center">
            <Button size="lg" className="text-2xl px-12 py-8 pulse-glow" onClick={() => setGameStarted(true)}>
              🎮 Start Game!
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-cyan-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={resetGame} className="text-primary border-primary bg-transparent">
            ← New Game
          </Button>
          <ScoreDisplay score={score} streak={streak} level={level} />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Level {level} Progress</span>
            <span className="text-sm font-medium text-muted-foreground">{score % 50}/50 points</span>
          </div>
          <Progress value={(score % 50) * 2} className="h-3" />
        </div>

        {/* Game Area */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Math Problem */}
          <div className="lg:col-span-2">
            <MathProblem
              difficulty={difficulty}
              operation={operation}
              onCorrect={handleCorrectAnswer}
              onWrong={handleWrongAnswer}
              showCelebration={showCelebration}
            />
          </div>

          {/* Character & Music */}
          <div className="space-y-6">
            <Card className="p-6 text-center bg-card border-2 border-accent/20">
              <AnimatedCharacter type="cat" className="mx-auto mb-4" />
              <h3 className="text-lg font-bold text-accent mb-2 font-[family-name:var(--font-fredoka)]">Melody Cat</h3>
              <p className="text-sm text-muted-foreground mb-4">I'll play music when you get it right!</p>
              <MusicPlayer streak={streak} />
            </Card>

            <Card className="p-6 bg-card border-2 border-primary/20">
              <h3 className="text-lg font-bold text-primary mb-4 font-[family-name:var(--font-fredoka)]">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Current Streak:</span>
                  <span className="font-bold text-secondary">{streak} 🔥</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Score:</span>
                  <span className="font-bold text-primary">{score} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Level:</span>
                  <span className="font-bold text-accent">{level} 🏆</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <RewardSystem score={score} streak={streak} level={level} problemsSolved={problemsSolved} />

            <ProgressTracker
              data={{
                score,
                problemsSolved,
                correctAnswers,
                wrongAnswers,
                averageTime: correctAnswers > 0 ? Math.round(timeSpent / correctAnswers) : 0,
                bestStreak,
                timeSpent,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
