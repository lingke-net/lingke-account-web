import { getProfile } from "@/lib/account-actions"
import { SiteHeader } from "@/components/site-header"
import { ProfileForm } from "./profile-form"

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-4xl space-y-8 p-6 md:p-8">
        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
          <h1 className="text-2xl font-semibold tracking-tight">你的信息</h1>
          <p className="mt-1 text-sm text-muted-foreground">查看和管理你的 Lingke OneAccount 个人资料</p>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
          <ProfileForm
            user={{
              id: profile.id,
              username: profile.username,
              name: profile.name,
              email: profile.email,
              phone: profile.phone,
            }}
          />
        </div>
      </div>
    </div>
  )
}
