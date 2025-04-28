"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, GitFork, Star } from 'lucide-react'
import { useState, useEffect } from "react"
import { useParams } from 'next/navigation' // 使用useParams获取路由参数
import Image from 'next/image';
import { Badge } from "@/components/ui/badge"

// 定义项目数据类型，与后端ProjectDetail模型匹配
interface Project {
  id: string;
  title: string;
  owner?: string; // 在ProjectDetail中可能不存在
  author?: string; // ProjectDetail中使用author代替owner
  source?: string; // 在ProjectDetail中可能不存在
  platform?: string; // ProjectDetail中使用platform代替source
  description: string;
  tags: string[];
  likes?: number; // 在ProjectDetail中可能不存在
  stars?: number; // ProjectDetail特有字段
  forks?: number;
  issues?: number;
  iconUrl?: string; // 项目图标URL
  imageUrls?: string[]; // 项目介绍图片URL列表
  screenshots?: string[]; // ProjectDetail中使用screenshots代替imageUrls
  keywords?: string[];
  detailedDescription?: string;
}

// 后端API的基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export default function ProjectDetailPage() {
  const params = useParams(); // 获取路由参数
  const id = params?.id as string; // 获取项目ID

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // 如果没有ID则不执行获取

    const fetchProjectDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/project-details/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("找不到该项目");
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const data: Project = await response.json();
        
        // 处理字段映射，确保数据结构一致性
        const processedProject: Project = {
          ...data,
          owner: data.author || data.owner, // 使用author作为owner备选
          source: data.platform || data.source, // 使用platform作为source备选
          likes: data.stars || data.likes || 0, // 使用stars作为likes备选
          imageUrls: data.screenshots || data.imageUrls // 使用screenshots作为imageUrls备选
        };
        
        console.log("获取到的项目数据:", processedProject);
        setProject(processedProject);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          console.error(`Failed to fetch project ${id}:`, e);
        } else {
          setError("An unknown error occurred");
          console.error(`Failed to fetch project ${id}:`, e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]); // 当ID变化时重新获取数据

  if (loading) {
    return <div className="flex h-full w-full items-center justify-center">加载中...</div>
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-red-500">
        <p>加载项目详情失败: {error}</p>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">返回列表</Link>
      </div>
    )
  }

  if (!project) {
    // 理论上在 error 或 loading 状态会处理，但作为保险
    return <div className="flex h-full w-full items-center justify-center">未找到项目数据</div>
  }

  // ---- 渲染项目详情 ----
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
            {/* 项目图标 - 使用项目的iconUrl */}
            <div className="mr-4 flex-shrink-0">
              {project.iconUrl ? (
                <Image 
                  src={project.iconUrl}
                  alt={`${project.title} 图标`}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded object-cover"
                  onError={(e) => {
                    // 图片加载失败时显示默认图标
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // 防止无限循环
                    target.src = "/placeholder-icon.svg"; // 默认图标
                  }}
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* 项目信息 */}
            <div className="flex-1">
              <h1 className="mb-1 text-lg font-medium text-gray-900">{project.title}</h1>
              <div className="flex items-center">
                {/* 所有者信息 - 无占位符 */}
                <span className="text-sm text-gray-600">{project.owner || project.author || '未知作者'}</span>
                <span className="ml-2 text-sm text-gray-500">from {project.source || project.platform || '未知来源'}</span>
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
                <span>{project.likes || project.stars || 0}</span>
              </div>
              {project.forks && (
                <div className="flex items-center text-sm text-gray-500">
                  <GitFork className="mr-1 h-4 w-4" />
                  <span>{project.forks}</span>
                </div>
              )}
            </div>

            {/* TODO: 访问官网链接需要从后端获取或配置 */}
            <a
              href="#" // 暂时用 #
              target="_blank" // 在新标签页打开
              rel="noopener noreferrer" // 安全性考虑
              className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
            >
              访问官网
              <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* 项目截图 */}
        {((project.imageUrls && project.imageUrls.length > 0) || (project.screenshots && project.screenshots.length > 0)) && (
          <div className="border-b border-gray-100 p-5">
            <h2 className="mb-3 text-base font-medium text-gray-800">项目截图</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {(project.imageUrls || project.screenshots || []).map((imageUrl, index) => (
                <div key={index} className="w-[45%] overflow-hidden rounded bg-gray-100">
                  {/* 使用 next/image 处理图片 */}
                  <Image
                    src={imageUrl || "/placeholder.svg"} // 提供备用图片
                    alt={`项目截图 ${index + 1}`}
                    width={320} // 设定宽度
                    height={120} // 设定高度
                    className="h-auto w-full object-cover" // 保持宽高比并覆盖
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 项目详情和标签 */}
        <div className="p-5">
          {/* 技术栈 */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-gray-700">技术栈</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* 详细描述 */}
          {project.detailedDescription && (
            <div className="mb-5">
              <h3 className="mb-2 text-sm font-medium text-gray-700">详细描述</h3>
              <p className="text-sm leading-relaxed text-gray-700">{project.detailedDescription}</p>
            </div>
          )}

          {/* 关键词 */}
          {project.keywords && project.keywords.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  )
}
