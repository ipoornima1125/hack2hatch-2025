"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileSidebarProps {
  groups: { id: number; name: string }[]
  activeGroup: number | null
  onGroupSelect: (groupId: number) => void
}

export function MobileSidebar({ groups, activeGroup, onGroupSelect }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)

  const handleGroupSelect = (groupId: number) => {
    onGroupSelect(groupId)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col gap-2 p-4">
          {groups.map((group) => (
            <Button
              key={group.id}
              variant="outline"
              className={cn("justify-start text-left font-medium", activeGroup === group.id && "bg-muted")}
              onClick={() => handleGroupSelect(group.id)}
            >
              {group.name}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

