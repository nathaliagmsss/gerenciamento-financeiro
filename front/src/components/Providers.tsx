'use client'

import { ReactNode, useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactQueryProvider } from "@/components/react-query-provider"

export function Providers({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null // evitar mismatch

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
