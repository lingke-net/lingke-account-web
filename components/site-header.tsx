"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const pathMap: Record<string, string> = {
  "/dashboard": "仪表盘",
  "/dashboard/account": "账户管理",
  "/dashboard/account/profile": "用户基本信息",
  "/dashboard/account/devices": "登陆设备管理",
  "/dashboard/account/apps": "已授权的应用",
  "/dashboard/account/two-factor": "两步验证",
  "/dashboard/account/logs": "登录日志",
}

export function SiteHeader() {
  const pathname = usePathname()

  const segments = pathname.split("/").filter(Boolean)
  const crumbs: { label: string; href: string }[] = []

  let cumulative = ""
  for (const segment of segments) {
    cumulative += `/${segment}`
    const label = pathMap[cumulative] ?? segment
    crumbs.push({ label, href: cumulative })
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.flatMap((crumb, i) => {
              const elements = [
                <BreadcrumbItem key={crumb.href}>
                  {i < crumbs.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>,
              ]
              if (i < crumbs.length - 1) {
                elements.push(<BreadcrumbSeparator key={`sep-${crumb.href}`} />)
              }
              return elements
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
