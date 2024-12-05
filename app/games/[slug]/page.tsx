"use client"

import { notFound } from "next/navigation"
import { GameLayout } from "@/components/game-layout"
import { gamesByLetter } from "@/lib/games"
import dynamic from 'next/dynamic'

interface GamePageProps {
  params: {
    slug: string
  }
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold mb-2">Loading Game...</h2>
      <p className="text-muted-foreground">Please wait while the game initializes</p>
    </div>
  </div>
)

const GameComponents = {
  'asteroids': dynamic(() => import('@/components/games/asteroids'), {
    loading: LoadingFallback,
    ssr: false
  }),
  'arkanoid': dynamic(() => import('@/components/games/arkanoid'), {
    loading: LoadingFallback,
    ssr: false
  }),
  'joust': dynamic(() => import('@/components/games/joust'), {
    loading: LoadingFallback,
    ssr: false
  })
}

export default function GamePage({ params }: GamePageProps) {
  // Find the game by slug
  const game = Object.values(gamesByLetter)
    .flat()
    .find((g) => g.slug === params.slug)

  if (!game) {
    notFound()
  }

  const GameComponent = GameComponents[params.slug as keyof typeof GameComponents]

  if (!GameComponent) {
    return (
      <GameLayout game={game}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4">
            <h2 className="text-xl font-semibold mb-2">Game Not Available</h2>
            <p className="text-muted-foreground">This game is still under development</p>
          </div>
        </div>
      </GameLayout>
    )
  }

  return (
    <GameLayout game={game}>
      <GameComponent />
    </GameLayout>
  )
}
