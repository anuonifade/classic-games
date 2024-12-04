'use client';

import { useState } from "react"
import { SearchBar } from "@/components/ui/search-bar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { gamesByLetter } from "@/lib/games"
import { ChevronLeft, ChevronRight } from "lucide-react"

const LETTERS_PER_PAGE = 6

export default function Home({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const page = parseInt(searchParams.page || "1")
  const alphabet = Object.keys(gamesByLetter).sort()
  const totalPages = Math.ceil(alphabet.length / LETTERS_PER_PAGE)
  const startIndex = (page - 1) * LETTERS_PER_PAGE
  const endIndex = startIndex + LETTERS_PER_PAGE
  const currentLetters = alphabet.slice(startIndex, endIndex)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <main className="flex-1">
      <div className="container px-4 py-6 md:py-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-4">
          <h1 className="text-4xl font-bold">Discover Classic Games</h1>
          <p className="text-xl text-muted-foreground">
            Explore and play your favorite retro games from the golden age of arcades. 
            Search through our collection or browse by letter.
          </p>
        </div>

        {/* Search */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>

        {/* Alphabet Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {alphabet.map((letter) => (
            <Link
              key={letter}
              href={`/games/letter/${letter.toLowerCase()}`}
              className="w-10 h-10"
            >
              <Button
                variant="outline"
                className="w-full h-full"
              >
                {letter}
              </Button>
            </Link>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentLetters.map((letter) => (
            <div key={letter} className="rounded-lg border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold tracking-tight">{letter}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {gamesByLetter[letter].length} games
                  </span>
                  <Link 
                    href={`/games/letter/${letter.toLowerCase()}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {gamesByLetter[letter].slice(0, 3).map((game) => (
                  <div
                    key={game.name}
                    className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex-grow space-y-2">
                        <Link
                          href={`/games/${game.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block"
                        >
                          <h3 className="font-semibold tracking-tight text-lg hover:text-primary transition-colors">
                            {game.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {game.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-4 mt-2 border-t">
                        <span className="text-sm text-muted-foreground">
                          Year: {game.year}
                        </span>
                        <Link
                          href={`/games/${game.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm text-primary hover:underline"
                        >
                          Play Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              disabled={page === 1}
              asChild
            >
              <Link href={`/?page=${page - 1}`}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              asChild
            >
              <Link href={`/?page=${page + 1}`}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}