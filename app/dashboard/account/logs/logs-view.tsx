"use client"

import { useState, useEffect } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { HistoryIcon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons"
import { VerifyDialog } from "@/components/verify-dialog"
import { getUserSessions } from "@/lib/account-actions"
import { AccountApiError } from "@/lib/account-errors"
import { useVerification } from "@/lib/verification-context"

interface SessionRecord { id: string; userAgent?: string; lastActiveAt?: number; createdAt?: number; details?: { os?: string; browser?: string; device?: string; ip?: string } }

export function LogsView() {
  const { verified, verificationId, verify, minutesLeft, clear } = useVerification()
  const [sessions, setSessions] = useState<SessionRecord[]>([])
  const [fetching, setFetching] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState("")
  const [error, setError] = useState("")

  async function fetchSessions() {
    if (!verificationId) return
    setFetching(true)
    try {
      const data = await getUserSessions(verificationId)
      setSessions(Array.isArray(data) ? data : [])
    } catch (err) {
      if (err instanceof AccountApiError && err.status === 401) setError("权限不足。请退出重新登录以更新权限。")
      else setError((err as Error).message)
      clear()
    } finally { setFetching(false) }
  }

  useEffect(() => { if (verified) fetchSessions() }, [verified, verificationId])

  async function handleVerify(password: string) {
    setVerifyLoading(true); setVerifyError("")
    try { await verify(password) } catch (err) { setVerifyError((err as Error).message) }
    finally { setVerifyLoading(false) }
  }

  return (
    <>
      <VerifyDialog open={!verified} onVerify={handleVerify} loading={verifyLoading} error={verifyError} />

      <div className="mx-auto max-w-xl space-y-1">
        {verified && (
          <div className="mb-4 flex items-center justify-between rounded-lg bg-green-500/10 px-4 py-2.5 text-sm text-green-700 dark:text-green-400">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-4" />
              身份已验证 {minutesLeft() !== null && `（${minutesLeft()} 分钟后过期）`}
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">共 {fetching ? "—" : sessions.length} 条活动记录</p>
        </div>

        {error && <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}

        {fetching ? (
          <div className="space-y-4 pl-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative flex gap-5 pb-8 last:pb-0">
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border bg-card">
                  <div className="size-5 rounded-full bg-muted animate-pulse" />
                </div>
                <div className="flex-1 space-y-2 pt-2">
                  <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-48 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-56 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-xl border border-dashed py-16 text-center">
            <HugeiconsIcon icon={HistoryIcon} strokeWidth={2} className="mx-auto size-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">暂无登录记录</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-border" />
            {sessions.map((s, i) => (
              <div key={s.id} className="relative flex gap-5 pb-8 last:pb-0">
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border bg-card">
                  <HugeiconsIcon icon={HistoryIcon} strokeWidth={2} className="size-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1 pt-2">
                  <p className="text-sm font-medium">{s.details?.device ?? "未知设备"}</p>
                  <p className="text-xs text-muted-foreground">{[s.details?.os, s.details?.browser].filter(Boolean).join(" · ") || "未知系统"}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">IP {s.details?.ip ?? "未知"}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>创建于 {s.createdAt ? new Date(s.createdAt).toLocaleString("zh-CN") : "未知"}</span>
                    <span className="text-border">|</span>
                    <span>上次活跃 {s.lastActiveAt ? new Date(s.lastActiveAt).toLocaleString("zh-CN") : "未知"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
