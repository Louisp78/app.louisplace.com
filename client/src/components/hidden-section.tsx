'use client'

import { useState } from 'react'
import { PostContent } from '@/plugins/post'
import { PostDataContent } from '@/plugins/post'

interface HiddenSectionProps {
	title: string
	items: PostDataContent[]
}

export default function HiddenSection({ title, items }: HiddenSectionProps) {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<div className="my-6">
			<button
				onClick={() => setIsVisible(!isVisible)}
				className="w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-left transition-colors hover:bg-gray-700"
			>
				<div className="flex items-center justify-between">
					<span className="font-semibold text-gray-200">{title}</span>
					<svg
						className={`h-5 w-5 transition-transform ${isVisible ? 'rotate-180' : ''}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</div>
				<div>
					{isVisible && (
						<div className="mt-2 rounded-lg border border-gray-700 bg-gray-900 p-4">
							{items.map((item, index) => (
								<PostContent key={index} component={item} />
							))}
						</div>
					)}
				</div>
			</button>
		</div>
	)
}
