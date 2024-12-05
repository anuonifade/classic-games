"use client"

import { GameLayout } from "@/components/game-layout"
import { gamesByLetter } from "@/lib/games"
import dynamic from 'next/dynamic'

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold mb-2">Loading Game...</h2>
      <p className="text-muted-foreground">Please wait while the game initializes</p>
    </div>
  </div>
)

const AsteroidsGame = dynamic(() => import('@/components/games/asteroids'), {
  loading: LoadingFallback,
  ssr: false
})

export default function AsteroidsPage() {
  const game = Object.values(gamesByLetter)
    .flat()
    .find((g) => g.slug === 'asteroids')

  if (!game) {
    return <div>Game not found</div>
  }

  return (
    <GameLayout game={game}>
      <AsteroidsGame />
    </GameLayout>
  )
}
