"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle01Icon, Key01Icon, Mail01Icon, SmartPhone01Icon, UserIcon } from "@hugeicons/core-free-icons"
import { updateProfile } from "@/lib/account-actions"

export function ProfileForm({ user }: { user: { id: string; username?: string; name?: string; email?: string; phone?: string } }) {
  const [name, setName] = useState(user.name ?? "")
  const [username, setUsername] = useState(user.username ?? "")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSave() {
    setSaving(true)
    setMessage("")
    try {
      await updateProfile({ name, username })
      setMessage("已保存")
    } catch (err) {
      setMessage((err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-card">
        <div className="border-b px-6 py-4">
          <h2 className="text-base font-medium">账户信息</h2>
        </div>
        <div className="divide-y">
          <InfoRow icon={Key01Icon} label="用户 ID" value={user.id} />
          <InfoRow icon={Mail01Icon} label="邮箱地址" value={user.email ?? "—"}>
            <Badge variant="secondary" className="text-xs">已验证</Badge>
          </InfoRow>
          <InfoRow icon={SmartPhone01Icon} label="手机号码" value={user.phone ?? "未设置"} />
        </div>
      </section>

      <section className="rounded-xl border bg-card">
        <div className="border-b px-6 py-4">
          <h2 className="text-base font-medium">个人资料</h2>
        </div>
        <div className="space-y-5 p-6">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">用户名</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="输入用户名" className="max-w-md" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">显示名称</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="输入显示名称" className="max-w-md" />
          </div>
          {message && (
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              message === "已保存"
                ? "bg-green-500/10 text-green-700 dark:text-green-400"
                : "bg-destructive/10 text-destructive"
            }`}>
              {message === "已保存" && <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-4" />}
              {message}
            </div>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "保存中…" : "保存更改"}
          </Button>
        </div>
      </section>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, children }: { icon: any; label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary/5">
          <HugeiconsIcon icon={Icon} strokeWidth={2} className="size-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
