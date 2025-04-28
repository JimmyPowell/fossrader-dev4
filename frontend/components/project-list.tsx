"use client"

import { Grid2X2, List, Search } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProjectCard from "./project-card"

// 定义项目数据类型
interface Project {
  id: string;
  title: string;
  owner: string;
  source: string;
  description: string;
  tags: string[];
  likes: number;
  iconUrl: string;
}

// 后端API的基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export default function ProjectList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 获取项目列表数据
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setProjects(data)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
          console.error("Failed to fetch projects:", e)
        } else {
          setError("获取项目列表失败")
          console.error("Failed to fetch projects:", e)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, []) // 空依赖数组表示只在组件挂载时执行一次

  return (
    <div className="w-full bg-gray-50 py-4 mt-4">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-base font-medium text-gray-800">项目列表</h1>

        <div className="flex items-center space-x-2">
          <div className="relative md:hidden">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <Input type="search" placeholder="搜索开源项目" className="h-7 w-[160px] pl-7 text-xs" />
          </div>

          <div className="flex items-center border border-gray-200 bg-white p-0.5">
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 rounded-none p-0 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-3.5 w-3.5" />
              <span className="sr-only">网格视图</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 rounded-none p-0 ${viewMode === "list" ? "bg-gray-100" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-3.5 w-3.5" />
              <span className="sr-only">列表视图</span>
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 w-full items-center justify-center">
          <p className="text-gray-500">加载中...</p>
        </div>
      ) : error ? (
        <div className="flex h-40 w-full items-center justify-center">
          <p className="text-red-500">加载失败: {error}</p>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  owner={project.owner}
                  source={project.source}
                  description={project.description}
                  tags={project.tags}
                  likes={project.likes}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded border border-gray-200">
              {projects.length === 0 ? (
                <div className="flex h-20 w-full items-center justify-center bg-white">
                  <p className="text-gray-500">暂无项目数据</p>
                </div>
              ) : (
                projects.map((project, index) => (
                  <div key={project.id} className="relative">
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-transparent transition-colors group-hover:bg-blue-500"></div>
                    <ProjectCard
                      id={project.id}
                      title={project.title}
                      owner={project.owner}
                      source={project.source}
                      description={project.description}
                      tags={project.tags}
                      likes={project.likes}
                    />
                    {index < projects.length - 1 && <div className="h-px bg-gray-200"></div>}
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
