"use client"

import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[200px]",
        className,
      )}
    >
      <div className="flex flex-1 flex-col overflow-y-auto p-3">
        <div className="mb-4 flex items-center justify-between">
          <h3 className={cn("text-sm font-medium", isCollapsed && "sr-only")}>分类</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="space-y-1">
          <Button variant="ghost" className={cn("w-full justify-start text-blue-600", isCollapsed ? "px-2" : "px-3")}>
            <Clock className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2 text-sm">最新</span>}
          </Button>
        </nav>
      </div>
    </div>
  )
}
