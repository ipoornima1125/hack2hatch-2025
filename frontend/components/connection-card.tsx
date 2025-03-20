"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { UserX, User } from "lucide-react"

interface Connection {
  id: string
  name: string
  profileImage: string
  bio: string
  role: string
  company: string
  connectionDate: string
}

interface ConnectionCardProps {
  connection: Connection
  onRemove: (id: string) => void
}

export function ConnectionCard({ connection, onRemove }: ConnectionCardProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }
  
  const handleRemoveClick = () => {
    if (!isConfirming) {
      setIsConfirming(true)
      return
    }
    
    onRemove(connection.id)
    setIsConfirming(false)
  }
  
  const handleCancelRemove = () => {
    setIsConfirming(false)
  }
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        {/* Connection header - background + image */}
        <div className="relative">
          <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="absolute -bottom-8 left-4">
            <Avatar className="h-16 w-16 border-4 border-white">
              <AvatarImage src={connection.profileImage} alt={connection.name} />
              <AvatarFallback>{getInitials(connection.name)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        {/* Connection info */}
        <div className="pt-10 px-4 pb-4">
          <h3 className="font-semibold text-lg">{connection.name}</h3>
          <p className="text-sm text-gray-700 mb-1">{connection.role} at {connection.company}</p>
          <p className="text-xs text-gray-500 mb-3">{connection.connectionDate}</p>
          <p className="text-sm text-gray-600 line-clamp-3">{connection.bio}</p>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-4 py-3 border-t flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
        >
          <Link href={`/profile/${connection.name.toLowerCase().replace(/\s+/g, '')}`}>
            <User className="h-4 w-4 mr-2" />
            Profile
          </Link>
        </Button>
        
        {isConfirming ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCancelRemove}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleRemoveClick}
            >
              Confirm
            </Button>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:text-red-600 hover:bg-red-50"
            onClick={handleRemoveClick}
          >
            <UserX className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 