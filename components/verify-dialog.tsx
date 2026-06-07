"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockIcon, Loading03Icon } from "@hugeicons/core-free-icons"

interface VerifyDialogProps {
  open: boolean
  onVerify: (password: string) => Promise<void>
  loading: boolean
  error: string
}

export function VerifyDialog({ open, onVerify, loading, error }: VerifyDialogProps) {
  const [password, setPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password) return
    setPassword("")
    await onVerify(password)
  }

  return (
    <Dialog open={open} modal>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <HugeiconsIcon icon={LockIcon} strokeWidth={2} className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-lg">验证身份</DialogTitle>
          <DialogDescription className="text-center">
            请输入密码以查看更多安全信息
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <Input
            type="password"
            placeholder="输入密码"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-center text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !password}>
            {loading && <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />}
            {loading ? "验证中…" : "验证身份"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
