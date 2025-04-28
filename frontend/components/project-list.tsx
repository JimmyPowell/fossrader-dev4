"use client"

import { Grid2X2, List, Search } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"

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

// 定义分页响应类型
interface PageResponse {
  content: Project[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // 当前页码，从0开始
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 后端API的基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export default function ProjectList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(0) // 当前页码，从0开始
  const [pageSize, setPageSize] = useState(10) // 每页显示数量
  const [totalPages, setTotalPages] = useState(0) // 总页数
  const [totalItems, setTotalItems] = useState(0) // 总项目数
  const [hasMore, setHasMore] = useState(true) // 是否还有更多数据
  const [initialLoad, setInitialLoad] = useState(true) // 是否为初始加载

  // 创建一个观察者引用，用于检测滚动位置
  const observer = useRef<IntersectionObserver | null>(null);
  
  // 创建一个引用，指向列表末尾的元素
  const lastProjectElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    // 如果已经有observer，先断开连接
    if (observer.current) observer.current.disconnect();
    
    // 创建新的observer
    observer.current = new IntersectionObserver(entries => {
      // 如果最后一个元素可见，且还有更多数据可加载
      if (entries[0].isIntersecting && hasMore) {
        // 加载下一页
        setCurrentPage(prevPage => prevPage + 1);
      }
    }, {
      rootMargin: '100px', // 提前100px触发加载
    });
    
    // 观察最后一个元素
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // 获取项目列表数据（带分页）
  useEffect(() => {
    const fetchProjects = async () => {
      // 如果没有更多数据或正在加载，不执行
      if (!hasMore && !initialLoad) return;
      
      setLoading(true)
      setError(null)
      try {
        // 使用分页API获取数据
        const response = await fetch(`${API_BASE_URL}/api/projects/paged?page=${currentPage}&size=${pageSize}&sort=id&direction=desc`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        // 根据后端返回的数据结构解析
        if (data.data && data.data.content) {
          // 如果是ApiResponse格式
          const pageData = data.data as PageResponse;
          
          if (initialLoad || currentPage === 0) {
            // 初始加载或重置，直接设置项目列表
            setProjects(pageData.content);
          } else {
            // 追加新数据到现有列表
            setProjects(prev => [...prev, ...pageData.content]);
          }
          
          setTotalPages(pageData.totalPages);
          setTotalItems(pageData.totalElements);
          
          // 检查是否还有更多页
          setHasMore(currentPage < pageData.totalPages - 1);
        } else if (Array.isArray(data)) {
          // 如果直接返回数组（兼容旧API）
          setProjects(data)
          setTotalPages(1)
          setTotalItems(data.length)
          setHasMore(false) // 没有分页信息，假设没有更多数据
        }
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
        setInitialLoad(false) // 初始加载完成
      }
    }

    fetchProjects()
  }, [currentPage, pageSize, initialLoad]) // 依赖项增加页码和每页数量，当它们变化时重新获取数据

  // 处理视图模式切换
  const handleViewModeChange = (mode: "grid" | "list") => {
    // 如果视图模式改变，重置数据和页码
    if (mode !== viewMode) {
      setViewMode(mode);
      setCurrentPage(0);
      setProjects([]);
      setInitialLoad(true);
    }
  };

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
              onClick={() => handleViewModeChange("grid")}
            >
              <Grid2X2 className="h-3.5 w-3.5" />
              <span className="sr-only">网格视图</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 rounded-none p-0 ${viewMode === "list" ? "bg-gray-100" : ""}`}
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-3.5 w-3.5" />
              <span className="sr-only">列表视图</span>
            </Button>
          </div>
        </div>
      </div>

      {initialLoad && loading ? (
        <div className="flex h-40 w-full items-center justify-center">
          <p className="text-gray-500">加载中...</p>
        </div>
      ) : error && projects.length === 0 ? (
        <div className="flex h-40 w-full items-center justify-center">
          <p className="text-red-500">加载失败: {error}</p>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {
                // 判断是否为最后一个元素
                const isLastElement = index === projects.length - 1;
                
                return (
                  <div 
                    key={project.id}
                    ref={isLastElement ? lastProjectElementRef : null}
                  >
                    <ProjectCard
                      id={project.id}
                      title={project.title}
                      owner={project.owner}
                      source={project.source}
                      description={project.description}
                      tags={project.tags}
                      likes={project.likes}
                      iconUrl={project.iconUrl}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-hidden rounded border border-gray-200">
              {projects.length === 0 ? (
                <div className="flex h-20 w-full items-center justify-center bg-white">
                  <p className="text-gray-500">暂无项目数据</p>
                </div>
              ) : (
                projects.map((project, index) => {
                  // 判断是否为最后一个元素
                  const isLastElement = index === projects.length - 1;
                  
                  return (
                    <div 
                      key={project.id} 
                      className="relative"
                      ref={isLastElement ? lastProjectElementRef : null}
                    >
                      <div className="absolute left-0 top-0 h-full w-0.5 bg-transparent transition-colors group-hover:bg-blue-500"></div>
                      <ProjectCard
                        id={project.id}
                        title={project.title}
                        owner={project.owner}
                        source={project.source}
                        description={project.description}
                        tags={project.tags}
                        likes={project.likes}
                        iconUrl={project.iconUrl}
                      />
                      {index < projects.length - 1 && <div className="h-px bg-gray-200"></div>}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* 加载更多提示 */}
          {loading && !initialLoad && (
            <div className="mt-4 flex justify-center">
              <p className="text-sm text-gray-500">加载更多项目...</p>
            </div>
          )}
          
          {/* 到底提示 */}
          {!hasMore && projects.length > 0 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              已加载全部项目，共 {totalItems} 条
            </div>
          )}
        </>
      )}
    </div>
  )
}
