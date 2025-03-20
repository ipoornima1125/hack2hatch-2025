"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PostCreator } from "@/components/post-creator"
import { PostList } from "@/components/post-list"
import { Separator } from "@/components/ui/separator"

// Mock data for groups
const GROUPS = [
  { id: 1, name: "Group 1" },
  { id: 2, name: "Group 2" },
  { id: 3, name: "Group 3" },
  { id: 4, name: "Group 4" },
  { id: 5, name: "Group 5" },
  { id: 6, name: "Group 6" },
]

// Mock data for posts
const INITIAL_POSTS = [
  { id: 1, content: "Post 1", author: "User 1", timestamp: new Date() },
  { id: 2, content: "Post 2", author: "User 2", timestamp: new Date() },
]

export function SocialFeed() {
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [activeGroup, setActiveGroup] = useState<number | null>(null)

  const handleCreatePost = (content: string) => {
    const newPost = {
      id: posts.length + 1,
      content,
      author: "Current User",
      timestamp: new Date(),
    }
    setPosts([newPost, ...posts])
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar groups={GROUPS} activeGroup={activeGroup} onGroupSelect={setActiveGroup} />
        <main className="flex-1 border-l p-4 md:p-6">
          <PostCreator onSubmit={handleCreatePost} />
          <Separator className="my-6" />
          <PostList posts={posts} />
        </main>
      </div>
    </div>
  )
}

