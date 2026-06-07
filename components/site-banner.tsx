"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Alert02Icon, Cancel01Icon } from "@hugeicons/core-free-icons"

export function SiteBanner() {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) return null

  return (
    <div
      role="alert"
      className="flex items-center justify-center gap-3 border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800"
    >
      <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4" />
      <span>One Account 处于内部状态</span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="ml-2 inline-flex items-center rounded p-1 hover:bg-amber-100/50"
        aria-label="关闭横幅"
      >
        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3.5" />
      </button>
    </div>
  )
}
