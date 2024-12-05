"use client"

import { notFound } from "next/navigation"
import { GameLayout } from "@/components/game-layout"
import { gamesByLetter } from "@/lib/games"
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

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

function getGameComponent(slug: string) {
  switch (slug) {
    case 'asteroids':
      const AsteroidsGame = dynamic(
        () => import('@/components/games/asteroids').then((mod) => {
          if (!mod.default) {
            console.error('No default export found in asteroids.tsx')
            return () => <div>Error loading game</div>
          }
          return mod.default
        }),
        {
          loading: LoadingFallback,
          ssr: false,
        }
      )
      return AsteroidsGame
    case 'arkanoid':
      const ArkanoidGame = dynamic(
        () => import('@/components/games/arkanoid').then((mod) => {
          if (!mod.default) {
            console.error('No default export found in arkanoid.tsx')
            return () => <div>Error loading game</div>
          }
          return mod.default
        }),
        {
          loading: LoadingFallback,
          ssr: false,
        }
      )
      return ArkanoidGame
    case 'joust':
      const JoustGame = dynamic(
        () => import('@/components/games/joust').then((mod) => {
          if (!mod.default) {
            console.error('No default export found in joust.tsx')
            return () => <div>Error loading game</div>
          }
          return mod.default
        }),
        {
          loading: LoadingFallback,
          ssr: false,
        }
      )
      return JoustGame
    default:
      return null
  }
}

export default function GamePage({ params }: GamePageProps) {
  // Find the game by slug
  const game = Object.values(gamesByLetter)
    .flat()
    .find((g) => g.slug === params.slug)

  if (!game) {
    notFound()
  }

  const GameComponent = getGameComponent(params.slug)

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
      <Suspense fallback={<LoadingFallback />}>
        <GameComponent />
      </Suspense>
    </GameLayout>
  )
}
