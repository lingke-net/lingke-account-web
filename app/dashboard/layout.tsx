import { getLogtoContext } from "@logto/next/server-actions"
import { redirect } from "next/navigation"
import { logtoConfig } from "@/lib/logto"
import { AuthProvider } from "@/lib/auth-context"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const context = await getLogtoContext(logtoConfig)

  if (!context.isAuthenticated) {
    redirect("/account/login")
  }

  const user = context.claims
    ? {
        sub: context.claims.sub ?? "",
        name: context.claims.name ?? context.claims.email ?? "User",
        email: context.claims.email ?? "",
        picture: context.claims.picture ?? "",
      }
    : null

  return <AuthProvider user={user}>{children}</AuthProvider>
}
