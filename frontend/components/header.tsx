import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/icon.png" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="object-contain"
            />
            <span className="text-xl font-medium">iNNov8</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-base font-normal text-gray-700 hover:text-blue-600 hover:underline transition-colors"
            >
              Feed
            </Link>
            <Link 
              href="/links" 
              className="text-base font-normal text-gray-700 hover:text-blue-600 hover:underline transition-colors"
            >
              Links
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Professional, animated search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 transition duration-300 ease-in-out border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <Link href="/profile/johnsmith">
            <Avatar>
              <AvatarImage src="/default-avatar.png" alt="User Avatar" />
              <AvatarFallback>
                <Image 
                  src="/default-avatar.png" 
                  alt="Default Avatar" 
                  width={40} 
                  height={40} 
                />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
