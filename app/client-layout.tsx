"use client"

import type React from "react"
import { Suspense } from "react"

function SearchParamsWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // useSearchParams is now safely wrapped in Suspense boundary
  return <>{children}</>
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper>{children}</SearchParamsWrapper>
    </Suspense>
  )
}
