"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditButtonProps {
  onClick: () => void
  className?: string
}

export function EditButton({ onClick, className = "" }: EditButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Pencil className="h-4 w-4" />
      <span className="sr-only">Edit</span>
    </Button>
  )
}

