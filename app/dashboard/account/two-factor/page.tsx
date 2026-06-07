import { getMfaVerifications, getMfaSettings } from "@/lib/account-actions"
import { SiteHeader } from "@/components/site-header"
import { MfaView } from "./mfa-view"

export default async function TwoFactorPage() {
  const [rawVerifications, settings] = await Promise.all([
    getMfaVerifications().catch(() => []),
    getMfaSettings().catch(() => ({ skipMfaOnSignIn: false })),
  ])
  const verifications = Array.isArray(rawVerifications) ? rawVerifications : []

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-4xl space-y-8 p-6 md:p-8">
        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
          <h1 className="text-2xl font-semibold tracking-tight">两步验证</h1>
          <p className="mt-1 text-sm text-muted-foreground">通过额外的验证层保护你的账户安全</p>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
          <MfaView verifications={verifications} settings={settings} />
        </div>
      </div>
    </div>
  )
}
