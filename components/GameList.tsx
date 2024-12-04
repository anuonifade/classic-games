import Link from 'next/link';

export default function GameList() {
  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/classic-games" className="text-blue-600 hover:underline">Classic Games</Link>
        <Link href="/favorites" className="text-blue-600 hover:underline">Favorites</Link>
        <div className="space-x-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Sign In</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Sign Up</button>
        </div>
      </div>

      {/* Search section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Discover Classic Games</h1>
        <p>Explore and play your favorite retro games. Search through our collection or browse by letter.</p>
        
        <div className="flex space-x-2">
          <input 
            type="text" 
            placeholder="Search for a game..."
            className="px-3 py-2 border rounded"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Search
          </button>
        </div>

        {/* Alphabet navigation */}
        <div className="flex flex-wrap gap-2">
          {/* A to Z buttons */}
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <button 
              key={letter}
              className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Game sections */}
      {['A3', 'B3', 'C3', 'D3', 'E3', 'F3'].map((section) => (
        <div key={section} className="space-y-2">
          <h2 className="text-xl font-bold">{section} games</h2>
          <div className="flex flex-wrap gap-4">
            {/* Add your game links here with proper spacing */}
            {/* Example: */}
            <Link href="#" className="text-blue-600 hover:underline">Game Name</Link>
          </div>
        </div>
      ))}
    </div>
  )
} 