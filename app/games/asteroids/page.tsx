'use client'

import dynamic from 'next/dynamic'
import GameLayout from '@/components/game-layout'

const asteroidsGame = {
  name: "Asteroids",
  description: "A space-themed shooter arcade game where you pilot a spaceship and destroy asteroids while avoiding collisions.",
  year: "1979"
}

// Dynamically import the AsteroidsGame component with no SSR
const DynamicAsteroidsGame = dynamic(
  () => import('@/components/games/asteroids'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        Loading game...
      </div>
    )
  }
)

export default function AsteroidsPage() {
  return (
    <GameLayout game={asteroidsGame}>
      <DynamicAsteroidsGame />
    </GameLayout>
  )
}
