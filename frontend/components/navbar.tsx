"use client"
import Link from "next/link"
import { Search } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 w-full border-b border-blue-700 bg-blue-600">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 text-sm font-medium text-white">
            fossrader 开源项目解决
          </Link>

          <nav className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/"
              className={`text-xs font-medium ${pathname === "/" ? "text-white" : "text-blue-100 hover:text-white"}`}
            >
              首页
            </Link>
            <Link
              href="/about"
              className={`text-xs font-medium ${
                pathname === "/about" ? "text-white" : "text-blue-100 hover:text-white"
              }`}
            >
              关于
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative hidden w-56 md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Search className="h-3.5 w-3.5 text-blue-200" />
            </div>
            <input
              type="search"
              placeholder="搜索"
              className="h-7 w-full rounded-sm border-0 bg-blue-700/50 pl-7 text-xs text-white placeholder:text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <Link
            href="/login"
            className="rounded-sm border border-blue-400 px-2 py-0.5 text-xs font-medium text-white hover:bg-blue-700"
          >
            登录
          </Link>
        </div>
      </div>
    </header>
  )
}
