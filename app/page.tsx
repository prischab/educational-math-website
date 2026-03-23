"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AnimatedCharacter } from "@/components/animated-character"
import { MusicNote } from "@/components/music-note"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-cyan-50">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
            🎵
          </div>
          <h1 className="text-3xl font-bold text-primary font-[family-name:var(--font-fredoka)]">MathTunes</h1>
        </div>
        <Link href="/parents">
          <Button
            variant="outline"
            className="text-primary border-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Parents Dashboard
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-primary mb-6 font-[family-name:var(--font-fredoka)] text-balance">
            Learn Math with Music!
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Join our musical math adventure where every correct answer creates beautiful melodies. Perfect for kids aged
            5-10!
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <Link href="/game">
              <Button size="lg" className="text-xl px-8 py-6 pulse-glow bg-primary hover:bg-primary/90">
                🎮 Start Playing!
              </Button>
            </Link>
            <Button size="lg" variant="secondary" className="text-xl px-8 py-6" onClick={() => setShowHowItWorks(true)}>
              🎵 How It Works
            </Button>
          </div>
        </div>

        {/* Animated Characters Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <AnimatedCharacter type="owl" className="mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-2 font-[family-name:var(--font-fredoka)]">
              Professor Owl
            </h3>
            <p className="text-muted-foreground">Your wise math guide who loves to teach addition and subtraction!</p>
          </div>

          <div className="text-center">
            <AnimatedCharacter type="cat" className="mb-4" />
            <h3 className="text-2xl font-bold text-secondary mb-2 font-[family-name:var(--font-fredoka)]">
              Melody Cat
            </h3>
            <p className="text-muted-foreground">Creates beautiful music when you solve problems correctly!</p>
          </div>

          <div className="text-center">
            <AnimatedCharacter type="robot" className="mb-4" />
            <h3 className="text-2xl font-bold text-accent mb-2 font-[family-name:var(--font-fredoka)]">Count Bot</h3>
            <p className="text-muted-foreground">Helps you master multiplication with fun challenges!</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-2 border-primary/20">
            <div className="text-4xl mb-4">🎵</div>
            <h4 className="text-lg font-bold text-primary mb-2 font-[family-name:var(--font-fredoka)]">
              Musical Rewards
            </h4>
            <p className="text-sm text-muted-foreground">Every correct answer plays a musical note or melody</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-2 border-secondary/20">
            <div className="text-4xl mb-4">⭐</div>
            <h4 className="text-lg font-bold text-secondary mb-2 font-[family-name:var(--font-fredoka)]">Earn Stars</h4>
            <p className="text-sm text-muted-foreground">Collect stars and badges for your achievements</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-2 border-accent/20">
            <div className="text-4xl mb-4">🎮</div>
            <h4 className="text-lg font-bold text-accent mb-2 font-[family-name:var(--font-fredoka)]">Fun Games</h4>
            <p className="text-sm text-muted-foreground">Interactive math games that make learning enjoyable</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-2 border-primary/20">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-lg font-bold text-primary mb-2 font-[family-name:var(--font-fredoka)]">
              Track Progress
            </h4>
            <p className="text-sm text-muted-foreground">Parents can monitor learning progress and achievements</p>
          </Card>
        </div>

        {/* Floating Music Notes */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <MusicNote className="absolute top-20 left-10 text-secondary" delay={0} />
          <MusicNote className="absolute top-40 right-20 text-primary" delay={1} />
          <MusicNote className="absolute bottom-40 left-20 text-accent" delay={2} />
          <MusicNote className="absolute bottom-20 right-10 text-secondary" delay={3} />
        </div>

        {/* How It Works Modal */}
        {showHowItWorks && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-primary font-[family-name:var(--font-fredoka)]">
                  🎵 How It Works
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowHowItWorks(false)} className="text-2xl">
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2 font-[family-name:var(--font-fredoka)]">
                      Choose Your Adventure
                    </h4>
                    <p className="text-muted-foreground">
                      Pick from addition, subtraction, or multiplication problems based on your skill level.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-secondary mb-2 font-[family-name:var(--font-fredoka)]">
                      Solve Math Problems
                    </h4>
                    <p className="text-muted-foreground">
                      Answer fun math questions with the help of our friendly characters: Professor Owl, Melody Cat, and
                      Count Bot.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white text-xl font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-accent mb-2 font-[family-name:var(--font-fredoka)]">
                      Hear Beautiful Music
                    </h4>
                    <p className="text-muted-foreground">
                      Every correct answer creates magical musical notes and melodies. The better you do, the more
                      beautiful the music becomes!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2 font-[family-name:var(--font-fredoka)]">
                      Collect Rewards
                    </h4>
                    <p className="text-muted-foreground">
                      Earn stars, badges, and achievements as you progress. Parents can track your amazing progress too!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button size="lg" className="text-xl px-8 py-4" onClick={() => setShowHowItWorks(false)}>
                  Got It! Let's Play! 🎮
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
