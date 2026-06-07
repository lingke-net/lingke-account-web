"use server"

import { signOut } from "@logto/next/server-actions"
import { logtoConfig } from "@/lib/logto"

export async function signOutWithLingke() {
  await signOut(logtoConfig, logtoConfig.baseUrl)
}
