"use client"

import Link from "next/link"
import { Button } from "../components/ui/button"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

export function SiteHeader() {
  const { isSignedIn } = useUser()

  return (
    <header className="sticky px-10 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-foreground">Classic Games</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/games" className="text-foreground">Games</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/favorites" className="text-foreground">Favorites</Link>
            </Button>
          </nav>
          <nav className="flex items-center space-x-2">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-foreground">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
