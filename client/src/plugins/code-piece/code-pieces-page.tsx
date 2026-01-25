'use client'

import { useState } from 'react'
import useCodePieces from './hooks/useCodePieces'
import useUpdateCodePiece from './hooks/useUpdateCodePiece'
import useDeleteCodePiece from './hooks/useDeleteCodePiece'
import CodePieceCard from './components/code-piece-card'
import CodePieceComparisonView from './components/code-piece-comparison-view'
import { CodePieceDTO } from '@/plugins/api-repository-generated/models'
import { Loader2 } from 'lucide-react'

export default function CodePiecesPage() {
	const { data: codePieces, isLoading, error } = useCodePieces()
	const { mutate: updateCodePiece } = useUpdateCodePiece()
	const { mutate: deleteCodePiece } = useDeleteCodePiece()
	const [selectedCodePiece, setSelectedCodePiece] = useState<CodePieceDTO | null>(null)

	const handleDelete = (id: number) => {
		deleteCodePiece(id)
		if (selectedCodePiece?.id === id) {
			setSelectedCodePiece(null)
		}
	}

	const handleToggleSolved = (id: number, isSolved: boolean) => {
		updateCodePiece({
			id,
			updateData: { isSolved },
		})
	}

	const handleUpdateTitle = (id: number, title: string) => {
		updateCodePiece({
			id,
			updateData: { title },
		})
	}

	const handleCodeChange = (id: number, newCode: string) => {
		updateCodePiece({
			id,
			updateData: { code: newCode },
		})
	}

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p className="px-4 text-center text-red-400">Failed to load code pieces</p>
			</div>
		)
	}

	return (
		<div className="min-h-screen pt-5 pb-6 md:px-6 md:pt-20 md:pb-8 lg:px-8 lg:pt-24 lg:pb-12">
			<div className="mx-auto max-w-7xl">
				<h1 className="mb-8 text-center font-[Syne] text-2xl font-bold text-white md:text-left md:text-3xl lg:text-4xl">
					My Code Pieces
				</h1>

				{!codePieces || codePieces.length === 0 ? (
					<div className="rounded-lg border border-gray-700 bg-gray-800 p-8 text-center">
						<p className="text-gray-400">
							No code pieces yet. Register code from blog posts to get started!
						</p>
					</div>
				) : (
					<div className="flex flex-col gap-6 lg:gap-6">
						<div className="flex flex-col gap-4">
							{codePieces.map((piece) => (
								<div
									key={piece.id}
									onClick={() =>
										setSelectedCodePiece(selectedCodePiece?.id === piece.id ? null : piece)
									}
									className="cursor-pointer transition-all"
								>
									<CodePieceCard
										codePiece={piece}
										onDelete={handleDelete}
										onToggleSolved={handleToggleSolved}
										onUpdateTitle={handleUpdateTitle}
										isSelected={selectedCodePiece?.id === piece.id}
									>
										<div>
											{selectedCodePiece && (
												<CodePieceComparisonView
													codePiece={selectedCodePiece}
													onCodeChange={handleCodeChange}
													onBack={() => setSelectedCodePiece(null)}
												/>
											)}
										</div>
									</CodePieceCard>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
