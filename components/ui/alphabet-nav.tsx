"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface AlphabetNavProps {
  currentLetter: string
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

export function AlphabetNav({ currentLetter }: AlphabetNavProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {ALPHABET.map((letter) => (
        <Link
          key={letter}
          href={`/games/letter/${letter.toLowerCase()}`}
          className={cn(
            "inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-medium transition-colors",
            letter === currentLetter
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          {letter}
        </Link>
      ))}
    </div>
  )
}
