'use client'

import Link from 'next/link'
import GoogleLoginIcon from '@/components/icons/google-login-icon'
import GithubLoginIcon from '@/components/icons/github-login-icon'
import TEXT from '@/constants/text'
import { Lock } from 'lucide-react'

const providers = [
	{
		name: 'google',
		href: '/api/auth/google/login',
		icon: GoogleLoginIcon,
		label: TEXT.login.googleButton,
	},
	{
		name: 'github',
		href: '/api/auth/github/login',
		icon: GithubLoginIcon,
		label: TEXT.login.githubButton,
	},
] as const

export default function CodeBlockAuthGuard() {
	return (
		<div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-900 px-6 py-8">
			<Lock className="mb-4 h-12 w-12 text-gray-500" />

			<h3 className="mb-2 text-center text-lg font-semibold text-gray-200">
				{TEXT.codeBlock.restrictedContent}
			</h3>

			<p className="mb-6 text-center text-sm text-gray-400">{TEXT.codeBlock.signInPrompt}</p>

			<div className="flex w-full max-w-xs flex-col gap-3">
				{providers.map((provider) => (
					<Link
						key={provider.name}
						href={provider.href}
						className="flex items-center justify-center gap-3 rounded border border-gray-700 bg-gray-800 px-6 py-3 text-white transition hover:bg-gray-700 hover:no-underline"
					>
						<provider.icon className="h-5 w-5" />
						<span>{provider.label}</span>
					</Link>
				))}
			</div>
		</div>
	)
}
