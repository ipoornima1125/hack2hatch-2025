"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Share } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface PostListProps {
  posts: Post[]
}

// Client-only component for displaying relative time.
function RelativeTime({ timestamp }: { timestamp: Date }) {
  const [relativeTime, setRelativeTime] = useState("just now")

  useEffect(() => {
    setRelativeTime(formatDistanceToNow(new Date(timestamp), { addSuffix: true }))
  }, [timestamp])

  return <span>{relativeTime}</span>
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="shadow-sm overflow-hidden">
          <CardContent className="p-6">
            {/* Header with avatar, username, and relative timestamp */}
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-10 w-10">
                <Image
                  src={post.author.avatarUrl}
                  alt={post.author.username}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <AvatarFallback>
                  {post.author.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-gray-800">
                  {post.author.username}
                </div>
                <div className="text-xs text-gray-500">
                  <RelativeTime timestamp={post.timestamp} />
                </div>
              </div>
            </div>

            {/* Post content */}
            <div className="text-base text-gray-700 mb-4">{post.content}</div>

            {/* Optional attached image */}
            {post.imageUrl && (
              <div className="mt-4">
                <Image
                  src={post.imageUrl}
                  alt="Attached image"
                  width={600}
                  height={400}
                  className="rounded-md object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
          </CardContent>
          
          {/* New interaction buttons */}
          <CardFooter className="px-6 py-4 border-t bg-gray-50/50 flex justify-between">
            <div className="flex gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1.5 text-gray-600 hover:text-rose-500 transition-colors"
                onClick={() => handleLike(post.id)}
              >
                <Heart className={`h-4 w-4 ${post.likes && post.likes > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="text-xs font-medium">{post.likes || 0}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 transition-colors"
                onClick={() => handleComment(post.id)}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs font-medium">{post.comments || 0}</span>
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-emerald-500 transition-colors"
              onClick={() => handleShare(post.id)}
            >
              <Share className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
  
  // Handler functions
  function handleLike(postId: number) {
    // Implement like functionality here
    console.log(`Liked post: ${postId}`)
  }
  
  function handleComment(postId: number) {
    // Implement comment functionality here
    console.log(`Comment on post: ${postId}`)
  }
  
  function handleShare(postId: number) {
    // Implement share functionality here
    console.log(`Share post: ${postId}`)
  }
}
