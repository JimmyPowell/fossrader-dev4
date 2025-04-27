"use client"

import { Grid2X2, List, Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProjectCard from "./project-card"

// 示例项目数据
const projectsData = [
  {
    id: 1,
    title: "项目名称",
    owner: "项目所有者",
    source: "github",
    description: "一个非常简单的mcp server客户端，可以提供自动化的邮件转发服务",
    tags: ["html", "java", "docker"],
    likes: 20,
  },
  {
    id: 2,
    title: "React组件库",
    owner: "开发团队",
    source: "github",
    description: "一个现代化的React UI组件库，包含丰富的界面元素和主题定制功能",
    tags: ["react", "typescript", "css"],
    likes: 156,
  },
  {
    id: 3,
    title: "数据可视化工具",
    owner: "数据团队",
    source: "gitlab",
    description: "强大的数据可视化工具，支持多种图表类型和实时数据展示",
    tags: ["javascript", "d3", "svg"],
    likes: 89,
  },
  {
    id: 4,
    title: "API网关服务",
    owner: "后端团队",
    source: "github",
    description: "高性能的API网关，提供路由、认证、限流等功能",
    tags: ["go", "microservice", "docker"],
    likes: 112,
  },
  {
    id: 5,
    title: "移动端框架",
    owner: "移动开发者",
    source: "github",
    description: "跨平台移动应用开发框架，一次编写多端运行",
    tags: ["flutter", "dart", "mobile"],
    likes: 78,
  },
  {
    id: 6,
    title: "自动化测试平台",
    owner: "测试团队",
    source: "bitbucket",
    description: "端到端自动化测试平台，支持多浏览器测试和CI集成",
    tags: ["python", "selenium", "testing"],
    likes: 45,
  },
]

export default function ProjectList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

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

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
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
          {projectsData.map((project, index) => (
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
              {index < projectsData.length - 1 && <div className="h-px bg-gray-200"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
