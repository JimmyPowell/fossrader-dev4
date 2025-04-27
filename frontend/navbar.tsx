"use client"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-blue-600">
      <div className="mx-auto flex h-12 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-medium text-white">
          fossrader 开源项目解决
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-white hover:text-blue-100">
            首页
          </Link>
          <Link href="/about" className="text-sm font-medium text-white hover:text-blue-100">
            关于
          </Link>
        </nav>
      </div>
    </header>
  )
}
