"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Achievement {
  id: string
  name: string
  description: string
  emoji: string
  requirement: number
  type: "score" | "streak" | "level" | "problems"
  unlocked: boolean
}

interface RewardSystemProps {
  score: number
  streak: number
  level: number
  problemsSolved: number
  onAchievementUnlocked?: (achievement: Achievement) => void
}

export function RewardSystem({ score, streak, level, problemsSolved, onAchievementUnlocked }: RewardSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-steps",
      name: "First Steps",
      description: "Solve your first math problem!",
      emoji: "👶",
      requirement: 1,
      type: "problems",
      unlocked: false,
    },
    {
      id: "math-rookie",
      name: "Math Rookie",
      description: "Solve 10 problems",
      emoji: "🌟",
      requirement: 10,
      type: "problems",
      unlocked: false,
    },
    {
      id: "streak-master",
      name: "Streak Master",
      description: "Get 5 answers in a row!",
      emoji: "🔥",
      requirement: 5,
      type: "streak",
      unlocked: false,
    },
    {
      id: "century-club",
      name: "Century Club",
      description: "Score 100 points",
      emoji: "💯",
      requirement: 100,
      type: "score",
      unlocked: false,
    },
    {
      id: "level-up",
      name: "Level Up!",
      description: "Reach level 3",
      emoji: "🚀",
      requirement: 3,
      type: "level",
      unlocked: false,
    },
    {
      id: "math-champion",
      name: "Math Champion",
      description: "Solve 50 problems",
      emoji: "🏆",
      requirement: 50,
      type: "problems",
      unlocked: false,
    },
    {
      id: "streak-legend",
      name: "Streak Legend",
      description: "Get 10 answers in a row!",
      emoji: "⚡",
      requirement: 10,
      type: "streak",
      unlocked: false,
    },
    {
      id: "high-scorer",
      name: "High Scorer",
      description: "Score 500 points",
      emoji: "💎",
      requirement: 500,
      type: "score",
      unlocked: false,
    },
  ])

  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([])

  useEffect(() => {
    const updatedAchievements = achievements.map((achievement) => {
      if (achievement.unlocked) return achievement

      let currentValue = 0
      switch (achievement.type) {
        case "score":
          currentValue = score
          break
        case "streak":
          currentValue = streak
          break
        case "level":
          currentValue = level
          break
        case "problems":
          currentValue = problemsSolved
          break
      }

      if (currentValue >= achievement.requirement) {
        const unlockedAchievement = { ...achievement, unlocked: true }
        setNewlyUnlocked((prev) => [...prev, unlockedAchievement])
        onAchievementUnlocked?.(unlockedAchievement)
        return unlockedAchievement
      }

      return achievement
    })

    setAchievements(updatedAchievements)
  }, [score, streak, level, problemsSolved])

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="space-y-4">
      {/* Achievement Progress */}
      <Card className="p-4 bg-card border-2 border-secondary/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-secondary font-[family-name:var(--font-fredoka)]">Achievements</h3>
          <Badge variant="secondary" className="text-sm">
            {unlockedCount}/{totalCount}
          </Badge>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {achievements.slice(0, 8).map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "aspect-square rounded-lg flex items-center justify-center text-2xl transition-all duration-300",
                achievement.unlocked
                  ? "bg-secondary/20 border-2 border-secondary scale-110"
                  : "bg-muted border border-border opacity-50",
              )}
              title={achievement.unlocked ? achievement.name : "???"}
            >
              {achievement.unlocked ? achievement.emoji : "🔒"}
            </div>
          ))}
        </div>
      </Card>

      {/* Stars Display */}
      <Card className="p-4 bg-card border-2 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-fredoka)]">Stars Earned</h3>
            <p className="text-sm text-muted-foreground">Collect stars for every 10 points!</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold text-primary">{Math.floor(score / 10)}</span>
            <span className="text-2xl">⭐</span>
          </div>
        </div>
      </Card>

      {/* Recently Unlocked */}
      {newlyUnlocked.length > 0 && (
        <Card className="p-4 bg-green-50 border-2 border-green-300 animate-pulse">
          <h3 className="text-lg font-bold text-green-700 mb-2 font-[family-name:var(--font-fredoka)]">
            🎉 New Achievement!
          </h3>
          {newlyUnlocked.slice(-1).map((achievement) => (
            <div key={achievement.id} className="flex items-center gap-3">
              <span className="text-3xl">{achievement.emoji}</span>
              <div>
                <div className="font-bold text-green-700">{achievement.name}</div>
                <div className="text-sm text-green-600">{achievement.description}</div>
              </div>
            </div>
          ))}
          <Button
            size="sm"
            variant="outline"
            className="mt-3 border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
            onClick={() => setNewlyUnlocked([])}
          >
            Awesome! 🎉
          </Button>
        </Card>
      )}
    </div>
  )
}
