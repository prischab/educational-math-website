import { Card } from "@/components/ui/card"

interface ScoreDisplayProps {
  score: number
  streak: number
  level: number
}

export function ScoreDisplay({ score, streak, level }: ScoreDisplayProps) {
  return (
    <div className="flex gap-4">
      <Card className="px-4 py-2 bg-primary text-primary-foreground">
        <div className="text-sm font-medium">Score</div>
        <div className="text-2xl font-bold">{score}</div>
      </Card>

      <Card className="px-4 py-2 bg-secondary text-secondary-foreground">
        <div className="text-sm font-medium">Streak</div>
        <div className="text-2xl font-bold">{streak} 🔥</div>
      </Card>

      <Card className="px-4 py-2 bg-accent text-accent-foreground">
        <div className="text-sm font-medium">Level</div>
        <div className="text-2xl font-bold">{level}</div>
      </Card>
    </div>
  )
}
