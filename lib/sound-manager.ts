export class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private backgroundMusic: HTMLAudioElement | null = null
  private soundtrack: HTMLAudioElement | null = null
  private isMuted: boolean = false

  constructor() {
    this.loadSounds()
  }

  private loadSounds() {
    // Load sound effects with adjusted volumes
    this.sounds = {
      // Asteroids sounds
      shoot: this.createAudio('/sounds/laser-shoot.mp3', 4.0), // Significantly boosted laser sound
      explosion: this.createAudio('/sounds/explosion.mp3', 2.0), // Boosted volume
      thrust: this.createAudio('/sounds/thrust.mp3', 0.8),
      collision: this.createAudio('/sounds/collision.mp3', 2.0), // Boosted volume
      
      // Arkanoid sounds
      'arkanoid-collision': this.createAudio('/sounds/collision.mp3', 2.0), // Boosted volume
      'arkanoid-explosion': this.createAudio('/sounds/explosion.mp3', 2.0)  // Boosted volume
    }

    // Load and configure background music with balanced volume
    this.backgroundMusic = this.createAudio('/sounds/happy-adventure.mp3', 0.6) // Slightly reduced
    if (this.backgroundMusic) {
      this.backgroundMusic.loop = true
    }

    // Load and configure soundtrack
    this.soundtrack = this.createAudio('/sounds/happy-adventure.mp3', 0.6) // Slightly reduced
    if (this.soundtrack) {
      this.soundtrack.loop = true
    }
  }

  private createAudio(src: string, volume: number): HTMLAudioElement {
    const audio = new Audio(src)
    audio.volume = Math.min(volume, 1) // Cap at maximum volume of 1
    audio.preload = 'auto'
    return audio
  }

  playSound(name: 'shoot' | 'explosion' | 'thrust' | 'collision' | 'arkanoid-collision' | 'arkanoid-explosion') {
    if (this.isMuted || !this.sounds[name]) {
      console.log(`Sound ${name} not played - muted: ${this.isMuted}, sound exists: ${!!this.sounds[name]}`);
      return;
    }

    try {
      // Always create a new audio element to ensure sound plays
      const sound = new Audio(this.sounds[name].src);
      
      // Set maximum volume for specific sounds
      if (name === 'shoot') {
        sound.volume = 1.0; // Maximum volume for laser
      } else if (name === 'explosion' || name.includes('collision')) {
        sound.volume = 1.0; // Maximum volume for impact sounds
      } else {
        sound.volume = this.sounds[name].volume;
      }
      
      // Force play the sound
      sound.play().catch(error => {
        console.error(`Error playing ${name} sound:`, error);
      });
    } catch (error) {
      console.error(`Error in playSound for ${name}:`, error);
    }
  }

  startBackgroundMusic() {
    if (this.isMuted) return

    try {
      // Stop any existing music first
      this.stopAllMusic()
      
      if (this.backgroundMusic) {
        // Force load the audio
        this.backgroundMusic.load()
        // Set volume to 0 initially for fade in
        this.backgroundMusic.volume = 0
        // Play the audio
        const playPromise = this.backgroundMusic.play()
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Successfully started playing, now fade in
            this.fadeIn(this.backgroundMusic!)
          }).catch(error => {
            console.error("Error playing background music:", error)
          })
        }
      }
    } catch (error) {
      console.error("Error in startBackgroundMusic:", error)
    }
  }

  startSoundtrack() {
    if (this.isMuted) return

    // Ensure we're in browser environment
    if (typeof window === 'undefined') return

    // Fade out background music if it's playing
    if (this.backgroundMusic && !this.backgroundMusic.paused) {
      this.fadeOut(this.backgroundMusic, () => {
        this.backgroundMusic!.pause()
        this.backgroundMusic!.currentTime = 0
      })
    }

    // Start soundtrack if it exists
    if (this.soundtrack) {
      this.fadeIn(this.soundtrack)
    }
  }

  private fadeIn(audio: HTMLAudioElement, duration: number = 1000) {
    audio.volume = 0
    audio.play().catch(err => console.error('Error playing audio:', err))
    
    const startVolume = audio === this.backgroundMusic ? 0.6 : 0.6
    const steps = 20
    const volumeStep = startVolume / steps
    const stepTime = duration / steps

    let currentStep = 0
    const fadeInterval = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        audio.volume = volumeStep * currentStep
      } else {
        clearInterval(fadeInterval)
      }
    }, stepTime)
  }

  private fadeOut(audio: HTMLAudioElement, onComplete?: () => void, duration: number = 1000) {
    const startVolume = audio.volume
    const steps = 20
    const volumeStep = startVolume / steps
    const stepTime = duration / steps

    let currentStep = 0
    const fadeInterval = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        audio.volume = startVolume - (volumeStep * currentStep)
      } else {
        clearInterval(fadeInterval)
        if (onComplete) onComplete()
      }
    }, stepTime)
  }

  stopAllMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause()
      this.backgroundMusic.currentTime = 0
    }
    if (this.soundtrack) {
      this.soundtrack.pause()
      this.soundtrack.currentTime = 0
    }
  }

  stopAllSounds() {
    // Stop all sound effects
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
      // Remove event listeners
      sound.onended = null;
      sound.onplay = null;
      sound.onpause = null;
      sound.onloadeddata = null;
      // Force unload
      sound.src = '';
      sound.load();
    });

    // Stop background music and soundtrack
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
      this.backgroundMusic.onended = null;
      this.backgroundMusic.onplay = null;
      this.backgroundMusic.onpause = null;
      this.backgroundMusic.onloadeddata = null;
      this.backgroundMusic.src = '';
      this.backgroundMusic.load();
    }
    if (this.soundtrack) {
      this.soundtrack.pause();
      this.soundtrack.currentTime = 0;
      this.soundtrack.onended = null;
      this.soundtrack.onplay = null;
      this.soundtrack.onpause = null;
      this.soundtrack.onloadeddata = null;
      this.soundtrack.src = '';
      this.soundtrack.load();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    
    // Update background music
    if (this.backgroundMusic) {
      if (this.isMuted) {
        this.fadeOut(this.backgroundMusic, () => {
          this.backgroundMusic!.pause()
        })
      } else {
        this.startBackgroundMusic()
      }
    }
    
    // Update soundtrack
    if (this.soundtrack) {
      if (this.isMuted) {
        this.fadeOut(this.soundtrack, () => {
          this.soundtrack!.pause()
        })
      }
    }
    
    // Update all sound effects
    Object.values(this.sounds).forEach(sound => {
      sound.muted = this.isMuted
    })

    return this.isMuted
  }

  setMasterVolume(volume: number) {
    // Update background music
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = volume * 0.6
    }
    
    // Update soundtrack
    if (this.soundtrack) {
      this.soundtrack.volume = volume * 0.6
    }
    
    // Update sound effects with their respective base volumes
    const baseVolumes = {
      shoot: 2.0,
      explosion: 2.0,
      thrust: 0.8,
      collision: 2.0,
      'arkanoid-collision': 2.0,
      'arkanoid-explosion': 2.0
    }
    
    Object.entries(this.sounds).forEach(([name, sound]) => {
      sound.volume = volume * (baseVolumes[name as keyof typeof baseVolumes] || 0.5)
    })
  }
}
