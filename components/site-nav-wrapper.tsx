import { getLogtoContext } from "@logto/next/server-actions"
import { logtoConfig } from "@/lib/logto"
import { SiteNav } from "./site-nav"

export async function SiteNavWrapper() {
  let isAuthenticated = false
  let user: { name: string; email: string; avatar: string } | null = null

  try {
    const context = await getLogtoContext(logtoConfig)
    isAuthenticated = context.isAuthenticated
    if (context.isAuthenticated && context.claims) {
      user = {
        name: context.claims.name ?? context.claims.email ?? "User",
        email: context.claims.email ?? "",
        avatar: context.claims.picture ?? "",
      }
    }
  } catch {
    // Not authenticated or Logto unavailable
  }

  return <SiteNav isAuthenticated={isAuthenticated} user={user} />
}
