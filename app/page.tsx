import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { BoltIcon, Layout01Icon, Database01Icon, ServerStackIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { SiteNavWrapper } from "@/components/site-nav-wrapper"
import { FeatureCard } from "@/components/feature-card"

const features = [
  {
    icon: <HugeiconsIcon icon={BoltIcon} strokeWidth={2} className="size-5" />,
    title: "技术驱动",
    description: "使用电子技术实现快速迭代",
  },
  {
    icon: <HugeiconsIcon icon={Layout01Icon} strokeWidth={2} className="size-5" />,
    title: "Shadcn UI",
    description: "使用 Shadcn UI 组件库，实现美观且可访问的用户界面",
  },
  {
    icon: <HugeiconsIcon icon={Database01Icon} strokeWidth={2} className="size-5" />,
    title: "高性能",
    description: "使用 HonoJS 框架，实现高效稳定的后端服务",
  },
  {
    icon: <HugeiconsIcon icon={ServerStackIcon} strokeWidth={2} className="size-5" />,
    title: "Ollen Core 集成",
    description: "使用 Ollen Core 进行开发实现高扩展性和高可靠性",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteNavWrapper />
      <main className="flex-1" role="main" aria-label="Landing page content">
        <section className="w-full border-b border-border bg-gradient-to-b from-background to-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex gap-2">
                <svg viewBox="0 0 171.653 146" width="117.57" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M73.0904 62.8548L73.0904 39.6849C73.0904 36.8485 74.8328 34.304 77.4769 33.2795L162.097 0.471037C166.592 -1.27162 171.437 2.03602 171.451 6.85661L171.487 19.4666C171.487 22.2977 169.766 24.844 167.13 25.8799L73.0904 62.8548ZM26.3599 20.3141C26.3599 9.05354 34.9706 2.42976 44.2442 2.42976C53.5178 2.42976 62.7906 10.3783 62.7906 20.3141C62.7906 30.2499 54.1799 38.8605 44.2442 38.8605C34.3085 38.8605 26.3599 31.5749 26.3599 20.3141ZM73.0904 62.8548L73.0904 90.2017L4.46258 64.5242C1.77865 63.5204 0 60.9553 0 58.0896L0 44.9525C0 40.1392 4.82102 36.8184 9.31803 38.5334L73.0904 62.8548ZM150.337 61.1743L162.351 56.6255C166.845 54.9243 171.653 58.2451 171.653 63.0506L171.653 123.884L171.511 139.188C171.467 143.886 166.826 147.155 162.388 145.615L73.4168 114.733L73.0904 90.2017L145.899 114.733L145.899 67.5994C145.899 64.7432 147.666 62.1859 150.337 61.1743ZM17.4942 118.32L17.4942 105.078C17.4942 100.358 22.1434 97.0442 26.6046 98.5831L73.4168 114.733L73.2029 132.682C73.1471 137.355 68.5442 140.609 64.1208 139.104L22.1512 124.823C19.3671 123.876 17.4942 121.261 17.4942 118.32Z"
                    className="fill-foreground"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
                全新账户
              </h1>
              <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
                只需一个 One Account 账户，即可访问 Lingke 所有服务。
              </p>
              <div className="flex flex-col gap-4 md:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-background transition hover:bg-foreground/90"
                >
                  管理您的 Lingke 账户
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold text-foreground md:text-3xl">
              One Account 功能
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
