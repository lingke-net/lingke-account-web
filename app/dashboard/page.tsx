import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardOverview } from "./dashboard-overview"
import { getDashboardMetrics } from "@/lib/dashboard-data"

export default async function Page() {
  const metrics = await getDashboardMetrics()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <DashboardOverview metrics={metrics} />
      </SidebarInset>
    </SidebarProvider>
  )
}
