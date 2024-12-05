"use client"

import Link from "next/link"
import { SearchBar } from "@/components/ui/search-bar"
import { Button } from "@/components/ui/button"
import { gamesByLetter, type Game } from "@/lib/games"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface GameLayoutProps {
  game: Game
  children?: React.ReactNode
}

function getSimilarGames(currentGame: Game): Game[] {
  const firstLetter = currentGame.name.charAt(0).toUpperCase()
  const sameLetterGames = gamesByLetter[firstLetter]?.filter(
    (g) => g.name !== currentGame.name
  ) || []
  return sameLetterGames.slice(0, 5)
}

const GameLayout = ({ children, game }: GameLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const similarGames = getSimilarGames(game)
  const pathname = usePathname()
  const [soundManager, setSoundManager] = useState<any>(null)

  // Initialize sound manager
  useEffect(() => {
    // Only initialize if window is defined and soundManager doesn't exist
    if (typeof window !== 'undefined' && !soundManager) {
      const SoundManager = require('@/lib/sound-manager').SoundManager
      const sm = new SoundManager()
      setSoundManager(sm)
      
      // Try to start background music with user interaction
      const handleUserInteraction = () => {
        if (sm) {
          sm.startBackgroundMusic()
          // Remove the event listeners after first interaction
          window.removeEventListener('click', handleUserInteraction)
          window.removeEventListener('keydown', handleUserInteraction)
        }
      }

      window.addEventListener('click', handleUserInteraction)
      window.addEventListener('keydown', handleUserInteraction)

      return () => {
        window.removeEventListener('click', handleUserInteraction)
        window.removeEventListener('keydown', handleUserInteraction)
      }
    }
  }, [])

  // Cleanup sounds when layout changes
  useEffect(() => {
    return () => {
      if (soundManager) {
        soundManager.stopAllSounds()
      }
    }
  }, [pathname, soundManager])

  return (
    <div className="fixed inset-0 flex bg-background my-20">
      {/* Left Sidebar */}
      <div className="w-[25%] h-full border-r flex flex-col">
        <div className="space-y-3 p-2">
          <h2 className="text-lg font-semibold">Search Games</h2>
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search games..."
          />
          
          <div className="space-y-2">
            <h3 className="text-md font-medium">Similar Games</h3>
            <div className="flex flex-col">
              {similarGames.map((similarGame) => (
                <Link
                  key={similarGame.name}
                  href={`/games/${similarGame.slug}`}
                  className="text-sm hover:text-primary transition-colors py-1 hover:bg-accent px-2"
                >
                  {similarGame.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto p-2">
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Game List
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[75%] h-full overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="p-4 bg-background border-b">
            <h1 className="text-3xl font-bold">{game.name}</h1>
            <p className="text-muted-foreground">Released: {game.year}</p>
            <p className="mt-2">{game.description}</p>
          </div>
          <div className="flex-1 overflow-hidden">
            {children || (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-4">
                  <h2 className="text-xl font-semibold mb-2">Game Under Development</h2>
                  <p className="text-muted-foreground">
                    This classic game is currently being implemented. Check back soon!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { GameLayout }
