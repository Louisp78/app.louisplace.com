'use client'

import { useState } from 'react'
import Link from 'next/link'
import GoogleLoginIcon from '../icons/google-login-icon'
import GithubLoginIcon from '../icons/github-login-icon'
import TEXT from '@/constants/text'

const providers = [
	{
		name: 'google',
		href: '/api/auth/google/login',
		icon: GoogleLoginIcon,
		label: TEXT.login.googleButton,
		iconClassName: undefined,
	},
	{
		name: 'github',
		href: '/api/auth/github/login',
		icon: GithubLoginIcon,
		label: TEXT.login.githubButton,
		iconClassName: 'text-white',
	},
] as const

function MobileSignInButton() {
	return (
		<div className="flex flex-col items-center gap-6 md:hidden">
			{providers.map((provider) => (
				<Link
					key={provider.name}
					href={provider.href}
					className="flex items-center gap-2 rounded border-2 border-white p-2 text-white transition hover:bg-white/10 hover:no-underline"
				>
					<span className="font-medium">{provider.label}</span>
					<provider.icon className={`h-5 w-5 ${provider.iconClassName ?? ''}`} />
				</Link>
			))}
		</div>
	)
}

function DesktopSignInButton() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	return (
		<div className="relative hidden md:block">
			<button
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
				className="flex cursor-pointer items-center rounded border-2 border-white px-4 py-2 text-white transition hover:bg-white/10"
			>
				{TEXT.login.signIn}
				<svg
					className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			{isDropdownOpen && (
				<div className="absolute right-0 mt-2 w-56 rounded border border-white/20 bg-black/90 py-1 shadow-lg backdrop-blur-md">
					{providers.map((provider) => (
						<Link
							key={provider.name}
							href={provider.href}
							className="flex items-center px-4 py-2 text-white transition hover:bg-white/10 hover:no-underline"
						>
							<provider.icon className={`h-5 w-5 ${provider.iconClassName ?? ''}`} />
							<span className="ml-2">{provider.label}</span>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}

export default function SignInButton() {
	return (
		<>
			<MobileSignInButton />
			<DesktopSignInButton />
		</>
	)
}
