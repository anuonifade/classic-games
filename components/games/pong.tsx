"use client"

import { useState } from 'react'

export default function PongGame() {
  const [isMuted, setIsMuted] = useState(false)

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // TODO: Implement sound manager toggle
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Game Header */}
      <div className="flex justify-between items-center p-2 z-10">
        {/* Placeholder for score/high score */}
        <div className="flex flex-col">
          <div className="text-sm">Score: 0</div>
          <div className="text-sm">High Score: 0</div>
        </div>
        
        {/* Mute Button */}
        <div 
          className="cursor-pointer p-1"
          onClick={toggleMute}
        >
          {isMuted ? '🔇' : '🔊'}
        </div>
      </div>

      {/* Game Not Added Content */}
      <div className="flex-grow flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Pong Game</h2>
          <p className="text-lg">Game not added yet</p>
        </div>
      </div>
    </div>
  )
}
