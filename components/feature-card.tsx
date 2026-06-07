import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  compact?: boolean
}

export function FeatureCard({ icon, title, description, compact }: FeatureCardProps) {
  if (compact) {
    return (
      <div className="rounded-lg border border-border bg-card p-4" role="listitem">
        <div className="mb-2 flex items-center gap-2">
          <div className="inline-flex text-foreground">{icon}</div>
          <h4 className="font-medium text-foreground">{title}</h4>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 inline-flex rounded-lg bg-muted p-3 text-foreground">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
