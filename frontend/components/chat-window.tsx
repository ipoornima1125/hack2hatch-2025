"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
  isCurrentUser: boolean
  imageUrl?: string
}

interface ChatWindowProps {
  groupId: number
  groupName: string
  accentColor?: string
}

export function ChatWindow({ groupId, groupName, accentColor = "#4F46E5" }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Welcome to the ${groupName} chat!`,
      sender: {
        id: "system",
        name: "System",
      },
      timestamp: new Date(),
      isCurrentUser: false,
    },
  ])
  
  const [messageInput, setMessageInput] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!messageInput.trim() && !selectedFile) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageInput,
      sender: {
        id: "current-user",
        name: "Me",
        avatar: "/default-avatar.png",
      },
      timestamp: new Date(),
      isCurrentUser: true,
      imageUrl: imagePreview || undefined,
    }

    setMessages([...messages, newMessage])
    setMessageInput("")
    setImagePreview(null)
    setSelectedFile(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    
    // Create preview URL for the image
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clearAttachment = () => {
    setSelectedFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="sticky top-0 p-4 border-b z-10 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium" 
            style={{ backgroundColor: accentColor }}
          >
            {groupName.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{groupName}</h2>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] flex gap-2 ${message.isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {!message.isCurrentUser && (
                <Avatar className="h-8 w-8 mt-1">
                  {message.sender.avatar ? (
                    <Image 
                      src={message.sender.avatar} 
                      alt={message.sender.name} 
                      width={32} 
                      height={32} 
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                  )}
                </Avatar>
              )}
              
              <div>
                <div 
                  className={`px-4 py-2 rounded-lg ${
                    message.isCurrentUser 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                  
                  {message.imageUrl && (
                    <div className="mt-2">
                      <Image
                        src={message.imageUrl}
                        alt="Attached image"
                        width={300}
                        height={200}
                        className="rounded-md object-cover max-h-60 w-auto"
                      />
                    </div>
                  )}
                </div>
                
                <div 
                  className={`text-xs text-muted-foreground mt-1 ${
                    message.isCurrentUser ? "text-right" : "text-left"
                  }`}
                >
                  {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Image preview */}
      {imagePreview && (
        <div className="p-2 border-t">
          <div className="relative inline-block">
            <Image 
              src={imagePreview} 
              alt="Preview" 
              width={100} 
              height={100} 
              className="h-20 w-auto object-cover rounded-md"
            />
            <Button 
              variant="destructive" 
              size="icon" 
              className="h-5 w-5 absolute -top-2 -right-2 rounded-full"
              onClick={clearAttachment}
            >
              ×
            </Button>
          </div>
        </div>
      )}
      
      {/* Message input */}
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2 items-end">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-10 w-10 shrink-0"
            onClick={handleFileSelect}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="pr-10 py-6"
            />
          </div>
          
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full h-10 w-10 shrink-0"
            onClick={handleSendMessage}
            disabled={!messageInput.trim() && !selectedFile}
            style={{ backgroundColor: accentColor }}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
} 