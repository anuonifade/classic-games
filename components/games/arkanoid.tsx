"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { SoundManager } from '@/lib/sound-manager'
import { usePathname } from 'next/navigation'

class Paddle {
  x: number
  y: number
  width: number
  height: number
  speed: number
  color: string

  constructor(canvasWidth: number, canvasHeight: number) {
    this.width = 100
    this.height = 15
    this.x = (canvasWidth - this.width) / 2
    this.y = canvasHeight - this.height - 10
    this.speed = 8
    this.color = '#00ff00'
  }

  move(direction: number, canvasWidth: number) {
    const newX = this.x + this.speed * direction
    if (newX >= 0 && newX + this.width <= canvasWidth) {
      this.x = newX
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Ball {
  x: number
  y: number
  radius: number
  dx: number
  dy: number
  speed: number
  color: string

  constructor(canvasWidth: number, canvasHeight: number) {
    this.radius = 8
    this.reset(canvasWidth, canvasHeight)
    this.color = '#ffffff'
  }

  reset(canvasWidth: number, canvasHeight: number) {
    this.x = canvasWidth / 2
    this.y = canvasHeight - 30
    this.speed = 5
    const angle = Math.random() * Math.PI / 2 - Math.PI / 4 // Random angle between -45 and 45 degrees
    this.dx = this.speed * Math.cos(angle)
    this.dy = -this.speed * Math.sin(angle) // Start moving upward
  }

  update(paddle: Paddle, bricks: Brick[], canvasWidth: number, canvasHeight: number, soundManager: SoundManager | null): boolean {
    this.x += this.dx
    this.y += this.dy

    // Wall collisions
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvasWidth) {
      this.dx = -this.dx
      soundManager?.playSound('collision')
    }
    if (this.y - this.radius <= 0) {
      this.dy = -this.dy
      soundManager?.playSound('collision')
    }

    // Paddle collision
    if (this.y + this.radius >= paddle.y &&
        this.y - this.radius <= paddle.y + paddle.height &&
        this.x >= paddle.x &&
        this.x <= paddle.x + paddle.width) {
      // Calculate relative position of ball on paddle (0 to 1)
      const relativeIntersectX = (this.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2)
      // Calculate bounce angle (-60 to 60 degrees)
      const bounceAngle = relativeIntersectX * Math.PI / 3

      this.speed = Math.min(this.speed + 0.1, 8) // Gradually increase speed, max at 8
      this.dx = this.speed * Math.sin(bounceAngle)
      this.dy = -this.speed * Math.cos(bounceAngle)
      
      soundManager?.playSound('collision')
    }

    // Check for game over (ball below paddle)
    if (this.y + this.radius > canvasHeight) {
      return true
    }

    // Brick collisions
    for (let i = bricks.length - 1; i >= 0; i--) {
      const brick = bricks[i]
      if (this.checkBrickCollision(brick)) {
        bricks.splice(i, 1)
        soundManager?.playSound('explosion')
        break
      }
    }

    return false
  }

  checkBrickCollision(brick: Brick): boolean {
    // Calculate the closest point to the circle within the rectangle
    const closestX = Math.max(brick.x, Math.min(this.x, brick.x + brick.width))
    const closestY = Math.max(brick.y, Math.min(this.y, brick.y + brick.height))

    // Calculate the distance between the circle's center and this closest point
    const distanceX = this.x - closestX
    const distanceY = this.y - closestY
    const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY)

    // If the distance is less than the circle's radius, an intersection occurs
    if (distanceSquared < (this.radius * this.radius)) {
      // Determine which side was hit
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        this.dx = -this.dx
      } else {
        this.dy = -this.dy
      }
      return true
    }
    return false
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

class Brick {
  x: number
  y: number
  width: number
  height: number
  color: string
  points: number

  constructor(x: number, y: number, width: number, height: number, color: string, points: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.points = points
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    
    // Add a 3D effect
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.lineWidth = 2
    ctx.strokeRect(this.x, this.y, this.width, this.height)
  }
}

function ArkanoidGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const paddleRef = useRef<Paddle | null>(null)
  const ballRef = useRef<Ball | null>(null)
  const bricksRef = useRef<Brick[]>([])
  const keysRef = useRef<{ [key: string]: boolean }>({})
  const soundManagerRef = useRef<SoundManager | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start')
  const [highScore, setHighScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const pathname = usePathname()

  const createBricks = (level: number) => {
    const bricks: Brick[] = []
    const brickWidth = 80
    const brickHeight = 20
    const padding = 10
    const offsetTop = 50
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8f00ff']
    const rows = Math.min(3 + Math.floor(level / 2), 8) // Increase rows with level, max 8
    const cols = Math.floor((canvasRef.current?.width || 800) / (brickWidth + padding))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * (brickWidth + padding) + padding
        const y = i * (brickHeight + padding) + offsetTop
        const points = (rows - i) * 10 // Higher bricks worth more points
        bricks.push(new Brick(x, y, brickWidth, brickHeight, colors[i % colors.length], points))
      }
    }
    return bricks
  }

  const startGame = () => {
    if (!canvasRef.current || !soundManagerRef.current) return
    
    setGameState('playing')
    setScore(0)
    setLives(3)
    setLevel(1)
    
    // Start background music
    soundManagerRef.current.startBackgroundMusic()
    
    // Initialize game objects
    paddleRef.current = new Paddle(canvasRef.current.width, canvasRef.current.height)
    ballRef.current = new Ball(canvasRef.current.width, canvasRef.current.height)
    bricksRef.current = createBricks(1)
  }

  const startNextLevel = () => {
    if (!canvasRef.current || !ballRef.current) return

    setLevel(prev => prev + 1)
    ballRef.current.reset(canvasRef.current.width, canvasRef.current.height)
    bricksRef.current = createBricks(level + 1)
  }

  const toggleMute = () => {
    if (!soundManagerRef.current) return
    const newMutedState = soundManagerRef.current.toggleMute()
    setIsMuted(newMutedState)
    
    if (newMutedState) {
      soundManagerRef.current.stopAllSounds()
    } else if (gameState === 'playing') {
      soundManagerRef.current.startBackgroundMusic()
    }
  }

  // Initialize sound manager
  useEffect(() => {
    if (!soundManagerRef.current) {
      soundManagerRef.current = new SoundManager()
    }
  }, [])

  // Handle cleanup on unmount or route change
  useEffect(() => {
    return () => {
      if (soundManagerRef.current) {
        soundManagerRef.current.stopAllSounds()
      }
    }
  }, [pathname])

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

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      
      // Reinitialize game objects after resize
      if (gameState === 'playing') {
        paddleRef.current = new Paddle(canvas.width, canvas.height)
        if (ballRef.current) {
          ballRef.current.reset(canvas.width, canvas.height)
        }
        bricksRef.current = createBricks(level)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true
      if (e.key === 'Enter' && gameState !== 'playing') {
        e.preventDefault()
        startGame()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    let animationFrameId: number

    const update = () => {
      if (!canvas || !ctx || !paddleRef.current || !ballRef.current) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (gameState === 'start') {
        // Draw title screen
        ctx.fillStyle = 'white'
        ctx.font = '40px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('ARKANOID', canvas.width / 2, canvas.height / 2 - 30)
        ctx.font = '20px Arial'
        ctx.fillText('Press ENTER to Start', canvas.width / 2, canvas.height / 2 + 20)
        ctx.fillText('Use Arrow Keys to Move', canvas.width / 2, canvas.height / 2 + 50)
      } else if (gameState === 'playing') {
        // Move paddle
        if (keysRef.current['ArrowLeft']) {
          paddleRef.current.move(-1, canvas.width)
        }
        if (keysRef.current['ArrowRight']) {
          paddleRef.current.move(1, canvas.width)
        }

        // Update ball
        const gameOver = ballRef.current.update(
          paddleRef.current,
          bricksRef.current,
          canvas.width,
          canvas.height,
          soundManagerRef.current
        )

        if (gameOver) {
          setLives(prev => {
            if (prev <= 1) {
              setGameState('gameover')
              soundManagerRef.current?.stopAllSounds()
              if (score > highScore) {
                setHighScore(score)
              }
              return 0
            }
            ballRef.current?.reset(canvas.width, canvas.height)
            return prev - 1
          })
        }

        // Draw game objects
        paddleRef.current.draw(ctx)
        ballRef.current.draw(ctx)
        bricksRef.current.forEach(brick => brick.draw(ctx))

        // Check for level completion
        if (bricksRef.current.length === 0) {
          startNextLevel()
        }

        // Draw HUD
        ctx.fillStyle = 'white'
        ctx.font = '20px Arial'
        ctx.textAlign = 'left'
        ctx.fillText(`Score: ${score}`, 20, 30)
        ctx.fillText(`Lives: ${lives}`, 20, 60)
        ctx.fillText(`Level: ${level}`, 20, 90)
        ctx.textAlign = 'right'
        ctx.fillText(`High Score: ${highScore}`, canvas.width - 20, 30)
      } else if (gameState === 'gameover') {
        // Draw game over screen
        ctx.fillStyle = 'white'
        ctx.font = '40px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30)
        ctx.font = '20px Arial'
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20)
        ctx.fillText('Press ENTER to Play Again', canvas.width / 2, canvas.height / 2 + 60)
      }
    }

    const gameLoop = () => {
      update()
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [gameState, score, highScore, level, lives])

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center bg-black text-white relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      {gameState !== 'playing' && (
        <button
          onClick={startGame}
          className="absolute top-4 right-16 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition-colors"
        >
          Start Game
        </button>
      )}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition-colors"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}

module.exports = ArkanoidGame;
