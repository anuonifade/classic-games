import { gamesByLetter } from "@/lib/games"
import LetterGamesClient from "./letter-games-client"
import { notFound } from "next/navigation"

interface GamePageProps {
  params: {
    letter: string
  }
  searchParams: {
    page?: string
  }
}

export default function LetterGamesPage({ params, searchParams }: GamePageProps) {
  const letter = params.letter.toUpperCase()
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const games = gamesByLetter[letter] || []

  if (!gamesByLetter[letter]) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">No games found</h1>
        <p>No games found for letter {letter}</p>
        <a href="/" className="text-primary hover:underline">
          Return to home
        </a>
      </div>
    )
  }

  // Transform the games data to match our client interface
  const transformedGames = games.map((game, index) => ({
    id: `${letter}-${index + 1}`,
    name: game.name,
    description: game.description,
    year: parseInt(game.year),
    image: `/games/${game.name.toLowerCase().replace(/\s+/g, "-")}.png`,
    slug: game.name.toLowerCase().replace(/\s+/g, "-")
  }))

  return <LetterGamesClient games={transformedGames} letter={letter} initialPage={page} />
}
