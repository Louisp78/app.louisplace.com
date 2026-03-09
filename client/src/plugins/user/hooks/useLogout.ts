'use client'

import { authControllerApi } from '@/plugins/api-config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { USER_KEY } from '../hooks/useMe'

export function useLogout() {
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationFn: async () => {
			return await authControllerApi.postMethodName()
		},
		onSuccess: async () => {
			queryClient.setQueryData([USER_KEY], null)
			router.push('/')
		},
		onError: (error: Error) => {
			if (process.env.NODE_ENV === 'development') {
				console.error('Failed to logout:', error)
			}
		},
	})
}
