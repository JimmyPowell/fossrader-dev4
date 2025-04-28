"use client"

import { Grid2X2, List, Mic, Search } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image';

// 定义项目数据类型，与后端模型匹配
interface Project {
  id: string;
  title: string;
  owner: string;
  source: string;
  description: string;
  tags: string[];
  likes: number;
  iconUrl?: string; // 项目图标URL
  ownerAvatarUrl?: string; // 项目所有者头像URL
}

// 后端API的基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export default function ProjectList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          console.error("Failed to fetch projects:", e);
        } else {
          setError("An unknown error occurred");
          console.error("Failed to fetch projects:", e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="flex h-full w-full items-center justify-center">加载中...</div>
  }

  if (error) {
    return <div className="flex h-full w-full items-center justify-center text-red-500">加载项目失败: {error}</div>
  }

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
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col rounded border border-gray-200 bg-white transition-shadow hover:shadow-md"
              >
                {/* 显示项目图标 */}
                {project.iconUrl ? (
                  <Image src={project.iconUrl} alt={`${project.title} icon`} width={64} height={64} className="h-16 w-16 rounded-full p-2" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 m-2">
                    <span className="text-gray-400">无图</span>
                  </div>
                )}
                <div className="p-4 pt-0">
                  <h3 className="text-base font-medium">{project.title}</h3>
                  {/* 显示所有者和头像 */}
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    {project.ownerAvatarUrl ? (
                       <Image src={project.ownerAvatarUrl} alt={`${project.owner} avatar`} width={20} height={20} className="h-5 w-5 rounded-full" />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-gray-300"></div>
                    )}
                    <span>{project.owner}</span>
                    <span>from {project.source}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                  {/* 显示标签 */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tags?.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    <span className="text-xs text-gray-500">⭐ {project.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded border border-gray-200">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex items-center justify-between bg-white p-4 transition-colors hover:bg-gray-50 ${
                  index !== projects.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* 显示项目图标 */}
                  {project.iconUrl ? (
                    <Image src={project.iconUrl} alt={`${project.title} icon`} width={40} height={40} className="h-10 w-10 rounded-full" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-xs text-gray-400">无图</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-medium">{project.title}</h3>
                    {/* 显示所有者和头像 */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      {project.ownerAvatarUrl ? (
                        <Image src={project.ownerAvatarUrl} alt={`${project.owner} avatar`} width={16} height={16} className="h-4 w-4 rounded-full" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-gray-300"></div>
                      )}
                      <span>{project.owner}</span>
                      <span>from {project.source}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center space-x-4">
                  {/* 显示标签 */}
                  <div className="hidden sm:flex flex-wrap gap-1">
                    {project.tags?.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">⭐ {project.likes}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
