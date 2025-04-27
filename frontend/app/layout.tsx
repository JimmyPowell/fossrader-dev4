import type React from "react"
import type { Metadata } from "next"
import { MetadataData } from "./metadata"
import ClientRootLayout from "./clientRootLayout"

// 由于使用了客户端组件，需要将元数据移到单独的文件中
export const metadata: Metadata = MetadataData

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}


import './globals.css'