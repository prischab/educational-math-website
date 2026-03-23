"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressData {
  score: number
  problemsSolved: number
  correctAnswers: number
  wrongAnswers: number
  averageTime: number
  bestStreak: number
  timeSpent: number
}

interface ProgressTrackerProps {
  data: ProgressData
}

export function ProgressTracker({ data }: ProgressTrackerProps) {
  const accuracy =
    data.correctAnswers + data.wrongAnswers > 0
      ? Math.round((data.correctAnswers / (data.correctAnswers + data.wrongAnswers)) * 100)
      : 0

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-2 border-primary/20">
        <h3 className="text-xl font-bold text-primary mb-4 font-[family-name:var(--font-fredoka)]">
          Learning Progress
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{data.problemsSolved}</div>
            <div className="text-sm text-muted-foreground">Problems Solved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">{data.bestStreak}</div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Accuracy</span>
              <span className="text-sm font-bold text-primary">{accuracy}%</span>
            </div>
            <Progress value={accuracy} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Level Progress</span>
              <span className="text-sm font-bold text-accent">{data.score % 50}/50</span>
            </div>
            <Progress value={(data.score % 50) * 2} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-2 border-accent/20">
        <h3 className="text-xl font-bold text-accent mb-4 font-[family-name:var(--font-fredoka)]">Session Stats</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-lg font-bold text-green-600">{data.correctAnswers}</div>
            <div className="text-sm text-muted-foreground">Correct ✅</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-500">{data.wrongAnswers}</div>
            <div className="text-sm text-muted-foreground">Incorrect ❌</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">{formatTime(data.timeSpent)}</div>
            <div className="text-sm text-muted-foreground">Time Spent</div>
          </div>
          <div>
            <div className="text-lg font-bold text-secondary">{data.averageTime}s</div>
            <div className="text-sm text-muted-foreground">Avg. Time</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
