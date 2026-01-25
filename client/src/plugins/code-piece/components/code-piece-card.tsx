'use client'

import { CodePieceDTO } from '@/plugins/api-repository-generated/models'
import { Trash2, Check, X, Edit2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface CodePieceCardProps {
	children?: React.ReactNode
	codePiece: CodePieceDTO
	onDelete: (id: number) => void
	onToggleSolved: (id: number, isSolved: boolean) => void
	onUpdateTitle: (id: number, title: string) => void
	isSelected?: boolean
}

export default function CodePieceCard({
	children,
	codePiece,
	onDelete,
	onToggleSolved,
	onUpdateTitle,
	isSelected = false,
}: CodePieceCardProps) {
	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [editedTitle, setEditedTitle] = useState(codePiece.title)

	const sourcePostText = codePiece.sourcePostSlug?.split('-').join(' ')

	const handleSaveTitle = () => {
		if (editedTitle.trim() !== codePiece.title) {
			onUpdateTitle(codePiece.id, editedTitle.trim())
		}
		setIsEditingTitle(false)
	}

	const formatDate = (date: string | Date) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})
	}

	return (
		<div
			className={`flex flex-col gap-2 rounded-md border border-gray-700 bg-gray-800 py-3 transition-all md:rounded-lg md:p-4 ${
				isSelected ? 'ring-2 ring-blue-500' : ''
			}`}
		>
			<div className="flex flex-col px-3 md:flex-row md:items-start md:justify-between">
				{isEditingTitle ? (
					<div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
						<input
							type="text"
							value={editedTitle}
							onChange={(e) => setEditedTitle(e.target.value)}
							className="flex-1 rounded bg-gray-700 px-2 py-1 text-sm text-white"
							autoFocus
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleSaveTitle()
								if (e.key === 'Escape') {
									setEditedTitle(codePiece.title)
									setIsEditingTitle(false)
								}
							}}
						/>
						<div className="flex gap-1">
							<button
								onClick={handleSaveTitle}
								className="flex min-h-10 min-w-10 items-center justify-center rounded p-1 text-green-400 hover:bg-gray-700 hover:text-green-300"
								aria-label="Save title"
							>
								<Check size={18} />
							</button>
							<button
								onClick={() => {
									setEditedTitle(codePiece.title)
									setIsEditingTitle(false)
								}}
								className="flex min-h-10 min-w-10 items-center justify-center rounded p-1 text-red-400 hover:bg-gray-700 hover:text-red-300"
								aria-label="Cancel edit"
							>
								<X size={18} />
							</button>
						</div>
					</div>
				) : (
					<>
						<div className="flex flex-1 flex-col">
							<div className="flex items-center gap-2">
								<h3 className="text-base font-semibold break-words text-white md:text-lg">
									{codePiece.title}
								</h3>
								<button
									onClick={() => setIsEditingTitle(true)}
									className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center text-gray-400 transition-colors hover:text-white lg:min-h-auto lg:min-w-auto"
									aria-label="Edit title"
								>
									<Edit2 size={16} />
								</button>
							</div>
							{codePiece.exerciseContext && (
								<p className="mt-1 text-xs text-gray-400">from {codePiece.exerciseContext}</p>
							)}
						</div>

						<div className="flex flex-wrap items-center gap-2">
							<span className="rounded bg-gray-700 px-2 py-1 text-xs whitespace-nowrap text-gray-300">
								{codePiece.language}
							</span>
							<button
								onClick={() => onToggleSolved(codePiece.id, !codePiece.isSolved)}
								className={`flex cursor-pointer items-center justify-center rounded px-2 py-1 text-xs font-medium transition-colors ${
									codePiece.isSolved
										? 'bg-green-600 text-white hover:bg-green-700'
										: 'bg-secondary text-black hover:bg-gray-600 hover:text-white'
								}`}
							>
								{codePiece.isSolved ? 'Solved' : 'Unsolved'}
							</button>
							<button
								onClick={() => {
									if (confirm('Are you sure you want to delete this code piece?')) {
										onDelete(codePiece.id)
									}
								}}
								className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center text-red-400 transition-colors hover:text-red-300"
								aria-label="Delete code piece"
							>
								<Trash2 size={18} />
							</button>
						</div>
					</>
				)}
			</div>

			{codePiece.sourcePostSlug && (
				<div className="px-3">
					<Link
						href={`/${codePiece.sourcePostSlug}`}
						className="text-xs break-words text-blue-400 hover:underline"
					>
						View {sourcePostText} post →
					</Link>
				</div>
			)}

			<div className="px-3 text-xs text-gray-400">{formatDate(codePiece.createdAt)}</div>
			{children}
		</div>
	)
}
