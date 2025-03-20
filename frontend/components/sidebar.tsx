"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  groups: { id: number; name: string }[]
  activeGroup: number | null
  onGroupSelect: (groupId: number) => void
}

export function Sidebar({ groups, activeGroup, onGroupSelect }: SidebarProps) {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r">
      <div className="flex flex-col gap-2 p-4">
        {groups.map((group) => (
          <Button
            key={group.id}
            variant="outline"
            className={cn("justify-start text-left font-medium", activeGroup === group.id && "bg-muted")}
            onClick={() => onGroupSelect(group.id)}
          >
            {group.name}
          </Button>
        ))}
      </div>
    </aside>
  )
}

