import { Heart } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  id: string | number
  title: string
  owner: string
  source: string
  description: string
  tags: string[]
  likes: number
}

export default function ProjectCard({ id, title, owner, source, description, tags, likes }: ProjectCardProps) {
  // 获取所有者名称的首字母作为头像
  const ownerInitial = owner.charAt(0).toUpperCase()

  return (
    <Link href={`/project/${id}`} className="group block">
      <div className="relative flex overflow-hidden bg-white transition-colors hover:bg-gray-50">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-transparent transition-colors group-hover:bg-blue-500"></div>

        {/* 左侧图片区域 - 调整了内边距，使图片不充满整个区域 */}
        <div className="flex h-auto w-[70px] items-center justify-center py-2 pl-3 pr-1">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

        {/* 右侧内容区域 */}
        <div className="flex flex-1 flex-col py-2 pr-3 pl-1">
          {/* 标题和所有者信息 */}
          <div className="mb-0.5 flex items-center justify-between">
            <h3 className="text-sm font-medium leading-tight text-gray-900">{title}</h3>
            <div className="flex items-center text-gray-500">
              <Heart className="mr-0.5 h-3 w-3" />
              <span className="text-xs">{likes}</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-200 text-[8px] font-medium">
              {ownerInitial}
            </div>
            <span className="ml-1 text-[10px] text-gray-600">{owner}</span>
            <span className="ml-1 text-[10px] text-gray-400">from {source}</span>
          </div>

          {/* 项目描述 */}
          <p className="mt-1 mb-1.5 line-clamp-2 text-[11px] leading-tight text-gray-600">{description}</p>

          {/* 底部标签 */}
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex bg-gray-100 px-1 py-0.5 text-[9px] font-medium text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
