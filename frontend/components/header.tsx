"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, X, MapPin, Users2, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SearchResult {
  id: string
  name: string
  role: "Mentor" | "Innovator" | "Expert" | "Investor"
  expertise: string[]
  bio: string
  location: string
  experience: string
  availability: string
  connections: number
}

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
          name: "Alex Chen",
          role: "Innovator",
          expertise: ["AI/ML", "Robotics", "Computer Vision", "ROS"],
          bio: "Pioneering innovator in AI-driven robotics. Founder of RoboAI Solutions, developing next-generation robotic assistants. Former R&D Lead at Boston Dynamics with multiple patents in human-robot interaction.",
          location: "Boston, MA",
          experience: "8+ years",
          availability: "Open to research collaboration",
          connections: 1500
        },
        {
          id: "2",
          name: "Dr. Maya Patel",
          role: "Mentor",
          expertise: ["Quantum Computing", "AI Ethics", "Machine Learning"],
          bio: "Quantum computing researcher and AI ethics advocate. Leading breakthrough research in quantum machine learning applications. Published in Nature and Science.",
          location: "Cambridge, MA",
          experience: "12+ years",
          availability: "Available for mentoring",
          connections: 2000
        },
        {
          id: "3",
          name: "James Wilson",
          role: "Investor",
          expertise: ["DeepTech", "Robotics", "AI Startups"],
          bio: "Managing Partner at TechFrontier Ventures. Invested in 20+ deep tech startups with 3 successful exits. Focus on robotics and AI innovations.",
          location: "San Francisco, CA",
          experience: "15+ years",
          availability: "Open to pitch meetings",
          connections: 3000
        },
        {
          id: "4",
          name: "Dr. Sophie Laurent",
          role: "Expert",
          expertise: ["Neural Networks", "Autonomous Systems", "Robotics"],
          bio: "Leading researcher in autonomous systems. Developed breakthrough algorithms for robot learning. Previously at OpenAI and DeepMind.",
          location: "Paris, France",
          experience: "10+ years",
          availability: "Available for consulting",
          connections: 1800
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search mentors, innovators..."
                className="w-64 transition duration-300 ease-in-out border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onFocus={handleSearchFocus}
              />
            </div>
            <Link href="/profile/johnsmith">
              <Avatar>
                <Image 
                  src="/default-avatar.png" 
                  alt="User Avatar" 
                  width={40} 
                  height={40} 
                  className="rounded-full" 
                />
                <AvatarFallback>
                  <Image 
                    src="/default-avatar.png" 
                    alt="Default Avatar" 
                    width={40} 
                    height={40} 
                    className="rounded-full"
                  />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="container mx-auto p-4">
              <div className="flex items-center justify-between mb-8">
                <div className="relative flex-1 max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search mentors, innovators, experts, investors..."
                    className="w-full text-lg py-4 pl-14 pr-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                  />
                  <p className="mt-4 text-gray-600">AI is finding the best matches...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map((result) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <Image
                            src="/default-avatar.png"
                            alt={result.name}
                            width={64}
                            height={64}
                            className="rounded-full"
                          />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-xl">{result.name}</h3>
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                result.role === "Mentor" ? "bg-blue-100 text-blue-700" :
                                result.role === "Investor" ? "bg-green-100 text-green-700" :
                                result.role === "Expert" ? "bg-purple-100 text-purple-700" :
                                "bg-orange-100 text-orange-700"
                              }`}>
                                {result.role}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users2 className="w-4 h-4 mr-1" />
                              <span className="text-sm">{result.connections}</span>
                            </div>
                          </div>

                          <p className="mt-3 text-gray-600 line-clamp-2">{result.bio}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {result.expertise.map((skill, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {result.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {result.experience}
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-green-600">
                            {result.availability}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
