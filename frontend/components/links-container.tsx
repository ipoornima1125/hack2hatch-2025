"use client"

import { useState } from "react"
import { ConnectionCard } from "@/components/connection-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock data for connections
const INITIAL_CONNECTIONS = [
  {
    id: "1",
    name: "Sarah Johnson",
    profileImage: "/avatars/sarah.jpg",
    bio: "Senior Product Designer at CreativeHub | UI/UX Specialist | Design Systems Expert",
    role: "Product Designer",
    company: "CreativeHub",
    connectionDate: "Connected 2 months ago"
  },
  {
    id: "2",
    name: "David Chen",
    profileImage: "/avatars/david.jpg",
    bio: "Startup Founder & CEO at TechInnovate | Angel Investor | Former Software Engineer at Google",
    role: "Founder & CEO",
    company: "TechInnovate",
    connectionDate: "Connected 1 week ago"
  },
  {
    id: "3",
    name: "Mei Lin",
    profileImage: "/avatars/mei.jpg",
    bio: "AI Research Scientist | Ph.D. in Machine Learning | Building the future of intelligent systems",
    role: "AI Research Scientist",
    company: "DeepMind",
    connectionDate: "Connected 3 months ago"
  },
  {
    id: "4",
    name: "James Wilson",
    profileImage: "/avatars/james.jpg",
    bio: "Venture Capitalist at Horizon Ventures | Focusing on FinTech and EdTech | MBA from Stanford",
    role: "Partner",
    company: "Horizon Ventures",
    connectionDate: "Connected 5 months ago"
  },
  {
    id: "5",
    name: "Elena Rodriguez",
    profileImage: "/avatars/elena.jpg",
    bio: "Full-Stack Developer | Open Source Contributor | Speaker | Building communities through code",
    role: "Senior Engineer",
    company: "Mozilla",
    connectionDate: "Connected 1 month ago"
  }
]

export function LinksContainer() {
  const [connections, setConnections] = useState(INITIAL_CONNECTIONS)
  const [searchQuery, setSearchQuery] = useState("")

  const handleRemoveConnection = (connectionId: string) => {
    setConnections(connections.filter(connection => connection.id !== connectionId))
  }

  const filteredConnections = connections.filter(connection => 
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      {/* Search and filter bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search links..."
          className="pl-10 py-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Connections count and sorting options could go here */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {filteredConnections.length} link{filteredConnections.length !== 1 ? 's' : ''}
      </div>
      
      {/* Connections grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnections.map(connection => (
          <ConnectionCard 
            key={connection.id}
            connection={connection}
            onRemove={handleRemoveConnection}
          />
        ))}
      </div>
      
      {filteredConnections.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No links found</div>
          <p className="text-gray-500">Try adjusting your search or add new links</p>
        </div>
      )}
    </div>
  )
} 