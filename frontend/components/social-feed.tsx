"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PostCreator } from "@/components/post-creator"
import { PostList } from "@/components/post-list"
import { ChatWindow } from "@/components/chat-window"
import { Separator } from "@/components/ui/separator"

// Mock data for groups
const GROUPS = [
  { id: 1, name: "Sarah Chen", color: "#4F46E5" }, // Indigo
  { id: 2, name: "Michael Rodriguez", color: "#0EA5E9" }, // Sky blue
  { id: 3, name: "Priya Patel", color: "#10B981" }, // Emerald
  { id: 4, name: "James Wilson", color: "#F59E0B" }, // Amber
  { id: 5, name: "Aisha Mohammed", color: "#EC4899" }, // Pink
  { id: 6, name: "David Kim", color: "#8B5CF6" }, // Violet
]

// Updated post interface structure
interface Post {
  id: number
  content: string
  author: {
    username: string
    avatarUrl: string
  }
  timestamp: Date
  imageUrl?: string
}

// Updated mock data for posts
const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    content: "Entrepreneurship is the art of turning bold ideas into reality. It demands vision, resilience, and the courage to take risks. Our journey is fueled by innovation and the drive to overcome challenges, transforming obstacles into opportunities.",
    author: { username: "User 1", avatarUrl: "/default-avatar.png" },
    timestamp: new Date(),
  },
  {
    id: 2,
    content: "In the fast-paced world of startups, creativity and determination are key to success. Embracing collaboration, learning from failures, and constantly innovating are the foundations of building a thriving business. Let's lead the change and redefine the future.",
    author: { username: "User 2", avatarUrl: "/default-avatar.png" },
    timestamp: new Date(),
  },
]

export function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [activeGroup, setActiveGroup] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'feed' | 'chat'>('feed')

  // Setup event listener for returning to feed
  useEffect(() => {
    const handleReturnToFeed = () => {
      setViewMode('feed')
      setActiveGroup(null)
    }
    
    window.addEventListener('returnToFeed', handleReturnToFeed)
    
    return () => {
      window.removeEventListener('returnToFeed', handleReturnToFeed)
    }
  }, [])

  const handleCreatePost = (content: string, image?: File) => {
    // If an image is attached, create a temporary URL for preview
    const imageUrl = image ? URL.createObjectURL(image) : undefined

    const newPost: Post = {
      id: posts.length + 1,
      content,
      author: { username: "Current User", avatarUrl: "/default-avatar.png" },
      timestamp: new Date(),
      imageUrl,
    }
    setPosts([newPost, ...posts])
  }

  const handleGroupSelect = (groupId: number) => {
    setActiveGroup(groupId)
    setViewMode('chat')
  }

  // Find the active group's name and color
  const activeGroupInfo = GROUPS.find(g => g.id === activeGroup)
  const activeGroupName = activeGroupInfo?.name || "Chat"
  const activeGroupColor = activeGroupInfo?.color

  // Get the current time of day to set the appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar 
          groups={GROUPS} 
          activeGroup={activeGroup} 
          onGroupSelect={handleGroupSelect} 
        />
        
        <main className="flex-1 border-l flex flex-col bg-white shadow-sm">
          {viewMode === 'feed' ? (
            <div className="p-4 md:p-6 flex-1 overflow-y-auto">
              {/* Welcome banner */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <h2 className="text-xl font-medium text-blue-800">{getGreeting()}, User!</h2>
                <p className="text-blue-600 mt-1">Share your ideas and connect with other innovators.</p>
              </div>
              
              <PostCreator onSubmit={handleCreatePost} />
              <Separator className="my-6" />
              <PostList posts={posts} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col" style={{ 
              background: `linear-gradient(to bottom, ${activeGroupColor}15, transparent 15%)` 
            }}>
              <ChatWindow 
                groupId={activeGroup!} 
                groupName={activeGroupName} 
                accentColor={activeGroupColor}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
