import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"

interface RootLayoutProps {
  children: React.ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">
        {children}
      </div>
      <SiteFooter />
    </div>
  )
}
