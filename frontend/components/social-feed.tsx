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
  likes?: number
  comments?: number
}

// Enhanced mock data for posts with more descriptive content, real names, and images
const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    content: "Excited to announce that our startup, EcoTech Solutions, just secured $2.5M in seed funding! 🚀 This investment will help us scale our sustainable energy technology to more communities and accelerate our mission to make renewable energy accessible to everyone.\n\nWe've been working on this for over two years, refining our solar efficiency technology and building partnerships with local governments. The journey hasn't been easy—we faced countless rejections and technical hurdles along the way—but perseverance has finally paid off.\n\nLooking forward to growing our team and expanding our impact. If you're passionate about climate tech and looking for new opportunities, check out our careers page!",
    author: { 
      username: "Emily Chen", 
      avatarUrl: "/default-avatar.png" 
    },
    timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    imageUrl: "/startup-funding.jpeg",
    likes: 42,
    comments: 12
  },
  {
    id: 2,
    content: "Just finished reading 'The Lean Startup' by Eric Ries for the third time, and I keep discovering new insights with each reading. The principles of validated learning and build-measure-learn have transformed how I approach product development.\n\nOne lesson that particularly resonates with me is the concept of innovation accounting—establishing clear metrics to measure progress when traditional accounting methods fall short. We've implemented this at our company, and it's helped us make more informed decisions about which features to prioritize and when to pivot.\n\nWhat business books have fundamentally changed your approach to entrepreneurship? Would love to expand my reading list with your recommendations!",
    author: { 
      username: "Marcus Johnson", 
      avatarUrl: "/default-avatar.png" 
    },
    timestamp: new Date(Date.now() - 3600000 * 24), // 1 day ago
    likes: 28,
    comments: 15
  },
  {
    id: 3,
    content: "Just returned from the Women in Tech Summit in San Francisco, and I'm feeling incredibly inspired! The panel on 'Breaking Barriers in AI Ethics' was particularly enlightening—we discussed how diverse teams are essential for developing AI systems that work fairly for everyone.\n\nI had the opportunity to present our research on using machine learning to detect biases in hiring algorithms, which sparked some fascinating discussions about responsible innovation. Many attendees were surprised by how subtle biases can be amplified through seemingly neutral systems.\n\nConnected with so many brilliant minds working at the intersection of technology and social impact. If anyone else attended, I'd love to continue our conversations!",
    author: { 
      username: "Dr. Aisha Patel", 
      avatarUrl: "/default-avatar.png" 
    },
    timestamp: new Date(Date.now() - 3600000 * 48), // 2 days ago
    likes: 89,
    comments: 34
  },
  {
    id: 4,
    content: "After 5 years of bootstrapping our SaaS platform, we've hit $1M ARR! 🎉 What started as a side project in my apartment has grown into a team of 12 dedicated people serving over 200 business customers.\n\nThe journey hasn't been linear—we had to pivot twice before finding product-market fit, and there were months when I questioned whether we would make it. But staying close to our customers and solving their real problems kept us on track.\n\nKey lessons I've learned:\n• Cash flow is king, especially when bootstrapping\n• Hire for culture fit as much as for skills\n• Talk to your customers every single day\n• Focus on one core problem and solve it exceptionally well\n\nGrateful for this community's support and insights along the way. Happy to share more specific learnings if anyone's interested!",
    author: { 
      username: "David Nguyen", 
      avatarUrl: "/default-avatar.png" 
    },
    timestamp: new Date(Date.now() - 3600000 * 72), // 3 days ago
    likes: 156,
    comments: 47
  }
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
      author: { username: "Alex Morgan", avatarUrl: "/default-avatar.png" },
      timestamp: new Date(),
      imageUrl,
      likes: 0,
      comments: 0
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

  // Get user's name
  const userName = "Alex"

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
                <h2 className="text-xl font-medium text-blue-800">{getGreeting()}, {userName}!</h2>
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
