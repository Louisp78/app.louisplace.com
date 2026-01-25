'use client'

import { codePieceControllerApi } from '@/plugins/api-config'
import { CODE_PIECES_KEY } from './useCodePieces'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useDeleteCodePiece() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: number) => {
			return await codePieceControllerApi.deleteCodePiece({ id })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [CODE_PIECES_KEY] })
		},
		onError: (error: Error) => {
			if (process.env.NODE_ENV === 'development') {
				console.error('Failed to delete code piece:', error)
			}
		},
	})
}
