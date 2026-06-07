"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { ShieldKeyIcon, CheckmarkCircle01Icon, HistoryIcon } from "@hugeicons/core-free-icons"
import { VerifyDialog } from "@/components/verify-dialog"
import { deleteMfaVerification, updateUserMfaSettings, generateBackupCodes } from "@/lib/account-actions"
import { useVerification } from "@/lib/verification-context"

interface MfaVerification { id: string; type: string; name?: string; agent?: string; createdAt?: string }
const mfaLabels: Record<string, string> = { WebAuthn: "Passkey", Totp: "TOTP 验证器", BackupCode: "备份码" }

export function MfaView({ verifications: initial, settings }: { verifications: MfaVerification[]; settings: { skipMfaOnSignIn: boolean } }) {
  const { verified, verificationId, verify, minutesLeft } = useVerification()
  const [verifications, setVerifications] = useState(initial)
  const [skipMfa, setSkipMfa] = useState(settings.skipMfaOnSignIn)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  async function handleVerify(password: string) {
    setVerifyLoading(true); setVerifyError("")
    try { await verify(password); setMessage("验证成功，有效期 10 分钟") }
    catch (err) { setVerifyError((err as Error).message) }
    finally { setVerifyLoading(false) }
  }

  async function handleDelete(id: string) {
    if (!verificationId) { setError("请先验证密码"); return }
    try { await deleteMfaVerification(id, verificationId); setVerifications((p) => p.filter((v) => v.id !== id)); setMessage("已移除") }
    catch (err) { setError((err as Error).message) }
  }

  async function handleToggleMfa() {
    if (!verificationId) { setError("请先验证密码"); return }
    try { await updateUserMfaSettings(!skipMfa, verificationId); setSkipMfa(!skipMfa); setMessage(skipMfa ? "两步验证已开启" : "已关闭") }
    catch (err) { setError((err as Error).message) }
  }

  async function handleGenerateCodes() {
    if (!verificationId) { setError("请先验证密码"); return }
    try { const r = await generateBackupCodes(verificationId); setMessage(`已生成 ${r.codes?.length ?? 0} 个备份码`) }
    catch (err) { setError((err as Error).message) }
  }

  return (
    <>
      <VerifyDialog open={!verified} onVerify={handleVerify} loading={verifyLoading} error={verifyError} />

      <div className="space-y-6">
        {verified && (
          <div className="flex items-center justify-between rounded-lg bg-green-500/10 px-4 py-2.5 text-sm text-green-700 dark:text-green-400">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-4" />
              身份已验证 {minutesLeft() !== null && `（${minutesLeft()} 分钟后过期）`}
            </div>
          </div>
        )}

        {error && <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
        {message && (
          <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-4" />
            {message}
          </div>
        )}

        <section className="rounded-xl border bg-card">
          <div className="border-b px-6 py-4">
            <h2 className="text-base font-medium">已验证的登录方式</h2>
            <p className="text-xs text-muted-foreground">管理可用于验证身份的方式</p>
          </div>
          {verifications.length === 0 ? (
            <div className="p-6 text-center">
              <HugeiconsIcon icon={ShieldKeyIcon} strokeWidth={2} className="mx-auto size-8 text-muted-foreground/40" />
              <p className="mt-2 text-sm text-muted-foreground">尚未添加任何验证方式</p>
            </div>
          ) : (
            <div className="divide-y">
              {verifications.map((v) => (
                <div key={v.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-md bg-primary/5">
                      <HugeiconsIcon icon={ShieldKeyIcon} strokeWidth={2} className="size-4 text-primary/70" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{mfaLabels[v.type] ?? v.type}</p>
                      {(v.name || v.agent) && <p className="text-xs text-muted-foreground">{v.name ?? v.agent}</p>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(v.id)} disabled={!verified} className="text-destructive hover:text-destructive">移除</Button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card">
          <div className="border-b px-6 py-4">
            <h2 className="text-base font-medium">两步验证设置</h2>
            <p className="text-xs text-muted-foreground">登录时需要额外的安全验证</p>
          </div>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <Badge variant={skipMfa ? "secondary" : "default"} className="text-xs">{skipMfa ? "已关闭" : "已启用"}</Badge>
              <span className="text-sm text-muted-foreground">{skipMfa ? "登录时不会提示两步验证" : "登录时需要进行两步验证"}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleToggleMfa} disabled={!verified}>
              {skipMfa ? "开启" : "关闭"}
            </Button>
          </div>
        </section>

        <section className="rounded-xl border bg-card">
          <div className="border-b px-6 py-4">
            <h2 className="text-base font-medium">备份码</h2>
            <p className="text-xs text-muted-foreground">在无法使用验证器时使用备份码登录</p>
          </div>
          <div className="p-6">
            <Button variant="outline" onClick={handleGenerateCodes} disabled={!verified}>
              <HugeiconsIcon icon={HistoryIcon} strokeWidth={2} className="size-4" />
              生成新备份码
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
