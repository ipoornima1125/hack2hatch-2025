import { Card, CardContent } from "@/components/ui/card"

interface Post {
  id: number
  content: string
  author: string
  timestamp: Date
}

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{post.content}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

