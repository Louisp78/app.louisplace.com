'use client'

import { CodePieceDTO } from '@/plugins/api-repository-generated/models'
import { ChevronUp } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { configureMonaco } from './../configure-monaco'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface CodePieceComparisonViewProps {
	codePiece: CodePieceDTO
	onCodeChange: (sourcePostSlug: string, newCode: string) => void
	onBack?: () => void
}

export default function CodePieceComparisonView({
	codePiece,
	onCodeChange,
	onBack,
}: CodePieceComparisonViewProps) {
	const [localCode, setLocalCode] = useState(codePiece.code)
	const [showSolution, setShowSolution] = useState(false)

	const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		if (localCode !== codePiece.code) {
			onCodeChange(codePiece.sourcePostSlug, localCode)
		}
	}

	const handleEditorMount = (editor) => {
		const domElement = editor?.getDomNode?.()
		if (domElement) {
			domElement.addEventListener('click', (e: MouseEvent) => {
				e.stopPropagation()
			})
		}
	}

	return (
		<div className="space-y-4 md:p-5 lg:p-6">
			<div className="overflow-hidden rounded-lg border border-gray-700">
				<span className="pl-2 text-sm font-semibold text-white md:text-base">Your Code</span>
				<MonacoEditor
					height="300px"
					defaultLanguage={codePiece.language}
					language={codePiece.language}
					value={localCode}
					theme="vs-dark"
					beforeMount={configureMonaco}
					onMount={handleEditorMount}
					onChange={(value) => setLocalCode(value || '')}
					options={{
						minimap: { enabled: false },
						fontSize: 12,
						lineNumbers: 'on',
						scrollBeyondLastLine: false,
						automaticLayout: true,
						padding: { top: 16, bottom: 16 },
					}}
					className="md:h-96 lg:h-96"
				/>
				<div className="flex flex-col items-start gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2 sm:flex-row sm:items-center sm:justify-end">
					<button
						onClick={handleSave}
						disabled={localCode === codePiece.code}
						className="z-10 w-full rounded bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
					>
						Save Changes
					</button>
				</div>
			</div>

			{/* Solution Toggle & Display */}
			{codePiece.solutionCode && (
				<div>
					<button
						onClick={() => setShowSolution(!showSolution)}
						className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-left font-semibold text-white transition-colors hover:bg-gray-700"
					>
						{showSolution ? 'Hide Solution' : 'Show Solution'}
						<ChevronUp
							className={`h-5 w-5 transition-transform ${showSolution ? 'rotate-180' : ''}`}
						/>
					</button>

					{showSolution && (
						<div className="border-opacity-50 mt-4 overflow-hidden rounded-lg border border-green-600">
							<div className="border-opacity-50 border-b border-green-600 bg-gray-800 px-4 py-2">
								<span className="text-sm font-semibold text-green-400 md:text-base">Solution</span>
							</div>
							<MonacoEditor
								height="300px"
								defaultLanguage={codePiece.language}
								language={codePiece.language}
								value={codePiece.solutionCode}
								theme="vs-dark"
								beforeMount={configureMonaco}
								onMount={handleEditorMount}
								options={{
									readOnly: true,
									minimap: { enabled: false },
									fontSize: 12,
									lineNumbers: 'off',
									scrollBeyondLastLine: false,
									automaticLayout: true,
									padding: { top: 16, bottom: 16 },
								}}
								className="md:h-96 lg:h-96"
							/>
						</div>
					)}
				</div>
			)}
			<div className="flex justify-center md:justify-start">
				{onBack && (
					<button
						onClick={onBack}
						className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 lg:hidden"
					>
						← Back to List
					</button>
				)}
			</div>
		</div>
	)
}
