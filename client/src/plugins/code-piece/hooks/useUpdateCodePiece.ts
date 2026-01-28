'use client'

import { codePieceControllerApi } from '@/plugins/api-config'
import type { CodePieceUpdateDTO } from '@/plugins/api-repository-generated/models'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CODE_PIECES_KEY } from './useCodePieces'

export default function useUpdateCodePiece() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, updateData }: { id: number; updateData: CodePieceUpdateDTO }) => {
			return await codePieceControllerApi.updateCodePiece({
				id,
				codePieceUpdateDTO: updateData,
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [CODE_PIECES_KEY] })
		},
		onError: (error: Error) => {
			if (process.env.NODE_ENV === 'development') {
				console.error('Failed to update code piece:', error)
			}
		},
	})
}
