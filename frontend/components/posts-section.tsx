import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface Post {
  id: string
  title: string
  excerpt: string
  date: string
}

interface PostsSectionProps {
  posts: Post[]
}

export function PostsSection({ posts }: PostsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p className="text-muted-foreground italic">No posts yet</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <h3 className="font-bold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.date}</p>
                <p className="mt-2">{post.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

