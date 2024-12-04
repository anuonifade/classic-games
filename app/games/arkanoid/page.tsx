'use client'

import dynamic from 'next/dynamic'
import GameLayout from '@/components/game-layout'

const arkanoidGame = {
  name: "Arkanoid",
  description: "A classic brick-breaking arcade game where you control a paddle to bounce a ball and break blocks.",
  year: "1986"
}

// Dynamically import the ArkanoidGame component with no SSR
const DynamicArkanoidGame = dynamic(
  () => import('@/components/games/arkanoid'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        Loading game...
      </div>
    )
  }
)

export default function ArkanoidPage() {
  return (
    <GameLayout game={arkanoidGame}>
      <DynamicArkanoidGame />
    </GameLayout>
  )
}
