"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search } from "lucide-react"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const handleSearchFocus = () => {
    setIsSearchOpen(true)
    setIsSearching(true)
    setTimeout(() => {
      setSearchResults([
        {
          id: "1",
          name: "Dr. Sarah Chen",
          role: "Mentor",
          expertise: ["AI/ML", "Data Science", "Deep Learning", "Neural Networks"],
          bio: "Leading AI researcher with 10+ years of experience in machine learning and deep neural networks. Previously led AI initiatives at major tech companies.",
          location: "San Francisco, CA",
          experience: "10+ years",
          availability: "Available for weekly mentoring",
          connections: 500
        },
        {
          id: "2",
          name: "Michael Rodriguez",
          role: "Investor",
          expertise: ["Fintech", "SaaS", "B2B", "Enterprise Software"],
          bio: "Angel investor and venture capitalist specializing in early-stage startups. Portfolio includes successful exits in fintech and enterprise software.",
          location: "New York, NY",
          experience: "15+ years",
          availability: "Open to pitch meetings",
          connections: 1200
        },
        {
          id: "3",
          name: "Emily Zhang",
          role: "Expert",
          expertise: ["UX Design", "Product Strategy", "Design Systems", "User Research"],
          bio: "Product design leader focused on creating intuitive user experiences. Previously designed products used by millions of users globally.",
          location: "London, UK",
          experience: "8+ years",
          availability: "Available for consulting",
          connections: 800
        },
        {
          id: "4",
          name: "Raj Patel",
          role: "Innovator",
          expertise: ["Blockchain", "Web3", "Smart Contracts", "DeFi"],
          bio: "Serial entrepreneur building decentralized solutions. Founded multiple successful blockchain startups and contributed to major protocols.",
          location: "Singapore",
          experience: "6+ years",
          availability: "Looking for co-founders",
          connections: 600
        }
      ])
      setIsSearching(false)
    }, 2000)
  }

  return (
    <>
      <header className="border-b relative z-10">
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
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
