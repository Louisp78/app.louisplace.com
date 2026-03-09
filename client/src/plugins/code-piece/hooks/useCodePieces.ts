import { CodePieceControllerApi } from '@/plugins/api-repository-generated'
import { useQuery } from '@tanstack/react-query'

export const CODE_PIECES_KEY = 'code-pieces'

export default function useCodePieces() {
	return useQuery({
		queryKey: [CODE_PIECES_KEY],
		queryFn: async () => new CodePieceControllerApi().getUserCodePieces(),
	})
}
