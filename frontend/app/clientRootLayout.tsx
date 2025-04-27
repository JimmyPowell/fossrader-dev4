"use client"

import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { usePathname } from "next/navigation"

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // 根据路径调整最大宽度
  const maxWidthClass = pathname.startsWith("/project/") ? "max-w-full" : "max-w-7xl"

  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className={`mx-auto flex w-full ${maxWidthClass} flex-1 px-4`}>
              {isHomePage && <Sidebar />}
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
