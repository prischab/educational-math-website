import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ChildData {
  name: string
  accuracy: number
  skillProgress: {
    addition: number
    subtraction: number
    multiplication: number
  }
  favoriteOperation: string
  averageSessionTime: number
}

interface LearningRecommendationsProps {
  childData: ChildData
}

export function LearningRecommendations({ childData }: LearningRecommendationsProps) {
  const getRecommendations = () => {
    const recommendations = []

    // Accuracy-based recommendations
    if (childData.accuracy < 70) {
      recommendations.push({
        title: "Focus on Accuracy",
        description: "Consider slowing down and double-checking answers. Quality over quantity!",
        emoji: "🎯",
        priority: "high",
      })
    }

    // Skill-based recommendations
    if (childData.skillProgress.multiplication < 50) {
      recommendations.push({
        title: "Multiplication Practice",
        description: "Try using visual aids like arrays or skip counting to make multiplication easier.",
        emoji: "✖️",
        priority: "medium",
      })
    }

    if (childData.skillProgress.subtraction < 80) {
      recommendations.push({
        title: "Subtraction Support",
        description: "Use physical objects or number lines to visualize subtraction problems.",
        emoji: "➖",
        priority: "medium",
      })
    }

    // Session time recommendations
    if (childData.averageSessionTime > 20) {
      recommendations.push({
        title: "Break Time",
        description: "Consider shorter, more frequent sessions to maintain focus and engagement.",
        emoji: "⏰",
        priority: "low",
      })
    }

    // Positive reinforcement
    recommendations.push({
      title: "Celebrate Progress",
      description: `${childData.name} is doing great! Celebrate their achievements and encourage continued learning.`,
      emoji: "🎉",
      priority: "low",
    })

    return recommendations
  }

  const recommendations = getRecommendations()

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-2 border-accent/20">
        <h3 className="text-xl font-bold text-accent mb-4 font-[family-name:var(--font-fredoka)]">
          Learning Tips for {childData.name}
        </h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                rec.priority === "high"
                  ? "bg-red-50 border-red-400"
                  : rec.priority === "medium"
                    ? "bg-yellow-50 border-yellow-400"
                    : "bg-green-50 border-green-400"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{rec.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border-2 border-primary/20">
        <h3 className="text-xl font-bold text-primary mb-4 font-[family-name:var(--font-fredoka)]">
          Learning Resources
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-bold mb-2">📚 Math Books</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Age-appropriate math workbooks and story books that make learning fun.
            </p>
            <Button variant="outline" size="sm">
              View Recommendations
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-bold mb-2">🎲 Math Games</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Physical games and activities to practice math skills offline.
            </p>
            <Button variant="outline" size="sm">
              Explore Games
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-bold mb-2">👨‍👩‍👧‍👦 Family Activities</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Fun ways to practice math together during daily activities.
            </p>
            <Button variant="outline" size="sm">
              Get Ideas
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-bold mb-2">📊 Progress Reports</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Download detailed reports to share with teachers or tutors.
            </p>
            <Button variant="outline" size="sm">
              Download Report
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
