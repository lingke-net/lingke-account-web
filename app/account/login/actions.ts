"use server"

import { signIn } from "@logto/next/server-actions"
import { logtoConfig } from "@/lib/logto"

export async function signInWithLingke() {
  await signIn(logtoConfig, {
    redirectUri: `${logtoConfig.baseUrl}/api/auth/callback`,
  })
}
