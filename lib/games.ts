export interface Game {
  name: string
  description: string
  year: string
  slug: string
}

export const gamesByLetter: {
  [key: string]: Game[]
} = {
  A: [
    { 
      name: "Asteroids", 
      description: "Space shooter where players destroy asteroids and flying saucers", 
      year: "1979",
      slug: "asteroids"
    },
    { 
      name: "Arkanoid", 
      description: "Break blocks with a ball and paddle while collecting power-ups", 
      year: "1986",
      slug: "arkanoid"
    },
    { 
      name: "Adventure", 
      description: "First action-adventure game featuring dragons and hidden keys", 
      year: "1979",
      slug: "adventure"
    },
    { 
      name: "Amidar", 
      description: "Paint the squares while avoiding enemies", 
      year: "1981",
      slug: "amidar"
    },
    { 
      name: "Armor Attack", 
      description: "Combat game where players fight enemy tanks", 
      year: "1980",
      slug: "armor-attack"
    },
    { 
      name: "After Burner", 
      description: "Fast-paced jet fighter combat game", 
      year: "1987",
      slug: "after-burner"
    },
    { 
      name: "Altered Beast", 
      description: "Side-scrolling action game with mythological themes", 
      year: "1988",
      slug: "altered-beast"
    },
    { 
      name: "Aztec Challenge", 
      description: "Platform game with ancient Aztec setting", 
      year: "1982",
      slug: "aztec-challenge"
    }
  ],
  B: [
    { 
      name: "Bomberman", 
      description: "Strategic maze game with explosive action", 
      year: "1983",
      slug: "bomberman"
    },
    { 
      name: "Bubble Bobble", 
      description: "Trap enemies in bubbles as cute dinosaurs", 
      year: "1986",
      slug: "bubble-bobble"
    },
    { 
      name: "Battlezone", 
      description: "First-person tank combat in vector graphics", 
      year: "1980",
      slug: "battlezone"
    },
    { 
      name: "Burger Time", 
      description: "Create burgers while avoiding food enemies", 
      year: "1982",
      slug: "burger-time"
    },
    { 
      name: "Berzerk", 
      description: "Navigate mazes while shooting robots", 
      year: "1980",
      slug: "berzerk"
    },
    { 
      name: "Black Tiger", 
      description: "Fantasy action platformer with RPG elements", 
      year: "1987",
      slug: "black-tiger"
    },
    { 
      name: "Blue Print", 
      description: "Puzzle game about building machines", 
      year: "1982",
      slug: "blue-print"
    },
    { 
      name: "Bank Panic", 
      description: "Wild West shooting gallery game", 
      year: "1984",
      slug: "bank-panic"
    }
  ],
  C: [
    { 
      name: "Centipede", 
      description: "Shoot segmented creature in mushroom field", 
      year: "1981",
      slug: "centipede"
    },
    { 
      name: "Contra", 
      description: "Run-and-gun action with alien invasion theme", 
      year: "1987",
      slug: "contra"
    },
    { 
      name: "Crystal Castles", 
      description: "Collect gems while avoiding enemies in 3D maze", 
      year: "1983",
      slug: "crystal-castles"
    },
    { 
      name: "Crazy Climber", 
      description: "Scale buildings while avoiding obstacles", 
      year: "1980",
      slug: "crazy-climber"
    },
    { 
      name: "Congo Bongo", 
      description: "Isometric adventure with monkey protagonist", 
      year: "1983",
      slug: "congo-bongo"
    },
    { 
      name: "Commando", 
      description: "Run-and-gun action with military theme", 
      year: "1985",
      slug: "commando"
    },
    { 
      name: "Choplifter", 
      description: "Rescue hostages from enemy territory", 
      year: "1982",
      slug: "choplifter"
    },
    { 
      name: "Clu Clu Land", 
      description: "Underwater maze game with fish-like creatures", 
      year: "1984",
      slug: "clu-clu-land"
    }
  ],
  D: [
    { 
      name: "Defender", 
      description: "Side-scrolling shooter protecting humans from aliens", 
      year: "1981",
      slug: "defender"
    },
    { 
      name: "Dig Dug", 
      description: "Underground tunneling game with inflatable enemies", 
      year: "1982",
      slug: "dig-dug"
    },
    { 
      name: "Dragon's Lair", 
      description: "Interactive cartoon adventure with quick-time events", 
      year: "1983",
      slug: "dragons-lair"
    },
    { 
      name: "Donkey Kong", 
      description: "Climb platforms while avoiding barrels", 
      year: "1981",
      slug: "donkey-kong"
    },
    { 
      name: "Double Dragon", 
      description: "Side-scrolling beat 'em up with martial arts", 
      year: "1987",
      slug: "double-dragon"
    },
    { 
      name: "Dragon Spirit", 
      description: "Vertical shooter with dragon protagonist", 
      year: "1987",
      slug: "dragon-spirit"
    },
    { 
      name: "Discs of Tron", 
      description: "Competitive disc-throwing game based on TRON", 
      year: "1983",
      slug: "discs-of-tron"
    },
    { 
      name: "Duck Hunt", 
      description: "Light gun shooting game with ducks and clay pigeons", 
      year: "1984",
      slug: "duck-hunt"
    }
  ],
  E: [
    { 
      name: "Elevator Action", 
      description: "Spy game with elevators and shooting", 
      year: "1983",
      slug: "elevator-action"
    },
    { 
      name: "Excitebike", 
      description: "Motorcycle racing with track creation", 
      year: "1984",
      slug: "excitebike"
    },
    { 
      name: "Exerion", 
      description: "Space shooter with parallax scrolling", 
      year: "1983",
      slug: "exerion"
    },
    { 
      name: "Express Raider", 
      description: "Wild West train robbery action game", 
      year: "1986",
      slug: "express-raider"
    },
    { 
      name: "Eyes", 
      description: "Maze game collecting dots while avoiding enemies", 
      year: "1982",
      slug: "eyes"
    },
    { 
      name: "Eagle", 
      description: "Vertical scrolling shooter with an eagle theme", 
      year: "1980",
      slug: "eagle"
    },
    { 
      name: "Escape from the Planet of the Robot Monsters", 
      description: "Isometric shooter rescuing humans from robots", 
      year: "1989",
      slug: "escape-from-the-planet-of-the-robot-monsters"
    },
    { 
      name: "Eliminator", 
      description: "Space combat game with vector graphics", 
      year: "1981",
      slug: "eliminator"
    }
  ],
  F: [
    { 
      name: "Frogger", 
      description: "Guide frog across busy road and river", 
      year: "1981",
      slug: "frogger"
    },
    { 
      name: "Final Fight", 
      description: "Side-scrolling beat 'em up in Metro City", 
      year: "1989",
      slug: "final-fight"
    },
    { 
      name: "Food Fight", 
      description: "Food-throwing action game", 
      year: "1983",
      slug: "food-fight"
    },
    { 
      name: "Front Line", 
      description: "Military combat action game", 
      year: "1982",
      slug: "front-line"
    },
    { 
      name: "Fantasy Zone", 
      description: "Colorful side-scrolling shooter", 
      year: "1986",
      slug: "fantasy-zone"
    },
    { 
      name: "Flying Shark", 
      description: "Vertical scrolling airplane shooter", 
      year: "1987",
      slug: "flying-shark"
    },
    { 
      name: "Fire Truck", 
      description: "Two-player cooperative driving game", 
      year: "1978",
      slug: "fire-truck"
    },
    { 
      name: "Future Spy", 
      description: "3D rail shooter with spy theme", 
      year: "1984",
      slug: "future-spy"
    }
  ],
  G: [
    { 
      name: "Galaga", 
      description: "Space shooter with diving alien formations", 
      year: "1981",
      slug: "galaga"
    },
    { 
      name: "Gauntlet", 
      description: "Multiplayer dungeon crawler", 
      year: "1985",
      slug: "gauntlet"
    },
    { 
      name: "Ghosts 'n Goblins", 
      description: "Challenging platformer with knight protagonist", 
      year: "1985",
      slug: "ghosts-n-goblins"
    },
    { 
      name: "Gyruss", 
      description: "Tube shooter with classical music", 
      year: "1983",
      slug: "gyruss"
    },
    { 
      name: "Galaxian", 
      description: "Space shooter with attacking formations", 
      year: "1979",
      slug: "galaxian"
    },
    { 
      name: "Golden Axe", 
      description: "Fantasy beat 'em up with magic spells", 
      year: "1989",
      slug: "golden-axe"
    },
    { 
      name: "Gradius", 
      description: "Side-scrolling shooter with power-up system", 
      year: "1985",
      slug: "gradius"
    },
    { 
      name: "Gorf", 
      description: "Multi-mission space shooter", 
      year: "1981",
      slug: "gorf"
    }
  ],
  H: [
    { 
      name: "Hang-On", 
      description: "Motorcycle racing game with cabinet controls", 
      year: "1985",
      slug: "hang-on"
    },
    { 
      name: "Haunted Castle", 
      description: "Gothic platformer in Castlevania series", 
      year: "1988",
      slug: "haunted-castle"
    },
    { 
      name: "Heavy Barrel", 
      description: "Run and gun action with weapon upgrades", 
      year: "1987",
      slug: "heavy-barrel"
    },
    { 
      name: "Hydra", 
      description: "Futuristic boat racing and combat", 
      year: "1990",
      slug: "hydra"
    },
    { 
      name: "Hyper Sports", 
      description: "Olympic-style sports compilation", 
      year: "1984",
      slug: "hyper-sports"
    },
    { 
      name: "Hogan's Alley", 
      description: "Light gun shooting gallery game", 
      year: "1984",
      slug: "hogans-alley"
    },
    { 
      name: "Hard Drivin'", 
      description: "3D driving simulator with stunt track", 
      year: "1989",
      slug: "hard-drivin"
    },
    { 
      name: "Hustle", 
      description: "Snake-like game with competitive play", 
      year: "1977",
      slug: "hustle"
    }
  ],
  I: [
    { 
      name: "Ice Climber", 
      description: "Vertical platforming adventure", 
      year: "1985",
      slug: "ice-climber"
    },
    { 
      name: "Ikari Warriors", 
      description: "Vertical scrolling military shooter", 
      year: "1986",
      slug: "ikari-warriors"
    },
    { 
      name: "Indiana Jones", 
      description: "Adventure platformer based on the movies", 
      year: "1985",
      slug: "indiana-jones"
    },
    { 
      name: "Ironman Ivan Stewart's Super Off Road", 
      description: "Top-down off-road racing game", 
      year: "1989",
      slug: "ironman-ivan-stewarts-super-off-road"
    },
    { 
      name: "I Robot", 
      description: "First 3D polygon-based arcade game", 
      year: "1983",
      slug: "i-robot"
    },
    { 
      name: "Insector X", 
      description: "Side-scrolling shooter with insect theme", 
      year: "1989",
      slug: "insector-x"
    },
    { 
      name: "Iron Horse", 
      description: "Western-themed side-scrolling action", 
      year: "1986",
      slug: "iron-horse"
    },
    { 
      name: "Impossible Mission", 
      description: "Platform puzzle game with speech synthesis", 
      year: "1984",
      slug: "impossible-mission"
    }
  ],
  J: [
    { 
      name: "Joust", 
      description: "Flying knight combat game", 
      year: "1982",
      slug: "joust"
    },
    { 
      name: "Jungle Hunt", 
      description: "Adventure through dangerous jungle", 
      year: "1982",
      slug: "jungle-hunt"
    },
    { 
      name: "Jump Bug", 
      description: "Early platformer with jumping car", 
      year: "1981",
      slug: "jump-bug"
    },
    { 
      name: "Juno First", 
      description: "Space shooter with shield mechanics", 
      year: "1983",
      slug: "juno-first"
    },
    { 
      name: "Journey", 
      description: "Music-themed action game", 
      year: "1983",
      slug: "journey"
    },
    { 
      name: "Jack the Giantkiller", 
      description: "Fairy tale-themed platformer", 
      year: "1982",
      slug: "jack-the-giantkiller"
    },
    { 
      name: "Jail Break", 
      description: "Run and gun prison escape action", 
      year: "1986",
      slug: "jail-break"
    },
    { 
      name: "Jumping Jack", 
      description: "Platform game with precise timing", 
      year: "1984",
      slug: "jumping-jack"
    }
  ],
  K: [
    { 
      name: "Kung-Fu Master", 
      description: "Side-scrolling martial arts action", 
      year: "1984",
      slug: "kung-fu-master"
    },
    { 
      name: "Karate Champ", 
      description: "One-on-one competitive fighting game", 
      year: "1984",
      slug: "karate-champ"
    },
    { 
      name: "Kangaroo", 
      description: "Platformer with boxing kangaroo mother", 
      year: "1982",
      slug: "kangaroo"
    },
    { 
      name: "Killer Instinct", 
      description: "Fast-paced fighting game with combo system", 
      year: "1994",
      slug: "killer-instinct"
    },
    { 
      name: "Kid Niki", 
      description: "Ninja platformer with unique weapon", 
      year: "1986",
      slug: "kid-niki"
    },
    { 
      name: "Klax", 
      description: "Tile-matching puzzle game with cascading tiles", 
      year: "1989",
      slug: "klax"
    },
    { 
      name: "Kick", 
      description: "Balloon-popping action puzzle game", 
      year: "1981",
      slug: "kick"
    },
    { 
      name: "Krull", 
      description: "Movie-based fantasy action game", 
      year: "1983",
      slug: "krull"
    }
  ],
  L: [
    { 
      name: "Lady Bug", 
      description: "Maze game with rotating gates", 
      year: "1981",
      slug: "lady-bug"
    },
    { 
      name: "Lunar Lander", 
      description: "Physics-based spacecraft landing simulation", 
      year: "1979",
      slug: "lunar-lander"
    },
    { 
      name: "Lock 'n' Chase", 
      description: "Maze chase game with door-closing mechanic", 
      year: "1981",
      slug: "lock-n-chase"
    },
    { 
      name: "Legendary Wings", 
      description: "Vertical shooter with fantasy elements", 
      year: "1986",
      slug: "legendary-wings"
    },
    { 
      name: "Lode Runner", 
      description: "Platform puzzle game with level editor", 
      year: "1983",
      slug: "lode-runner"
    },
    { 
      name: "Lost Tomb", 
      description: "Maze exploration with Egyptian theme", 
      year: "1982",
      slug: "lost-tomb"
    },
    { 
      name: "Libble Rabble", 
      description: "Unique puzzle game with rope mechanics", 
      year: "1983",
      slug: "libble-rabble"
    },
    { 
      name: "Laser Base", 
      description: "Space defense shooting game", 
      year: "1981",
      slug: "laser-base"
    }
  ],
  M: [
    { 
      name: "Mario Bros.", 
      description: "Plumbing platformer with turtles", 
      year: "1983",
      slug: "mario-bros"
    },
    { 
      name: "Moon Patrol", 
      description: "Side-scrolling lunar vehicle shooter", 
      year: "1982",
      slug: "moon-patrol"
    },
    { 
      name: "Missile Command", 
      description: "Ballistic missile defense game", 
      year: "1980",
      slug: "missile-command"
    },
    { 
      name: "Mr. Do!", 
      description: "Maze game with apple-throwing clown", 
      year: "1982",
      slug: "mr-do"
    },
    { 
      name: "Mappy", 
      description: "Platform game with police mouse", 
      year: "1983",
      slug: "mappy"
    },
    { 
      name: "Marble Madness", 
      description: "3D isometric marble racing game", 
      year: "1984",
      slug: "marble-madness"
    },
    { 
      name: "Major Havoc", 
      description: "Multi-genre game with vector graphics", 
      year: "1983",
      slug: "major-havoc"
    },
    { 
      name: "Millipede", 
      description: "Shoot-em-up sequel to Centipede", 
      year: "1982",
      slug: "millipede"
    }
  ],
  N: [
    { name: "NARC", description: "Crime-fighting action game", year: "1988", slug: "narc" },
    { name: "Nemesis", description: "Space shooting adventure", year: "1985", slug: "nemesis" },
    { name: "New Zealand Story", description: "Cute platformer with kiwi bird", year: "1988", slug: "new-zealand-story" },
    { name: "Ninja Gaiden", description: "Ninja action platformer", year: "1988", slug: "ninja-gaiden" },
    { name: "Nibbler", description: "Snake maze game", year: "1982", slug: "nibbler" },
    { name: "Nightmare in the Dark", description: "Platform game with horror theme", year: "2000", slug: "nightmare-in-the-dark" },
    { name: "Ninja Spirit", description: "Ninja action platformer", year: "1988", slug: "ninja-spirit" }
  ],
  O: [
    { name: "Out Run", description: "Ferrari racing game", year: "1986", slug: "out-run" },
    { name: "Operation Wolf", description: "Light gun rail shooter", year: "1987", slug: "operation-wolf" },
    { name: "Omega Race", description: "Space combat game", year: "1981", slug: "omega-race" },
    { name: "Oriental Legend", description: "Beat 'em up with Asian mythology", year: "1997", slug: "oriental-legend" },
    { name: "Out Zone", description: "Side-scrolling shooter with unique controls", year: "1990", slug: "out-zone" },
    { name: "Operation Thunderbolt", description: "Light gun shooter with military theme", year: "1988", slug: "operation-thunderbolt" }
  ],
  P: [
    { name: "Pac-Man", description: "Iconic maze chase game", year: "1980", slug: "pac-man" },
    { name: "Phoenix", description: "Space shooter with bird-like aliens", year: "1980", slug: "phoenix" },
    { name: "Pole Position", description: "Formula 1 racing game", year: "1982", slug: "pole-position" },
    { name: "Paperboy", description: "Deliver newspapers while avoiding obstacles", year: "1985", slug: "paperboy" },
    { name: "Pengo", description: "Push ice blocks to defeat enemies", year: "1982", slug: "pengo" },
    { name: "Pooyan", description: "Defend against wolves using arrows", year: "1982", slug: "pooyan" },
    { name: "Punch-Out!!", description: "Boxing game with colorful characters", year: "1984", slug: "punch-out" },
    { name: "Pitfall!", description: "Jungle adventure platformer", year: "1982", slug: "pitfall" }
  ],
  Q: [
    { name: "Q*bert", description: "Isometric puzzle platformer", year: "1982", slug: "qbert" },
    { name: "Qix", description: "Abstract puzzle drawing game", year: "1981", slug: "qix" },
    { name: "Quantum", description: "Vector graphics puzzle game", year: "1982", slug: "quantum" },
    { name: "Quartet", description: "Side-scrolling shooter with unique controls", year: "1986", slug: "quartet" },
    { name: "Quiz & Dragons", description: "Trivia game with RPG elements", year: "1992", slug: "quiz-dragons" }
  ],
  R: [
    { name: "Rally-X", description: "Maze driving game", year: "1980", slug: "rally-x" },
    { name: "Rampage", description: "City destruction as monsters", year: "1986", slug: "rampage" },
    { name: "Rastan", description: "Sword-wielding fantasy action", year: "1987", slug: "rastan" },
    { name: "Rolling Thunder", description: "Secret agent action platformer", year: "1986", slug: "rolling-thunder" },
    { name: "Rush'n Attack", description: "Military action platformer", year: "1985", slug: "rushn-attack" },
    { name: "Road Runner", description: "Platform game with Looney Tunes characters", year: "1985", slug: "road-runner" },
    { name: "Renegade", description: "Side-scrolling beat 'em up", year: "1986", slug: "renegade" }
  ],
  S: [
    { name: "Space Invaders", description: "Shoot waves of descending aliens", year: "1978", slug: "space-invaders" },
    { name: "Street Fighter", description: "One-on-one fighting game", year: "1987", slug: "street-fighter" },
    { name: "Spy Hunter", description: "Vehicular combat game", year: "1983", slug: "spy-hunter" },
    { name: "Star Wars", description: "Vector graphics space combat", year: "1983", slug: "star-wars" },
    { name: "Scramble", description: "Side-scrolling shooter with fuel management", year: "1981", slug: "scramble" },
    { name: "Sinistar", description: "Space shooter with menacing boss", year: "1982", slug: "sinistar" },
    { name: "Super Sprint", description: "Overhead view racing game", year: "1986", slug: "super-sprint" },
    { name: "Satan's Hollow", description: "Defend against waves of demons", year: "1981", slug: "satans-hollow" }
  ],
  T: [
    { name: "Tempest", description: "Vector graphics shooter", year: "1981", slug: "tempest" },
    { name: "Time Pilot", description: "Time-traveling air combat", year: "1982", slug: "time-pilot" },
    { name: "Track & Field", description: "Olympic sports competition", year: "1983", slug: "track-field" },
    { name: "Tron", description: "Movie-based light cycles game", year: "1982", slug: "tron" },
    { name: "Tutankham", description: "Egyptian themed maze shooter", year: "1982", slug: "tutankham" },
    { name: "Thunder Blade", description: "3D shooter with helicopter combat", year: "1987", slug: "thunder-blade" },
    { name: "Tiger Road", description: "Side-scrolling action game with ninja theme", year: "1987", slug: "tiger-road" }
  ],
  U: [
    { name: "Ultima", description: "Fantasy role-playing series", year: "1981", slug: "ultima" },
    { name: "UN Squadron", description: "Military aircraft shooter", year: "1989", slug: "un-squadron" },
    { name: "Up 'n Down", description: "Vertical jumping racing game", year: "1983", slug: "up-n-down" },
    { name: "U.N. Squadron", description: "Side-scrolling shooter with military theme", year: "1989", slug: "un-squadron" },
    { name: "Uridium", description: "Side-scrolling shooter with unique controls", year: "1986", slug: "uridium" }
  ],
  V: [
    { name: "Vanguard", description: "Multi-directional space shooter", year: "1981", slug: "vanguard" },
    { name: "Venture", description: "Dungeon exploration game", year: "1981", slug: "venture" },
    { name: "Victory Road", description: "Run and gun action", year: "1986", slug: "victory-road" },
    { name: "Vigilante", description: "Street fighting action", year: "1988", slug: "vigilante" },
    { name: "VS. Tennis", description: "Tennis sports game", year: "1984", slug: "vs-tennis" },
    { name: "Vindicators", description: "Tank combat action game", year: "1988", slug: "vindicators" },
    { name: "Volfied", description: "Puzzle game with unique mechanics", year: "1989", slug: "volfied" }
  ],
  W: [
    { name: "Wonder Boy", description: "Platform adventure series", year: "1986", slug: "wonder-boy" },
    { name: "Wizard of Wor", description: "Maze shooting game", year: "1980", slug: "wizard-of-wor" },
    { name: "Warlords", description: "Castle defense game", year: "1980", slug: "warlords" },
    { name: "Wardner", description: "Fantasy platformer", year: "1987", slug: "wardner" },
    { name: "World Court Tennis", description: "Tennis sports game", year: "1988", slug: "world-court-tennis" },
    { name: "Wild Western", description: "Western-themed shooter", year: "1982", slug: "wild-western" },
    { name: "Wrecking Crew", description: "Demolition game with unique controls", year: "1985", slug: "wrecking-crew" }
  ],
  X: [
    { name: "Xevious", description: "Vertical scrolling shooter", year: "1982", slug: "xevious" },
    { name: "X Multiply", description: "Biological themed shooter", year: "1989", slug: "x-multiply" },
    { name: "Xenophobe", description: "Alien fighting platform game", year: "1987", slug: "xenophobe" },
    { name: "XYBots", description: "3D maze shooter", year: "1987", slug: "xybots" },
    { name: "X-Men", description: "Side-scrolling beat 'em up with Marvel characters", year: "1992", slug: "x-men" }
  ],
  Y: [
    { name: "Yie Ar Kung-Fu", description: "Martial arts fighting game", year: "1985", slug: "yie-ar-kung-fu" },
    { name: "Youkai Douchuuki", description: "Japanese mythology action", year: "1987", slug: "youkai-douchuuki" },
    { name: "Yoshi", description: "Puzzle game with Mario characters", year: "1991", slug: "yoshi" },
    { name: "Yume Kōjō: Doki Doki Panic", description: "Platform game with unique mechanics", year: "1987", slug: "yume-kojo-doki-doki-panic" }
  ],
  Z: [
    { name: "Zaxxon", description: "Isometric space shooter", year: "1982", slug: "zaxxon" },
    { name: "Zookeeper", description: "Platform game with animals", year: "1982", slug: "zookeeper" },
    { name: "Zig Zag", description: "Maze navigation game", year: "1982", slug: "zig-zag" },
    { name: "Zero Wing", description: "Horizontal space shooter", year: "1989", slug: "zero-wing" },
    { name: "Zombie Raid", description: "Light gun zombie shooter", year: "1995", slug: "zombie-raid" }
  ]
}
