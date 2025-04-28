import { Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProjectCardProps {
  id: string | number
  title: string
  owner: string
  source: string
  description: string
  tags: string[]
  likes: number
  iconUrl?: string // 添加可选的iconUrl属性
}

export default function ProjectCard({ id, title, owner, source, description, tags, likes, iconUrl }: ProjectCardProps) {
  // 获取所有者名称的首字母作为头像
  const ownerInitial = owner.charAt(0).toUpperCase()

  return (
    <Link href={`/project/${id}`} className="group block">
      <div className="relative flex overflow-hidden bg-white transition-colors hover:bg-gray-50">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-transparent transition-colors group-hover:bg-blue-500"></div>

        {/* 项目图标 */}
        <div className="flex h-auto w-[70px] items-center justify-center py-2 pl-3 pr-1">
          {iconUrl ? (
            <div className="h-10 w-10 overflow-hidden rounded">
              <Image 
                src={iconUrl}
                alt={`${title} 图标`}
                width={40}
                height={40}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // 图片加载失败时显示默认图标
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // 防止无限循环
                  target.style.display = 'none'; // 隐藏失败的图片
                  // 由于我们不能在这里动态渲染SVG，父元素会回退到默认显示
                }}
              />
            </div>
          ) : (
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
          )}
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
            {/* 删除圆形"项"字占位符，直接显示作者名 */}
            <span className="text-[10px] text-gray-600">{owner}</span>
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
