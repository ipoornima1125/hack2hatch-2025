"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"

interface PostCreatorProps {
  onSubmit: (content: string) => void
}

export function PostCreator({ onSubmit }: PostCreatorProps) {
  const [content, setContent] = useState("")

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent("")
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's on your mind...?"
            className="min-h-[80px] resize-none border-0 p-0 focus-visible:ring-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button size="icon" className="self-end" onClick={handleSubmit} disabled={!content.trim()}>
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Post</span>
        </Button>
      </div>
    </div>
  )
}

