"use client"

import { Clock } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="mr-4 mt-4 w-[180px] rounded border border-gray-200 bg-white">
      <div className="px-2 py-3">
        <h3 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">分类</h3>
        <nav className="mb-2">
          <button className="flex w-full items-center px-2 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded">
            <span className="mr-2 text-gray-500">
              <Clock className="h-3.5 w-3.5" />
            </span>
            最新
          </button>
        </nav>
        {/* 添加一些空白元素使分类栏看起来更长 */}
        <div className="mt-4 space-y-2 px-2">
          <div className="h-6 w-full rounded bg-gray-100"></div>
          <div className="h-6 w-full rounded bg-gray-100"></div>
          <div className="h-6 w-full rounded bg-gray-100"></div>
          <div className="h-6 w-full rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  )
}
