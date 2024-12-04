"use client"

import { useState } from "react"
import { SearchBar } from "@/components/ui/search-bar"
import { Button } from "@/components/ui/button"
import { AlphabetNav } from "@/components/ui/alphabet-nav"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 20

interface Game {
  id: string
  name: string
  description: string
  year: number
  image: string
  slug: string
}

interface LetterGamesClientProps {
  games: Game[]
  letter: string
  initialPage: number
}

export default function LetterGamesClient({ games, letter, initialPage }: LetterGamesClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(initialPage)
  
  const filteredGames = games.filter(game => 
    searchQuery === "" || 
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE)
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentGames = filteredGames.slice(startIndex, endIndex)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1) // Reset to first page when searching
  }

  return (
    <main className="flex-1">
      <div className="container px-4 py-6 md:py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Classic Games</h1>
          <p className="text-xl text-muted-foreground">
            Explore and play your favorite classic games
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <SearchBar 
            placeholder="Search games..." 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="mt-8">
          <AlphabetNav currentLetter={letter} />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Games Starting with {letter}</h2>
            <Link href="/" className="text-primary hover:underline">
              Return to home
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentGames.map((game) => (
              <div
                key={game.id}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary transition-colors"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                  <p className="text-muted-foreground flex-grow mb-4">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Released: {game.year}
                    </span>
                    <Link
                      href={`/games/${game.slug}`}
                      className="text-primary hover:underline"
                    >
                      Play Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button 
                variant="outline" 
                disabled={page <= 1}
                onClick={() => setPage(prev => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button 
                variant="outline" 
                disabled={page >= totalPages}
                onClick={() => setPage(prev => prev + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
