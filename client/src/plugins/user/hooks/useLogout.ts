'use client'

import { authControllerApi } from '@/plugins/api-config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_KEY } from '../hooks/useMe'

export function useLogout() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			return await authControllerApi.postMethodName()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [USER_KEY] })
			queryClient.clear()
		},
		onError: (error: Error) => {
			if (process.env.NODE_ENV === 'development') {
				console.error('Failed to logout:', error)
			}
		},
	})
}
