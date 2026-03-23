"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParentChart } from "@/components/parent-chart"
import { LearningRecommendations } from "@/components/learning-recommendations"
import Link from "next/link"

// Mock data - in a real app, this would come from a database
const mockChildData = {
  name: "Sidharth",
  age: 7,
  totalScore: 1250,
  problemsSolved: 125,
  accuracy: 85,
  averageSessionTime: 15, // minutes
  favoriteOperation: "addition",
  currentLevel: 8,
  achievements: [
    { name: "First Steps", emoji: "👶", unlocked: true },
    { name: "Math Rookie", emoji: "🌟", unlocked: true },
    { name: "Streak Master", emoji: "🔥", unlocked: true },
    { name: "Century Club", emoji: "💯", unlocked: true },
    { name: "Level Up!", emoji: "🚀", unlocked: true },
    { name: "Math Champion", emoji: "🏆", unlocked: false },
    { name: "Streak Legend", emoji: "⚡", unlocked: false },
    { name: "High Scorer", emoji: "💎", unlocked: false },
  ],
  weeklyProgress: [
    { day: "Mon", problems: 12, accuracy: 90 },
    { day: "Tue", problems: 8, accuracy: 75 },
    { day: "Wed", problems: 15, accuracy: 85 },
    { day: "Thu", problems: 10, accuracy: 95 },
    { day: "Fri", problems: 18, accuracy: 80 },
    { day: "Sat", problems: 22, accuracy: 88 },
    { day: "Sun", problems: 16, accuracy: 92 },
  ],
  skillProgress: {
    addition: 95,
    subtraction: 78,
    multiplication: 45,
  },
  recentSessions: [
    { date: "2024-01-15", duration: 12, problems: 15, accuracy: 87 },
    { date: "2024-01-14", duration: 18, problems: 22, accuracy: 91 },
    { date: "2024-01-13", duration: 8, problems: 10, accuracy: 80 },
    { date: "2024-01-12", duration: 15, problems: 18, accuracy: 94 },
    { date: "2024-01-11", duration: 20, problems: 25, accuracy: 88 },
  ],
}

export default function ParentsPage() {
  const [selectedChild] = useState(mockChildData)

  const unlockedAchievements = selectedChild.achievements.filter((a) => a.unlocked).length
  const totalAchievements = selectedChild.achievements.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="outline" className="text-primary border-primary bg-transparent">
              ← Back Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary font-[family-name:var(--font-fredoka)]">
              Parents Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Track your child's math learning progress</p>
          </div>
          <div></div>
        </div>

        {/* Child Overview */}
        <Card className="p-6 mb-8 bg-card border-2 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-3xl">👦</div>
              <div>
                <h2 className="text-2xl font-bold text-primary font-[family-name:var(--font-fredoka)]">
                  {selectedChild.name}'s Progress
                </h2>
                <p className="text-muted-foreground">
                  Age {selectedChild.age} • Level {selectedChild.currentLevel}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-secondary">{selectedChild.totalScore}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{selectedChild.problemsSolved}</div>
              <div className="text-sm text-muted-foreground">Problems Solved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{selectedChild.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{selectedChild.averageSessionTime}m</div>
              <div className="text-sm text-muted-foreground">Avg. Session</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {unlockedAchievements}/{totalAchievements}
              </div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
          </div>
        </Card>

        {/* Tabs for detailed views */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="recommendations">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-2 border-accent/20">
                <h3 className="text-xl font-bold text-accent mb-4 font-[family-name:var(--font-fredoka)]">
                  Weekly Activity
                </h3>
                <ParentChart data={selectedChild.weeklyProgress} type="weekly" />
              </Card>

              <Card className="p-6 bg-card border-2 border-secondary/20">
                <h3 className="text-xl font-bold text-secondary mb-4 font-[family-name:var(--font-fredoka)]">
                  Skill Mastery
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Addition ➕</span>
                      <span className="text-sm font-bold text-primary">{selectedChild.skillProgress.addition}%</span>
                    </div>
                    <Progress value={selectedChild.skillProgress.addition} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Subtraction ➖</span>
                      <span className="text-sm font-bold text-primary">{selectedChild.skillProgress.subtraction}%</span>
                    </div>
                    <Progress value={selectedChild.skillProgress.subtraction} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Multiplication ✖️</span>
                      <span className="text-sm font-bold text-primary">
                        {selectedChild.skillProgress.multiplication}%
                      </span>
                    </div>
                    <Progress value={selectedChild.skillProgress.multiplication} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="p-6 bg-card border-2 border-secondary/20">
              <h3 className="text-xl font-bold text-secondary mb-4 font-[family-name:var(--font-fredoka)]">
                Achievement Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedChild.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg text-center transition-all ${
                      achievement.unlocked
                        ? "bg-secondary/20 border-2 border-secondary"
                        : "bg-muted border border-border opacity-50"
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.unlocked ? achievement.emoji : "🔒"}</div>
                    <div className="font-bold text-sm">{achievement.unlocked ? achievement.name : "???"}</div>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Unlocked!
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card className="p-6 bg-card border-2 border-primary/20">
              <h3 className="text-xl font-bold text-primary mb-4 font-[family-name:var(--font-fredoka)]">
                Recent Learning Sessions
              </h3>
              <div className="space-y-3">
                {selectedChild.recentSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {session.problems}
                      </div>
                      <div>
                        <div className="font-medium">{session.date}</div>
                        <div className="text-sm text-muted-foreground">{session.duration} minutes</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-accent">{session.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">accuracy</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <LearningRecommendations childData={selectedChild} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
