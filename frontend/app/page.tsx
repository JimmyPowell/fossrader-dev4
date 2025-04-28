"use client"
import ProjectList from "@/components/project-list"
import { useEffect, useState } from "react"

// 后端API的基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export default function Home() {
  // 新增：项目总数状态
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [countLoading, setCountLoading] = useState(true);
  const [countError, setCountError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      setCountLoading(true);
      setCountError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects/count`);
        if (!res.ok) throw new Error('获取项目总数失败');
        const data = await res.json();
        // 兼容ApiResponse格式
        if (data.data && typeof data.data.count === 'number') {
          setProjectCount(data.data.count);
        } else if (typeof data.count === 'number') {
          setProjectCount(data.count);
        } else {
          setProjectCount(null);
        }
      } catch (e) {
        setCountError('获取项目总数失败');
      } finally {
        setCountLoading(false);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="flex w-full max-w-7xl mx-auto">
      {/* 主体项目列表 */}
      <div className="flex-1">
        <ProjectList />
      </div>
      {/* 右侧卡片区域 */}
      <div className="ml-6 mt-4 w-64 flex-shrink-0">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-5">
          <div className="text-sm text-gray-500 mb-2">系统项目总数</div>
          {countLoading ? (
            <div className="text-lg text-gray-400">加载中...</div>
          ) : countError ? (
            <div className="text-red-500 text-sm">{countError}</div>
          ) : (
            <div className="text-3xl font-bold text-blue-600">{projectCount}</div>
          )}
        </div>
      </div>
    </div>
  )
}
