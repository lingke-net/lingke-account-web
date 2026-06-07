"use client"

import { createContext, useContext, type ReactNode } from "react"

export interface AuthUser {
  sub: string
  name?: string
  email?: string
  picture?: string
}

interface AuthContextValue {
  user: AuthUser | null
}

const AuthContext = createContext<AuthContextValue>({ user: null })

export function AuthProvider({ user, children }: { user: AuthUser | null; children: ReactNode }) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export function useAuthUser() {
  return useContext(AuthContext).user
}
