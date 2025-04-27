"use client"

import { Grid2X2, List, Mic, Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 示例项目数据
const projectsData = [
  { id: 1, name: "项目名称 1", description: "项目描述内容...", stars: 120, language: "JavaScript" },
  { id: 2, name: "项目名称 2", description: "项目描述内容...", stars: 85, language: "Python" },
  { id: 3, name: "项目名称 3", description: "项目描述内容...", stars: 230, language: "Rust" },
  { id: 4, name: "项目名称 4", description: "项目描述内容...", stars: 45, language: "Go" },
  { id: 5, name: "项目名称 5", description: "项目描述内容...", stars: 190, language: "TypeScript" },
  { id: 6, name: "项目名称 6", description: "项目描述内容...", stars: 75, language: "Java" },
]

export default function ProjectList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="h-full w-full overflow-auto">
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <h1 className="mb-6 text-xl font-medium">项目列表</h1>

        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input type="search" placeholder="搜索开源项目" className="h-10 pl-10 pr-10 text-sm" />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Mic className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`h-8 w-8 p-0 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
              <span className="sr-only">网格视图</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 w-8 p-0 ${viewMode === "list" ? "bg-gray-100" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">列表视图</span>
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="flex flex-col rounded border border-gray-200 bg-white transition-shadow hover:shadow-md"
              >
                <div className="p-4">
                  <h3 className="text-base font-medium">{project.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center text-xs text-gray-500">
                      <span className="mr-1 h-2 w-2 rounded-full bg-blue-500"></span>
                      {project.language}
                    </span>
                    <span className="text-xs text-gray-500">⭐ {project.stars}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded border border-gray-200">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className={`flex items-center justify-between bg-white p-4 transition-colors hover:bg-gray-50 ${
                  index !== projectsData.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div>
                  <h3 className="text-base font-medium">{project.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center text-xs text-gray-500">
                    <span className="mr-1 h-2 w-2 rounded-full bg-blue-500"></span>
                    {project.language}
                  </span>
                  <span className="text-xs text-gray-500">⭐ {project.stars}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
