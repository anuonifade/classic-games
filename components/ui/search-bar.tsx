"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"

interface SearchBarProps {
  className?: string
  onSearch?: (query: string) => void
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  ({ className, onSearch, value, onChange, placeholder = "Search for a game...", ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSearch?.(value || "")
    }

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(
          "group relative flex w-full max-w-4xl items-center gap-2 rounded-xl border bg-background/50 p-1.5 backdrop-blur-sm transition-all duration-300 focus-within:bg-background/80 focus-within:shadow-lg hover:bg-background/60",
          className
        )}
      >
        <Search className="ml-3 h-5 w-5 text-muted-foreground/60 transition-colors duration-200 group-hover:text-muted-foreground/80 group-focus-within:text-foreground" />
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border-0 bg-transparent p-2 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          className="relative h-9 shrink-0 overflow-hidden rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-100"
        >
          <span className="relative z-10">Search</span>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Button>
      </form>
    )
  }
)

SearchBar.displayName = "SearchBar"

export { SearchBar }
