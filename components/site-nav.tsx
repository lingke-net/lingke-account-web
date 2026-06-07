"use client"

import * as React from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon, Cancel01Icon, ArrowRightToLineIcon, Logout01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { signOutWithLingke } from "@/app/actions/auth"

const navLinks = [
  { href: "/", label: "首页" },
  { href: "https://support.lingke.ink/%E9%9A%90%E7%A7%81%E5%8D%8F%E8%AE%AE", label: "隐私协议" },
  { href: "https://support.lingke.ink/%E4%BA%A7%E5%93%81%E4%BD%BF%E7%94%A8%E6%9D%A1%E6%AC%BE", label: "产品使用条款" },
]

interface SiteNavProps {
  isAuthenticated: boolean
  user: { name: string; email: string; avatar: string } | null
}

export function SiteNav({ isAuthenticated, user }: SiteNavProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2" aria-label="首页">
              <svg viewBox="0 0 171.653 146" width="28.22" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M73.0904 62.8548L73.0904 39.6849C73.0904 36.8485 74.8328 34.304 77.4769 33.2795L162.097 0.471037C166.592 -1.27162 171.437 2.03602 171.451 6.85661L171.487 19.4666C171.487 22.2977 169.766 24.844 167.13 25.8799L73.0904 62.8548ZM26.3599 20.3141C26.3599 9.05354 34.9706 2.42976 44.2442 2.42976C53.5178 2.42976 62.7906 10.3783 62.7906 20.3141C62.7906 30.2499 54.1799 38.8605 44.2442 38.8605C34.3085 38.8605 26.3599 31.5749 26.3599 20.3141ZM73.0904 62.8548L73.0904 90.2017L4.46258 64.5242C1.77865 63.5204 0 60.9553 0 58.0896L0 44.9525C0 40.1392 4.82102 36.8184 9.31803 38.5334L73.0904 62.8548ZM150.337 61.1743L162.351 56.6255C166.845 54.9243 171.653 58.2451 171.653 63.0506L171.653 123.884L171.511 139.188C171.467 143.886 166.826 147.155 162.388 145.615L73.4168 114.733L73.0904 90.2017L145.899 114.733L145.899 67.5994C145.899 64.7432 147.666 62.1859 150.337 61.1743ZM17.4942 118.32L17.4942 105.078C17.4942 100.358 22.1434 97.0442 26.6046 98.5831L73.4168 114.733L73.2029 132.682C73.1471 137.355 68.5442 140.609 64.1208 139.104L22.1512 124.823C19.3671 123.876 17.4942 121.261 17.4942 118.32Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
              <span className="bg-gradient-to-r from-stone-950 to-neutral-950 bg-clip-text text-xl font-bold text-transparent dark:from-stone-100 dark:to-neutral-100">
                One Account
              </span>
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full p-0.5 pr-3 text-sm transition-colors hover:bg-muted"
                  >
                    <Avatar className="size-7 rounded-full">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-full text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-48 rounded-lg">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOutWithLingke()}>
                    <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90">
                <Link href="/dashboard">
                  开始
                  <HugeiconsIcon icon={ArrowRightToLineIcon} strokeWidth={2} className="size-4" />
                </Link>
              </Button>
            )}
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
          >
            <HugeiconsIcon
              icon={mobileOpen ? Cancel01Icon : Menu01Icon}
              strokeWidth={2}
              className="size-5"
            />
          </button>
        </nav>
      </div>
      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90">
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  {isAuthenticated ? "控制台" : "开始"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
