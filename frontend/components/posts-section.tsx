"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EditButton } from "@/components/edit-button"
import { EditModal } from "@/components/edit-modal"

export interface Post {
  id: string
  title: string
  excerpt: string
  date: string
}

interface PostsSectionProps {
  posts?: Post[]
}

export function PostsSection({ posts = [] }: PostsSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [postsData, setPostsData] = useState(posts || [])

  const handleSave = (index: number, data: { title: string; excerpt: string; date: string }) => {
    const newPosts = [...postsData]
    newPosts[index] = { ...newPosts[index], ...data }
    setPostsData(newPosts)
    // In a real app, you would save this to the database
  }

  return (
    <Card className="group relative">
      <EditButton onClick={() => setEditingIndex(postsData.length > 0 ? 0 : null)} />
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {postsData.length === 0 ? (
          <p className="text-muted-foreground italic">No posts yet</p>
        ) : (
          <div className="space-y-4">
            {postsData.map((post, index) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0 group/item relative">
                <EditButton
                  onClick={() => setEditingIndex(index)}
                  className="right-0 top-0 group-hover/item:opacity-100"
                />
                <h3 className="font-bold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.date}</p>
                <p className="mt-2">{post.excerpt}</p>

                {editingIndex === index && (
                  <>
                    <div>Debug: Modal should be visible for index {index}</div>
                    <EditModal
                      title="Edit Post"
                      isOpen={true}
                      onClose={() => setEditingIndex(null)}
                      onSave={(data) => handleSave(index, data)}
                      fields={[
                        {
                          id: "title",
                          label: "Title",
                          type: "text",
                          value: post.title,
                        },
                        {
                          id: "excerpt",
                          label: "Excerpt",
                          type: "textarea",
                          value: post.excerpt,
                        },
                        {
                          id: "date",
                          label: "Date",
                          type: "text",
                          value: post.date,
                        },
                      ]}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

