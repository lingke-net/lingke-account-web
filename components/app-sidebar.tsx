"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavAccount } from "@/components/nav-account"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CommandIcon,
  DashboardSquare01Icon,
  UserEdit01Icon,
  DeviceAccessIcon,
  AuthorizedIcon,
  ShieldKeyIcon,
  HistoryIcon,
  HelpCircleIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"
import { FeedbackDialog } from "@/components/feedback-dialog"

const overviewItems = [
  {
    title: "仪表盘",
    url: "/dashboard",
    icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
  },
]

const accountItems = [
  {
    title: "用户基本信息",
    url: "/dashboard/account/profile",
    icon: <HugeiconsIcon icon={UserEdit01Icon} strokeWidth={2} />,
  },
  {
    title: "登陆设备管理",
    url: "/dashboard/account/devices",
    icon: <HugeiconsIcon icon={DeviceAccessIcon} strokeWidth={2} />,
  },
  {
    title: "已授权的应用",
    url: "/dashboard/account/apps",
    icon: <HugeiconsIcon icon={AuthorizedIcon} strokeWidth={2} />,
  },
  {
    title: "两步验证",
    url: "/dashboard/account/two-factor",
    icon: <HugeiconsIcon icon={ShieldKeyIcon} strokeWidth={2} />,
  },
  {
    title: "登录日志",
    url: "/dashboard/account/logs",
    icon: <HugeiconsIcon icon={HistoryIcon} strokeWidth={2} />,
  },
]

const helpItems = [
  {
    title: "帮助中心",
    url: "https://support.lingke.ink",
    icon: <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  const secondaryItems = [
    {
      title: "反馈",
      icon: <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />,
      onClick: () => setFeedbackOpen(true),
    },
    ...helpItems,
  ]

  return (
    <>
      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
                <a href="/">
                  <HugeiconsIcon icon={CommandIcon} strokeWidth={2} className="size-5!" />
                  <span className="text-base font-semibold">Lingke OneAccount</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavAccount items={overviewItems} groupLabel="概览" />
          <NavAccount items={accountItems} groupLabel="账户管理" />
          <NavSecondary items={secondaryItems} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
