"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Key01Icon } from "@hugeicons/core-free-icons"
import { signInWithLingke } from "./actions"
import Lightfall from "@/components/lightfall"

const LIGHTFALL_COLORS = ['#A6C8FF', '#276bff', '#9fcaff']

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <HugeiconsIcon icon={Key01Icon} strokeWidth={2} className="size-4" />
            </div>
            Lingke OneAccount
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm text-center">
            <div className="mb-6 flex justify-center">
              <svg viewBox="0 0 171.653 146" width="85" height="72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M73.0904 62.8548L73.0904 39.6849C73.0904 36.8485 74.8328 34.304 77.4769 33.2795L162.097 0.471037C166.592 -1.27162 171.437 2.03602 171.451 6.85661L171.487 19.4666C171.487 22.2977 169.766 24.844 167.13 25.8799L73.0904 62.8548ZM26.3599 20.3141C26.3599 9.05354 34.9706 2.42976 44.2442 2.42976C53.5178 2.42976 62.7906 10.3783 62.7906 20.3141C62.7906 30.2499 54.1799 38.8605 44.2442 38.8605C34.3085 38.8605 26.3599 31.5749 26.3599 20.3141ZM73.0904 62.8548L73.0904 90.2017L4.46258 64.5242C1.77865 63.5204 0 60.9553 0 58.0896L0 44.9525C0 40.1392 4.82102 36.8184 9.31803 38.5334L73.0904 62.8548ZM150.337 61.1743L162.351 56.6255C166.845 54.9243 171.653 58.2451 171.653 63.0506L171.653 123.884L171.511 139.188C171.467 143.886 166.826 147.155 162.388 145.615L73.4168 114.733L73.0904 90.2017L145.899 114.733L145.899 67.5994C145.899 64.7432 147.666 62.1859 150.337 61.1743ZM17.4942 118.32L17.4942 105.078C17.4942 100.358 22.1434 97.0442 26.6046 98.5831L73.4168 114.733L73.2029 132.682C73.1471 137.355 68.5442 140.609 64.1208 139.104L22.1512 124.823C19.3671 123.876 17.4942 121.261 17.4942 118.32Z"
                  className="fill-foreground"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold">欢迎使用 Lingke OneAccount</h1>
            <p className="mb-8 text-sm text-muted-foreground">
              使用 Lingke OneAccount 统一认证，安全访问所有服务
            </p>
            <form action={signInWithLingke}>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                继续使用 Lingke OAC 登录
              </button>
            </form>
            <p className="mt-6 text-xs text-muted-foreground">
              继续操作即表示你同意{" "}
              <a
                href="https://support.lingke.ink/%E9%9A%90%E7%A7%81%E5%8D%8F%E8%AE%AE"
                className="underline underline-offset-4 hover:text-foreground"
              >
                隐私协议
              </a>
              {" "}和{" "}
              <a
                href="https://support.lingke.ink/%E4%BA%A7%E5%93%81%E4%BD%BF%E7%94%A8%E6%9D%A1%E6%AC%BE"
                className="underline underline-offset-4 hover:text-foreground"
              >
                产品使用条款
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Lightfall
            dpr={typeof window !== "undefined" ? window.devicePixelRatio : 1}
            className="!absolute !inset-0"
            mixBlendMode="normal"
            colors={['#A6C8FF', '#276bff', '#9fcaff']}
            backgroundColor="#0a5eff"
            speed={0.3}
            streakCount={3}
            streakWidth={0.2}
            streakLength={1.6}
            glow={1.1}
            density={2.1}
            twinkle={1}
            zoom={3.4}
            backgroundGlow={0.6}
            opacity={1}
            mouseInteraction={false}
            mouseStrength={0.5}
            mouseRadius={1}
        />
      </div>
    </div>
  )
}
