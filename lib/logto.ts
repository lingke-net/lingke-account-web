import type { LogtoNextConfig } from "@logto/next"

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable. Check .env.local file.`)
  }
  return value
}

export const logtoConfig: LogtoNextConfig = {
  endpoint: "https://oac.lingke.ink",
  appId: requiredEnv("LOGTO_APP_ID"),
  appSecret: requiredEnv("LOGTO_APP_SECRET"),
  baseUrl: process.env.LOGTO_BASE_URL ?? "http://localhost:3000",
  cookieSecret: requiredEnv("LOGTO_COOKIE_SECRET"),
  cookieSecure: process.env.NODE_ENV === "production",
  scopes: [
    "openid",
    "offline_access",
    "profile",
    "email",
    "phone",
    "custom_data",
    "identities",
    "address",
    "urn:logto:scope:sessions",
    "urn:logto:scope:organizations",
  ],
}
