import { getProfile, getMfaVerifications, getMfaSettings } from "@/lib/account-actions"
import { getLogtoContext } from "@logto/next/server-actions"
import { logtoConfig } from "./logto"

export async function getDashboardMetrics() {
  const [profile, mfaVerifications, mfaSettings] = await Promise.all([
    getProfile().catch(() => null),
    getMfaVerifications().catch(() => []),
    getMfaSettings().catch(() => ({ skipMfaOnSignIn: false })),
  ])

  const mfaList = Array.isArray(mfaVerifications) ? mfaVerifications : []
  const hasMfa = mfaList.length > 0
  const mfaEnabled = !mfaSettings.skipMfaOnSignIn

  let sessionCount = null
  try {
    const context = await getLogtoContext(logtoConfig)
    if (context.isAuthenticated && context.claims) {
      // sessions require verification, skip for overview
    }
  } catch {}

  return {
    profile: profile ? {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      username: profile.username,
    } : null,
    security: {
      hasMfa,
      mfaEnabled,
      mfaCount: mfaList.length,
      hasPassword: true,
    },
    deviceCount: sessionCount,
  }
}
