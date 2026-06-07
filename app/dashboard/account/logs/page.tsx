import { SiteHeader } from "@/components/site-header"
import { LogsView } from "./logs-view"

export default function LogsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-4xl space-y-8 p-6 md:p-8">
        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
          <h1 className="text-2xl font-semibold tracking-tight">登录日志</h1>
          <p className="mt-1 text-sm text-muted-foreground">查看账户的登录活动记录</p>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
          <LogsView />
        </div>
      </div>
    </div>
  )
}
