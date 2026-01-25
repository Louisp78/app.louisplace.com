'use client'

import { codePieceControllerApi } from '@/plugins/api-config'
import type { CodePieceCreateDTO } from '@/plugins/api-repository-generated/models'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CODE_PIECES_KEY } from './useCodePieces'

export default function useCreateCodePiece() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (createData: CodePieceCreateDTO) => {
			return await codePieceControllerApi.createCodePiece({
				codePieceCreateDTO: createData,
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [CODE_PIECES_KEY] })
		},
		onError: (error: Error) => {
			if (process.env.NODE_ENV === 'development') {
				console.error('Failed to create code piece:', error)
			}
		},
	})
}
