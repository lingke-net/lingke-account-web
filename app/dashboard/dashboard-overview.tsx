"use client"

import { useAuthUser } from "@/lib/auth-context"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Shield01Icon,
  DeviceAccessIcon,
  Key01Icon,
  UserShield01Icon,
  HistoryIcon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  Alert02Icon,
  SmartPhone01Icon,
  AppWindowIcon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"

interface Metrics {
  profile: { id: string; name?: string; email?: string; phone?: string; username?: string } | null
  security: { hasMfa: boolean; mfaEnabled: boolean; mfaCount: number; hasPassword: boolean }
  deviceCount: number | null
}

const sections = [
  {
    title: "账户与安全",
    items: [
      { href: "/dashboard/account/profile", label: "你的信息", desc: "查看和管理你的个人资料", icon: Key01Icon },
      { href: "/dashboard/account/two-factor", label: "安全与隐私", desc: "管理密码、两步验证和安全设置", icon: Shield01Icon },
      { href: "/dashboard/account/logs", label: "登录活动", desc: "查看最近的登录记录", icon: HistoryIcon },
    ],
  },
  {
    title: "设备与应用",
    items: [
      { href: "/dashboard/account/devices", label: "你的设备", desc: "管理登录了你账户的设备", icon: SmartPhone01Icon },
      { href: "/dashboard/account/apps", label: "已授权的应用", desc: "查看有权访问你账户的应用", icon: AppWindowIcon },
    ],
  },
]

function StatusCard({
  label,
  value,
  sub,
  icon: Icon,
  href,
  status,
}: {
  label: string
  value: string
  sub?: string
  icon: any
  href: string
  status?: "good" | "warning"
}) {
  return (
    <Link
      href={href}
      className="group animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex size-10 items-center justify-center rounded-lg ${status === "warning" ? "bg-amber-500/10" : "bg-primary/5"}`}>
          <HugeiconsIcon icon={Icon} strokeWidth={2} className={`size-5 ${status === "warning" ? "text-amber-600 dark:text-amber-400" : "text-primary"}`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="truncate text-sm font-medium">{value}</p>
          {sub && <p className="truncate text-xs text-muted-foreground">{sub}</p>}
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs">
        {status === "warning" ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 font-medium text-amber-700 dark:text-amber-300">
            <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-3" />
            建议操作
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-primary">
            管理 <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </Link>
  )
}

export function DashboardOverview({ metrics }: { metrics: Metrics }) {
  const user = useAuthUser()
  const profile = metrics.profile
  const sec = metrics.security

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 p-6 md:p-8">
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {(user?.name ?? profile?.name ?? "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{user?.name ?? profile?.name ?? "用户"}</h1>
            <p className="text-sm text-muted-foreground">{user?.email ?? profile?.email ?? ""}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatusCard
          label="安全状态"
          value={sec.hasMfa && sec.mfaEnabled ? "良好" : "需要关注"}
          sub={sec.hasMfa && sec.mfaEnabled ? "两步验证已开启" : "建议开启两步验证"}
          icon={Shield01Icon}
          href="/dashboard/account/two-factor"
          status={sec.hasMfa && sec.mfaEnabled ? "good" : "warning"}
        />
        <StatusCard
          label="账户信息"
          value={user?.name ?? profile?.name ?? "—"}
          sub={user?.email ?? profile?.email ?? ""}
          icon={Key01Icon}
          href="/dashboard/account/profile"
        />
        <StatusCard
          label="已登录设备"
          value="需要验证后查看"
          sub="查看和管理活跃设备"
          icon={DeviceAccessIcon}
          href="/dashboard/account/devices"
        />
      </div>

      {sections.map((section) => (
        <div key={section.title} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">{section.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                  <HugeiconsIcon icon={item.icon} strokeWidth={2} className="size-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="mt-1 size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
