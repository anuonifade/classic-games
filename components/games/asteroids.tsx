"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { SoundManager } from '@/lib/sound-manager'
import { usePathname } from 'next/navigation'

class GameSprite {
  image: HTMLImageElement
  loaded: boolean = false

  constructor(src: string) {
    this.image = new Image()
    this.image.src = src
    this.image.onload = () => {
      this.loaded = true
    }
  }
}

class Ship {
  x: number
  y: number
  angle: number
  radius: number
  speed: number
  dx: number
  dy: number
  rotationSpeed: number
  isThrusting: boolean
  lives: number
  sprite: GameSprite
  thrustSprite: GameSprite
  soundManager: SoundManager

  constructor(x: number, y: number, soundManager: SoundManager) {
    this.x = x
    this.y = y
    this.angle = -Math.PI / 2
    this.radius = 25
    this.speed = 0
    this.dx = 0
    this.dy = 0
    this.rotationSpeed = 0.1
    this.isThrusting = false
    this.lives = 3
    this.sprite = new GameSprite('/images/games/asteroids/rocket.svg')
    this.thrustSprite = new GameSprite('/images/games/asteroids/fire.svg')
    this.soundManager = soundManager
  }

  rotate(direction: number) {
    this.angle += this.rotationSpeed * direction
  }

  thrust() {
    this.isThrusting = true
    const thrustPower = 0.5
    this.dx += Math.cos(this.angle) * thrustPower
    this.dy += Math.sin(this.angle) * thrustPower
    this.soundManager.playSound('thrust')
  }

  stopThrust() {
    this.isThrusting = false
  }

  update(width: number, height: number) {
    // Apply friction
    this.dx *= 0.99
    this.dy *= 0.99

    // Update position
    this.x += this.dx
    this.y += this.dy

    // Wrap around screen
    if (this.x < 0) this.x = width
    if (this.x > width) this.x = 0
    if (this.y < 0) this.y = height
    if (this.y > height) this.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle + Math.PI / 2)
    
    // Draw ship
    if (this.sprite.loaded) {
      ctx.drawImage(
        this.sprite.image,
        -this.radius,
        -this.radius,
        this.radius * 2,
        this.radius * 2
      )
    } else {
      // Draw rocket body
      ctx.fillStyle = '#e2e8f0'  // Light gray for the body
      ctx.beginPath()
      ctx.moveTo(0, -this.radius)
      ctx.lineTo(-this.radius / 2, this.radius / 2)
      ctx.lineTo(0, this.radius / 3)
      ctx.lineTo(this.radius / 2, this.radius / 2)
      ctx.closePath()
      ctx.fill()

      // Draw rocket wings
      ctx.fillStyle = '#ef4444'  // Red for the wings
      ctx.beginPath()
      ctx.moveTo(-this.radius / 2, this.radius / 2)
      ctx.lineTo(-this.radius, this.radius)
      ctx.lineTo(0, this.radius / 3)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(this.radius / 2, this.radius / 2)
      ctx.lineTo(this.radius, this.radius)
      ctx.lineTo(0, this.radius / 3)
      ctx.closePath()
      ctx.fill()

      // Draw rocket window
      ctx.fillStyle = '#60a5fa'  // Blue for the window
      ctx.beginPath()
      ctx.arc(0, 0, this.radius / 4, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Draw thrust
    if (this.isThrusting && this.thrustSprite.loaded) {
      ctx.drawImage(
        this.thrustSprite.image,
        -this.radius / 2,
        this.radius,
        this.radius,
        this.radius
      )
    } else if (this.isThrusting) {
      // Draw flame effect
      const flameColors = ['#fef08a', '#fde047', '#facc15', '#fb923c']  // Yellow to orange gradient
      const flameSegments = 4
      const segmentHeight = this.radius / 2

      for (let i = 0; i < flameSegments; i++) {
        ctx.fillStyle = flameColors[i]
        ctx.beginPath()
        ctx.moveTo(-this.radius / 3, this.radius + i * segmentHeight)
        ctx.lineTo(0, this.radius + (i + 1) * segmentHeight)
        ctx.lineTo(this.radius / 3, this.radius + i * segmentHeight)
        ctx.lineTo(0, this.radius + i * segmentHeight)
        ctx.closePath()
        ctx.fill()
      }
    }
    
    ctx.restore()
  }

  shoot() {
    if (this.soundManager) {
      // Ensure the sound plays every time a bullet is fired
      this.soundManager.playSound('shoot')
    }
    return {
      x: this.x + Math.cos(this.angle) * this.radius,
      y: this.y + Math.sin(this.angle) * this.radius,
      dx: Math.cos(this.angle) * 10,
      dy: Math.sin(this.angle) * 10,
      lifespan: 60
    }
  }
}

class Asteroid {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  rotation: number
  rotationSpeed: number
  points: number
  sprite: GameSprite

  constructor(x: number, y: number, radius: number, speedMultiplier: number = 1) {
    this.x = x
    this.y = y
    this.radius = radius * 1.25
    const speed = 1 * speedMultiplier
    const angle = Math.random() * Math.PI * 2
    this.dx = Math.cos(angle) * speed
    this.dy = Math.sin(angle) * speed
    this.rotation = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.02
    this.sprite = new GameSprite('/images/games/asteroids/asteroid1.svg')
    
    // Points based on size
    if (radius === 30) this.points = 20      // Large asteroid
    else if (radius === 20) this.points = 50  // Medium asteroid
    else this.points = 100                    // Small asteroid
  }

  update(width: number, height: number) {
    this.x += this.dx
    this.y += this.dy
    this.rotation += this.rotationSpeed

    if (this.x < 0) this.x = width
    if (this.x > width) this.x = 0
    if (this.y < 0) this.y = height
    if (this.y > height) this.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    
    if (this.sprite.loaded) {
      ctx.drawImage(
        this.sprite.image,
        -this.radius,
        -this.radius,
        this.radius * 2,
        this.radius * 2
      )
    } else {
      // Draw a more rock-like shape with irregular edges
      ctx.fillStyle = '#6b7280'  // Base gray color
      ctx.beginPath()
      
      // Create irregular polygon with 8-12 points
      const points = 8 + Math.floor(Math.random() * 5)
      const angleStep = (Math.PI * 2) / points
      
      for (let i = 0; i < points; i++) {
        const angle = i * angleStep
        const radiusVariation = this.radius * (0.8 + Math.random() * 0.4)  // Vary between 80-120% of radius
        const x = Math.cos(angle) * radiusVariation
        const y = Math.sin(angle) * radiusVariation
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.closePath()
      ctx.fill()

      // Add some surface details (craters)
      ctx.fillStyle = '#4b5563'  // Darker gray for craters
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * this.radius * 0.6
        const craterRadius = this.radius * (0.1 + Math.random() * 0.2)
        
        ctx.beginPath()
        ctx.arc(
          Math.cos(angle) * distance,
          Math.sin(angle) * distance,
          craterRadius,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
    }
    
    ctx.restore()
  }

  checkCollision(x: number, y: number): boolean {
    const distance = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2)
    return distance < this.radius
  }
}

interface Bullet {
  x: number
  y: number
  dx: number
  dy: number
  lifespan: number
}

function AsteroidsGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const shipRef = useRef<Ship | null>(null)
  const asteroidsRef = useRef<Asteroid[]>([])
  const bulletsRef = useRef<Bullet[]>([])
  const keysRef = useRef<{ [key: string]: boolean }>({})
  const soundManagerRef = useRef<SoundManager | null>(null)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start')
  const [highScore, setHighScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const pathname = usePathname()

  const handleShipCollision = () => {
    if (!shipRef.current || !soundManagerRef.current) return
    
    soundManagerRef.current.playSound('collision')
    shipRef.current.lives--
    
    if (shipRef.current.lives <= 0) {
      setGameState('gameover')
      soundManagerRef.current.stopAllSounds()  // Stop all music on game over
      if (score > highScore) {
        setHighScore(score)
      }
    } else {
      // Reset ship position but maintain lives
      shipRef.current.x = canvasRef.current?.width ? canvasRef.current.width / 2 : 0
      shipRef.current.y = canvasRef.current?.height ? canvasRef.current.height / 2 : 0
      shipRef.current.dx = 0
      shipRef.current.dy = 0
      shipRef.current.angle = -Math.PI / 2
    }
  }

  const createAsteroids = (level: number, count: number) => {
    const sizes = [37.5, 25, 12.5]
    const speeds = [1, 1.5, 2]
    const speedMultiplier = speeds[Math.min(Math.floor(level / 3), speeds.length - 1)]
    
    return Array(count).fill(null).map(() => {
      const x = Math.random() * (canvasRef.current?.width || 800)
      const y = Math.random() * (canvasRef.current?.height || 600)
      const sizeIndex = Math.floor(Math.random() * sizes.length)
      return new Asteroid(x, y, sizes[sizeIndex], speedMultiplier)
    })
  }

  const startGame = () => {
    if (!canvasRef.current || !soundManagerRef.current) return
    
    setGameState('playing')
    setScore(0)
    setLevel(1)
    
    // Start background music when game starts
    soundManagerRef.current.startBackgroundMusic()
    
    // Create new ship
    shipRef.current = new Ship(
      canvasRef.current.width / 2,
      canvasRef.current.height / 2,
      soundManagerRef.current
    )
    
    // Create initial asteroids
    asteroidsRef.current = createAsteroids(1, 4)
  }

  const startNextLevel = () => {
    if (!canvasRef.current) return
    
    const nextLevel = level + 1
    setLevel(nextLevel)
    
    // Increase number of asteroids with level
    const baseAsteroids = 4
    const additionalAsteroids = Math.floor(nextLevel / 2)
    const totalAsteroids = Math.min(baseAsteroids + additionalAsteroids, 12)
    
    asteroidsRef.current = createAsteroids(nextLevel, totalAsteroids)
    
    // Reset ship position but keep the score
    if (shipRef.current) {
      shipRef.current.x = canvasRef.current.width / 2
      shipRef.current.y = canvasRef.current.height / 2
      shipRef.current.dx = 0
      shipRef.current.dy = 0
    }
  }

  const shoot = () => {
    if (!shipRef.current || !soundManagerRef.current) return
    
    const bullet = shipRef.current.shoot()
    bulletsRef.current.push(bullet)
  }

  const handleAsteroidDestruction = (asteroid: Asteroid) => {
    if (!soundManagerRef.current) return
    
    soundManagerRef.current.playSound('explosion')
    setScore(prev => prev + asteroid.points)
    
    if (asteroid.radius > 10) {
      const newSize = asteroid.radius === 37.5 ? 25 : 12.5
      const newAsteroids = Array(2).fill(null).map(() => 
        new Asteroid(asteroid.x, asteroid.y, newSize)
      )
      asteroidsRef.current.push(...newAsteroids)
    }
  }

  const toggleMute = () => {
    if (!soundManagerRef.current) return
    const newMutedState = soundManagerRef.current.toggleMute()
    setIsMuted(newMutedState)
    
    // Stop all music when muted, otherwise restart appropriate music based on game state
    if (newMutedState) {
      soundManagerRef.current.stopAllSounds()
    } else if (gameState === 'playing') {
      soundManagerRef.current.startBackgroundMusic()
    }
  }

  // Initialize sound manager
  useEffect(() => {
    soundManagerRef.current = new SoundManager()

    return () => {
      soundManagerRef.current?.stopAllSounds()
    }
  }, [])

  // Watch for pathname changes to stop sounds
  useEffect(() => {
    return () => {
      soundManagerRef.current?.stopAllSounds()
    }
  }, [pathname])

  // Handle game state changes
  useEffect(() => {
    if (!soundManagerRef.current) return

    if (gameState === 'playing') {
      soundManagerRef.current.startBackgroundMusic()
    } else {
      soundManagerRef.current.stopAllSounds()
    }
  }, [gameState])

  useEffect(() => {
    if (isMuted) {
      soundManagerRef.current?.stopAllSounds();
    }
  }, [isMuted]);

  useEffect(() => {
    return () => {
      // Cleanup sounds when component unmounts
      soundManagerRef.current?.stopAllSounds();
    };
  }, []);

  const renderHUD = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!shipRef.current) return

    // Display score
    ctx.fillStyle = '#fff'
    ctx.font = '20px monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${score}`, 20, 30)

    // Display lives
    ctx.fillText(`Lives: ${shipRef.current.lives}`, 20, 60)

    // Display level
    ctx.fillText(`Level: ${level}`, 20, 90)

    // Display high score
    ctx.textAlign = 'right'
    ctx.fillText(`High Score: ${highScore}`, ctx.canvas.width - 20, 30)
  }, [score, highScore, level])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true
      if (e.key === ' ' && gameState === 'playing') {
        e.preventDefault() // Prevent default space behavior
        shoot()
      }
      if (e.key === 'Enter' && gameState !== 'playing') {
        e.preventDefault() // Prevent default enter behavior
        startGame()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false
      if (e.key === 'ArrowUp' && shipRef.current) {
        shipRef.current.stopThrust()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    let animationFrameId: number

    const update = () => {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (gameState === 'start') {
        ctx.fillStyle = 'white'
        ctx.font = '40px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('ASTEROIDS', canvas.width / 2, canvas.height / 2 - 60)
        ctx.font = '20px Arial'
        ctx.fillText('Press ENTER to start', canvas.width / 2, canvas.height / 2)
        ctx.fillText('High Score: ' + highScore, canvas.width / 2, canvas.height / 2 + 40)
      } else if (gameState === 'playing') {
        const ship = shipRef.current
        if (!ship) return

        // Handle input
        if (keysRef.current['ArrowLeft']) {
          ship.rotate(-1)
        }
        if (keysRef.current['ArrowRight']) {
          ship.rotate(1)
        }
        if (keysRef.current['ArrowUp']) {
          ship.thrust()
        }

        // Update and draw ship
        ship.update(canvas.width, canvas.height)
        ship.draw(ctx)

        // Update and draw bullets
        bulletsRef.current = bulletsRef.current.filter(bullet => {
          bullet.x += bullet.dx
          bullet.y += bullet.dy
          bullet.lifespan--

          // Wrap bullets around screen
          if (bullet.x < 0) bullet.x = canvas.width
          if (bullet.x > canvas.width) bullet.x = 0
          if (bullet.y < 0) bullet.y = canvas.height
          if (bullet.y > canvas.height) bullet.y = 0

          // Draw bullet
          ctx.beginPath()
          ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = 'white'
          ctx.fill()

          return bullet.lifespan > 0
        })

        // Update and draw asteroids
        asteroidsRef.current = asteroidsRef.current.filter(asteroid => {
          asteroid.update(canvas.width, canvas.height)
          asteroid.draw(ctx)

          // Check bullet collisions
          const hitByBullet = bulletsRef.current.some(bullet => 
            asteroid.checkCollision(bullet.x, bullet.y)
          )

          if (hitByBullet) {
            handleAsteroidDestruction(asteroid)
            return false
          }

          // Check ship collision
          if (ship && asteroid.checkCollision(ship.x, ship.y)) {
            handleShipCollision()
          }

          return true
        })

        // Draw HUD
        renderHUD(ctx)

        // Check if level is complete
        if (asteroidsRef.current.length === 0) {
          startNextLevel()
        }
      } else if (gameState === 'gameover') {
        ctx.fillStyle = 'white'
        ctx.font = '40px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 60)
        ctx.font = '20px Arial'
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2)
        ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 40)
        ctx.fillText('Press ENTER to play again', canvas.width / 2, canvas.height / 2 + 80)
      }

      animationFrameId = requestAnimationFrame(update)
    }

    update()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [gameState, renderHUD])

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Game Header */}
      <div className="flex justify-between items-center p-2 z-10">
        {/* Score and High Score */}
        <div className="flex flex-col">
          <div className="text-sm">Score: {score}</div>
          <div className="text-sm">High Score: {highScore}</div>
        </div>
        
        {/* Mute Button */}
        <div 
          className="cursor-pointer p-1"
          onClick={() => {
            setIsMuted(!isMuted)
            soundManagerRef.current?.toggleMute()
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </div>
      </div>

      {/* Rest of the game remains the same */}
      <div ref={containerRef} className="flex-grow relative">
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: 'black' }}
        />
        {/* ... other game elements ... */}
      </div>
    </div>
  )
}

module.exports = AsteroidsGame;
