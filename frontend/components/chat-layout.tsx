"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "other"
  timestamp: Date
}

interface ChatLayoutProps {
  groupId: number
  groupName: string
}

export function ChatLayout({ groupId, groupName }: ChatLayoutProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Welcome to the ${groupName} chat!`,
      sender: "other",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "user",
        timestamp: new Date(),
        // In a real app, you'd send this to your backend
      }
      setMessages((prev) => [...prev, message])
      setNewMessage("")
      
      // Simulate response (remove in real implementation)
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          content: `Response to: "${newMessage}"`,
          sender: "other",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, response])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">{groupName}</h2>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="border-t p-4">
        <form 
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
} 