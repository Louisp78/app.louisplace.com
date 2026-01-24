import React from 'react'
import ArrowUpRight from './arrow-up-right'

interface LinkProps {
	href: string
	children: React.ReactNode
}

export default function PostLink({ href, children }: LinkProps) {
	return (
		<a href={href} className="flex items-center gap-1" target="_blank" rel="noopener noreferrer">
			{children}
			<ArrowUpRight className="h-4 w-4" />
		</a>
	)
}
