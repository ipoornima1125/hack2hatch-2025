"use client"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Image as ImageIcon } from "lucide-react"

interface PostCreatorProps {
  onSubmit: (content: string, image?: File) => void
}

export function PostCreator({ onSubmit }: PostCreatorProps) {
  const [content, setContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (content.trim() || selectedImage) {
      onSubmit(content, selectedImage || undefined)
      setContent("")
      setSelectedImage(null)
      setImagePreview(null)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="rounded-lg border p-4 bg-white shadow-sm">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's on your mind...?"
            className="min-h-[80px] resize-none border-0 p-2 focus-visible:ring-0 placeholder-gray-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {imagePreview && (
            <div className="mt-3 relative">
              <img 
                src={imagePreview} 
                alt="Image preview" 
                className="max-h-60 w-full rounded-md object-cover transition-transform hover:scale-105"
              />
              <button 
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setSelectedImage(null)
                  setImagePreview(null)
                  if (fileInputRef.current) fileInputRef.current.value = ""
                }}
                aria-label="Remove attached image"
              >
                ×
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col items-center space-y-2">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              title="Attach image"
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageChange} 
            />
          </div>
          <Button 
            size="icon" 
            className="self-end mt-2"
            onClick={handleSubmit} 
            disabled={!content.trim() && !selectedImage}
            title="Post"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Post</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
