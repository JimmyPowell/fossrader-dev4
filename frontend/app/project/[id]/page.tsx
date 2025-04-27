import Link from "next/link"
import { ArrowLeft, ExternalLink, GitFork, Star } from 'lucide-react'

// 模拟项目数据
const getProjectById = (id: string) => {
  return {
    id,
    title: "项目名称",
    description: "一个非常简单的mcp server客户端，可以提供自动化的邮件转发服务",
    author: "项目所有者",
    platform: "Github",
    stars: 30000,
    forks: 30000,
    issues: 30000,
    tags: ["html", "java", "docker"],
    keywords: ["html", "java"],
    // 更宽更扁的截图
    screenshots: ["/placeholder.svg?height=120&width=320", "/placeholder.svg?height=120&width=320"],
    detailedDescription:
      "这是一个功能强大的开源项目，提供了许多实用功能。它具有简单易用的API、高性能的处理能力、完善的文档和示例，以及活跃的社区支持。适用于需要自动化邮件处理的各种应用场景，如通知系统、邮件归档等。",
  }
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id)

  return (
    <div className="mx-auto w-full max-w-3xl bg-gray-50 py-6">
      {/* 返回按钮 */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center rounded border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          返回列表
        </Link>
      </div>

      {/* 整个项目内容区域 */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* 项目基本信息 */}
        <div className="border-b border-gray-100 p-5">
          <div className="flex items-center">
            {/* 项目图片 */}
            <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded bg-gray-100">
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* 项目信息 */}
            <div className="flex-1">
              <h1 className="mb-1 text-lg font-medium text-gray-900">{project.title}</h1>
              <div className="flex items-center">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
                  {project.author.charAt(0).toUpperCase()}
                </div>
                <span className="ml-1.5 text-sm text-gray-600">{project.author}</span>
                <span className="ml-2 text-sm text-gray-500">所属平台: {project.platform}</span>
              </div>
            </div>
          </div>

          {/* 项目描述 */}
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{project.description}</p>

          {/* 项目统计和访问按钮 */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Star className="mr-1 h-4 w-4" />
                <span>{(project.stars / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <GitFork className="mr-1 h-4 w-4" />
                <span>{(project.forks / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1 text-sm">issues</span>
                <span>{(project.issues / 1000).toFixed(0)}k</span>
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
            >
              访问官网
              <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* 项目截图 - 更宽更扁的样式 */}
        <div className="border-b border-gray-100 p-5">
          <h2 className="mb-3 text-base font-medium text-gray-800">项目截图</h2>
          <div className="flex justify-center space-x-4">
            {project.screenshots.map((screenshot, index) => (
              <div key={index} className="w-[45%] overflow-hidden rounded bg-gray-100">
                <img src={screenshot || "/placeholder.svg"} alt={`项目截图 ${index + 1}`} className="h-auto w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* 项目详情和标签 */}
        <div className="p-5">
          {/* 详细描述标签 */}
          <div className="mb-4 border-b border-gray-200">
            <div className="flex">
              <div className="border-b-2 border-blue-500 px-4 py-2 text-sm font-medium text-blue-600">详细描述</div>
            </div>
          </div>

          {/* 详细描述内容 */}
          <div className="mb-5">
            <p className="text-sm leading-relaxed text-gray-700">{project.detailedDescription}</p>
          </div>

          {/* 技术栈 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-gray-700">技术栈</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="inline-flex rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 关键词 */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">关键词</h3>
            <div className="flex flex-wrap gap-2">
              {project.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
