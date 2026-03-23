"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Difficulty = "easy" | "medium" | "hard"
type Operation = "addition" | "subtraction" | "multiplication"

interface MathProblemProps {
  difficulty: Difficulty
  operation: Operation
  onCorrect: () => void
  onWrong: () => void
  showCelebration: boolean
}

export function MathProblem({ difficulty, operation, onCorrect, onWrong, showCelebration }: MathProblemProps) {
  const [problem, setProblem] = useState({ num1: 0, num2: 0, answer: 0 })
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [options, setOptions] = useState<number[]>([])
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateOptions = (correctAnswer: number) => {
    const optionsSet = new Set([correctAnswer])

    while (optionsSet.size < 4) {
      let wrongAnswer: number

      const variation = Math.floor(Math.random() * 10) + 1
      const shouldAdd = Math.random() > 0.5

      if (shouldAdd) {
        wrongAnswer = correctAnswer + variation
      } else {
        wrongAnswer = Math.max(0, correctAnswer - variation)
      }

      if (wrongAnswer >= 0) {
        optionsSet.add(wrongAnswer)
      }
    }

    const optionsArray = Array.from(optionsSet)
    for (let i = optionsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]]
    }

    return optionsArray
  }

  const generateProblem = () => {
    const ranges = {
      easy: { min: 1, max: 10 },
      medium: { min: 1, max: 50 },
      hard: { min: 1, max: 100 },
    }

    const range = ranges[difficulty]
    let num1 = Math.floor(Math.random() * range.max) + range.min
    let num2 = Math.floor(Math.random() * range.max) + range.min
    let answer = 0

    if (operation === "subtraction" && num2 > num1) {
      ;[num1, num2] = [num2, num1]
    }

    if (operation === "multiplication") {
      num1 = Math.floor(Math.random() * (difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 12)) + 1
      num2 = Math.floor(Math.random() * (difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 12)) + 1
    }

    switch (operation) {
      case "addition":
        answer = num1 + num2
        break
      case "subtraction":
        answer = num1 - num2
        break
      case "multiplication":
        answer = num1 * num2
        break
    }

    setProblem({ num1, num2, answer })
    setOptions(generateOptions(answer))
    setSelectedAnswer(null)
    setFeedback(null)
  }

  useEffect(() => {
    generateProblem()
  }, [difficulty, operation])

  const handleAnswerSelect = (answer: number) => {
    if (isSubmitting) return

    setSelectedAnswer(answer)
    setIsSubmitting(true)

    if (answer === problem.answer) {
      setFeedback("correct")
      onCorrect()
      setTimeout(() => {
        generateProblem()
        setIsSubmitting(false)
      }, 1500)
    } else {
      setFeedback("wrong")
      onWrong()
      setTimeout(() => {
        setFeedback(null)
        setIsSubmitting(false)
      }, 1500)
    }
  }

  const getOperationSymbol = () => {
    switch (operation) {
      case "addition":
        return "+"
      case "subtraction":
        return "-"
      case "multiplication":
        return "×"
    }
  }

  return (
    <Card
      className={cn(
        "p-8 text-center transition-all duration-500",
        feedback === "correct" && "bg-green-100 border-green-300 scale-105",
        feedback === "wrong" && "bg-red-100 border-red-300 shake",
        showCelebration && "animate-pulse",
      )}
    >
      <div className="mb-8">
        <div className="text-6xl font-bold text-primary mb-6 font-[family-name:var(--font-fredoka)]">
          {problem.num1} {getOperationSymbol()} {problem.num2} = ?
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={isSubmitting}
              size="lg"
              className={cn(
                "text-3xl h-20 font-bold transition-all duration-200 hover:scale-105",
                selectedAnswer === option && feedback === "correct" && "bg-green-500 hover:bg-green-500",
                selectedAnswer === option && feedback === "wrong" && "bg-red-500 hover:bg-red-500",
                selectedAnswer !== option && "bg-primary hover:bg-primary/90",
              )}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {feedback === "correct" && (
        <div className="text-2xl font-bold text-green-600 mb-4 animate-bounce">🎉 Correct! Great job! 🎵</div>
      )}

      {feedback === "wrong" && (
        <div className="text-2xl font-bold text-red-600 mb-4">😅 Try again! The answer is {problem.answer}</div>
      )}

      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-8xl animate-ping">🎵</div>
        </div>
      )}
    </Card>
  )
}
