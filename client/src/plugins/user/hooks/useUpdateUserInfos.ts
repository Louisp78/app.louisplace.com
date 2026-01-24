'use client'

import { userControllerApi } from '@/plugins/api-config'
import type { UserDTO, UserUpdateDTO } from '@/plugins/api-repository-generated/models'
import { USER_KEY } from '@/plugins/auth/index.client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdateUserInfos() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (dataToUpdate: UserUpdateDTO) => {
			return await userControllerApi.updateUserInfos({
				dataToUpdate,
			})
		},
		onSuccess: (data: UserDTO) => {
			queryClient.invalidateQueries({ queryKey: [USER_KEY] })
			queryClient.setQueryData([USER_KEY], data)
		},
		onError: (error: Error) => {
			if (process.env.NODE_ENV === 'development') {
				console.error('Failed to update user infos:', error)
			}
		},
	})
}
