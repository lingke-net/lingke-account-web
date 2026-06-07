"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { AppWindowIcon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons"
import { VerifyDialog } from "@/components/verify-dialog"
import { getUserGrants, revokeUserGrant } from "@/lib/account-actions"
import { AccountApiError } from "@/lib/account-errors"
import { useVerification } from "@/lib/verification-context"

interface Grant { id: string; applicationId?: string; applicationName?: string; applicationType?: string; scopes?: string[]; createdAt?: string }

export function AppsView() {
  const { verified, verificationId, verify, minutesLeft, clear } = useVerification()
  const [grants, setGrants] = useState<Grant[]>([])
  const [fetching, setFetching] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState("")
  const [error, setError] = useState("")

  async function fetchGrants() {
    if (!verificationId) return
    setFetching(true)
    try {
      const data = await getUserGrants(verificationId)
      setGrants(Array.isArray(data) ? data : [])
    } catch (err) {
      if (err instanceof AccountApiError && err.status === 401) setError("权限不足。请退出重新登录以更新权限。")
      else setError((err as Error).message)
      clear()
    } finally { setFetching(false) }
  }

  useEffect(() => { if (verified) fetchGrants() }, [verified, verificationId])

  async function handleVerify(password: string) {
    setVerifyLoading(true); setVerifyError("")
    try { await verify(password) } catch (err) { setVerifyError((err as Error).message) }
    finally { setVerifyLoading(false) }
  }

  async function handleRevoke(grantId: string) {
    if (!verificationId) return
    try { await revokeUserGrant(grantId, verificationId); setGrants((p) => p.filter((g) => g.id !== grantId)) }
    catch (err) { setError((err as Error).message) }
  }

  return (
    <>
      <VerifyDialog open={!verified} onVerify={handleVerify} loading={verifyLoading} error={verifyError} />

      <div className="mx-auto max-w-2xl space-y-4">
        {verified && (
          <div className="flex items-center justify-between rounded-lg bg-green-500/10 px-4 py-2.5 text-sm text-green-700 dark:text-green-400">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-4" />
              身份已验证 {minutesLeft() !== null && `（${minutesLeft()} 分钟后过期）`}
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground">共 {fetching ? "—" : grants.length} 个授权应用</p>
        {error && <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}

        {fetching ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border bg-card p-5">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-muted animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-28 rounded bg-muted animate-pulse" />
                    <div className="h-3 w-44 rounded bg-muted animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : grants.length === 0 ? (
          <div className="rounded-xl border border-dashed py-16 text-center">
            <HugeiconsIcon icon={AppWindowIcon} strokeWidth={2} className="mx-auto size-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">暂无已授权的应用</p>
          </div>
        ) : (
          grants.map((g, i) => (
            <div key={g.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start gap-4 rounded-xl border bg-card p-5 transition-all hover:shadow-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                  <HugeiconsIcon icon={AppWindowIcon} strokeWidth={2} className="size-5 text-primary/70" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{g.applicationName ?? "未知应用"}</p>
                    <Badge variant="outline" className="text-[10px]">{g.applicationType === "thirdParty" ? "第三方" : "第一方"}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">授权于 {g.createdAt ? new Date(g.createdAt).toLocaleString("zh-CN") : "未知时间"}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleRevoke(g.id)} className="shrink-0 text-destructive hover:text-destructive">撤销</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
