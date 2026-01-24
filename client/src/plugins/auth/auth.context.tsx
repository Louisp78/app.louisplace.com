'use client'

import { useMe } from '@/plugins/user'
import { createContext, useContext } from 'react'
import { UserDTO } from '../api-repository-generated'

type AuthContextType = {
	user: UserDTO | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useMe()

	return <AuthContext.Provider value={{ user: data ?? null }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}

	return context
}
