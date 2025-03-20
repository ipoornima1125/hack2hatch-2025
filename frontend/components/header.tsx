import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <div className="border rounded-md px-6 py-2 font-medium">LOGO</div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/feed" className="text-xl font-medium transition-colors hover:text-primary">
            Feed
          </Link>
          <Link href="/links" className="text-xl font-medium transition-colors hover:text-primary">
            Links
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Link href="/profile/johnsmith">
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}

