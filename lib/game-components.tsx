"use client"

import dynamic from 'next/dynamic'

const LoadingComponent = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold mb-2">Loading Game...</h2>
      <p className="text-muted-foreground">Please wait while the game initializes</p>
    </div>
  </div>
)

// Dynamically import game components with loading fallback
export const GameComponents: Record<string, React.ComponentType> = {
  'asteroids': dynamic(() => import('@/components/games/asteroids').then(mod => mod.default), {
    loading: LoadingComponent,
    ssr: false
  }),
  'arkanoid': dynamic(() => import('@/components/games/arkanoid').then(mod => mod.default), {
    loading: LoadingComponent,
    ssr: false
  }),
  'joust': dynamic(() => import('@/components/games/joust').then(mod => mod.default), {
    loading: LoadingComponent,
    ssr: false
  })
}
