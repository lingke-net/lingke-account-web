"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { verifyUserPassword } from "./account-actions"

interface VerificationState {
  verified: boolean
  verificationId: string | null
  expiresAt: number | null
}

interface VerificationContextValue extends VerificationState {
  verify: (password: string) => Promise<void>
  clear: () => void
  minutesLeft: () => number | null
}

const VerificationContext = createContext<VerificationContextValue | null>(null)

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<VerificationState>({ verified: false, verificationId: null, expiresAt: null })

  const verify = useCallback(async (password: string) => {
    const result = await verifyUserPassword(password)
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes
    setState({ verified: true, verificationId: result.verificationRecordId, expiresAt })
  }, [])

  const clear = useCallback(() => {
    setState({ verified: false, verificationId: null, expiresAt: null })
  }, [])

  const minutesLeft = useCallback(() => {
    if (!state.expiresAt) return null
    const left = Math.ceil((state.expiresAt - Date.now()) / 60000)
    return left > 0 ? left : null
  }, [state.expiresAt])

  return (
    <VerificationContext.Provider value={{ ...state, verify, clear, minutesLeft }}>
      {children}
    </VerificationContext.Provider>
  )
}

export function useVerification() {
  const context = useContext(VerificationContext)
  if (!context) throw new Error("useVerification must be within VerificationProvider")
  return context
}
