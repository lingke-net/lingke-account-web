import { handleSignIn } from "@logto/next/server-actions"
import { NextResponse } from "next/server"
import { logtoConfig } from "@/lib/logto"

export async function GET(request: Request) {
  try {
    await handleSignIn(logtoConfig, new URL(request.url))
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    const digest = (error as { digest?: string })?.digest
    if (typeof digest === "string" && digest.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    console.error("Logto callback error:", error)
    return NextResponse.redirect(new URL("/account/login?error=auth_failed", request.url))
  }
}
