import { notFound } from "next/navigation"
import { GameLayout } from "@/components/game-layout"
import { gamesByLetter } from "@/lib/games"

interface GamePageProps {
  params: {
    slug: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  // Find the game by slug
  const game = Object.values(gamesByLetter)
    .flat()
    .find((g) => g.name.toLowerCase().replace(/\s+/g, "-") === params.slug)

  if (!game) {
    notFound()
  }

  return <GameLayout game={game} />
}
