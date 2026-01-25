'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { configureMonaco } from './configure-monaco'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
	ssr: false,
})

interface CodeBlockProps {
	language: string
	code: string
	title?: string
	editable?: boolean
}

export default function CodeBlock({ language, code, title, editable = false }: CodeBlockProps) {
	const [localCode, setLocalCode] = useState(code)

	const handleEditorChange = (value: string | undefined) => {
		const newValue = value || ''
		setLocalCode(newValue)
	}

	return (
		<div className="my-6 overflow-hidden rounded-lg border border-gray-700 shadow-lg">
			{title && (
				<div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
					<span className="font-mono text-sm text-gray-300">{title}</span>
					<span className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-400">{language}</span>
				</div>
			)}
			<MonacoEditor
				height="400px"
				language={language}
				value={editable ? localCode : code}
				theme="vs-dark"
				beforeMount={configureMonaco}
				options={{
					readOnly: !editable,
					minimap: { enabled: false },
					fontSize: 14,
					lineNumbers: 'on',
					scrollBeyondLastLine: false,
					automaticLayout: true,
					padding: { top: 16, bottom: 16 },
					fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
					fontLigatures: true,
					renderWhitespace: 'selection',
					smoothScrolling: true,
					cursorBlinking: 'smooth',
					cursorSmoothCaretAnimation: 'on',
				}}
				onChange={editable ? handleEditorChange : undefined}
			/>
			{editable && (
				<div className="flex justify-end border-t border-gray-700 bg-gray-800 px-4 py-3">
					<button
						onClick={() => {}}
						className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
					>
						Register Code
					</button>
				</div>
			)}
		</div>
	)
}
