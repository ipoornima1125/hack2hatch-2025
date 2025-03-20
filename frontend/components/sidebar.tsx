"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home } from "lucide-react"

interface SidebarProps {
  groups: { id: number; name: string; color: string }[]
  activeGroup: number | null
  onGroupSelect: (groupId: number) => void
}

export function Sidebar({ groups, activeGroup, onGroupSelect }: SidebarProps) {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r bg-white shadow-sm">
      <div className="p-4 border-b">
        <h1 className="text-xl font-medium text-gray-800">Conversations</h1>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-medium transition-all",
            activeGroup === null 
              ? "bg-blue-50 text-blue-700 border-blue-200" 
              : "hover:bg-gray-100"
          )}
          onClick={() => {
            // Custom logic to handle returning to feed
            window.dispatchEvent(new CustomEvent('returnToFeed'))
          }}
        >
          <Home className="h-4 w-4 mr-2 text-blue-600" />
          Home Feed
        </Button>
        
        <div className="text-xs font-medium text-gray-500 mt-2 mb-1 px-2">DIRECT MESSAGES</div>
        
        {groups.map((group) => (
          <Button
            key={group.id}
            variant="outline"
            className={cn(
              "justify-start text-left font-medium border-transparent transition-all",
              activeGroup === group.id 
                ? "bg-gray-100" 
                : "hover:bg-gray-50"
            )}
            onClick={() => onGroupSelect(group.id)}
          >
            <div className="flex items-center w-full">
              <div 
                className="w-8 h-8 rounded-full mr-2 flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: group.color }}
              >
                {group.name.charAt(0)}
              </div>
              <span>{group.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </aside>
  )
}

