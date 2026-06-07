"use server"

import { getAccessToken } from "@logto/next/server-actions"
import { logtoConfig } from "./logto"
import { AccountApiError } from "./account-errors"

const apiBase = `${logtoConfig.endpoint}/api/my-account`
const verificationBase = `${logtoConfig.endpoint}/api/verifications`

async function fetchApi(path: string, options: RequestInit = {}) {
  const token = await getAccessToken(logtoConfig)
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new AccountApiError(
      (error as { message?: string }).message ?? `API error: ${response.status}`,
      response.status
    )
  }
  return response.json()
}

async function fetchVerification(path: string, options: RequestInit = {}) {
  const token = await getAccessToken(logtoConfig)
  const response = await fetch(`${verificationBase}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error((error as { message?: string }).message ?? `API error: ${response.status}`)
  }
  return response.json()
}

export async function getProfile() {
  return fetchApi("")
}

export async function updateProfile(data: { username?: string; name?: string }) {
  return fetchApi("", { method: "PATCH", body: JSON.stringify(data) })
}

export async function verifyUserPassword(password: string) {
  return fetchVerification("/password", {
    method: "POST",
    body: JSON.stringify({ password }),
  })
}

export async function updateUserPassword(password: string, verificationRecordId: string) {
  return fetchApi("/password", {
    method: "POST",
    headers: { "logto-verification-id": verificationRecordId },
    body: JSON.stringify({ password }),
  })
}

export async function getUserSessions(verificationRecordId: string) {
  return fetchApi("/sessions", {
    headers: { "logto-verification-id": verificationRecordId },
  })
}

export async function revokeUserSession(sessionId: string, verificationRecordId: string) {
  return fetchApi(`/sessions/${sessionId}`, {
    method: "DELETE",
    headers: { "logto-verification-id": verificationRecordId },
  })
}

export async function getUserGrants(verificationRecordId: string) {
  return fetchApi("/grants", {
    headers: { "logto-verification-id": verificationRecordId },
  })
}

export async function revokeUserGrant(grantId: string, verificationRecordId: string) {
  return fetchApi(`/grants/${grantId}`, {
    method: "DELETE",
    headers: { "logto-verification-id": verificationRecordId },
  })
}

export async function getMfaVerifications() {
  return fetchApi("/mfa-verifications")
}

export async function deleteMfaVerification(verificationId: string, verificationRecordId: string) {
  return fetchApi(`/mfa-verifications/${verificationId}`, {
    method: "DELETE",
    headers: { "logto-verification-id": verificationRecordId },
  })
}

export async function getMfaSettings() {
  return fetchApi("/mfa-settings")
}

export async function updateUserMfaSettings(skipMfaOnSignIn: boolean, verificationRecordId: string) {
  return fetchApi("/mfa-settings", {
    method: "PATCH",
    headers: { "logto-verification-id": verificationRecordId },
    body: JSON.stringify({ skipMfaOnSignIn }),
  })
}

export async function generateBackupCodes(verificationRecordId: string) {
  return fetchApi("/mfa-verifications/backup-codes/generate", {
    method: "POST",
    headers: { "logto-verification-id": verificationRecordId },
  })
}
