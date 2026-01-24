'use client'

import { useAuth } from '@/plugins/auth/index.client'
import SignInButton from './sign-in-button'
import Link from 'next/link'

export default function AppBar() {
	const { user } = useAuth()

	return (
		<header className="fixed top-0 z-50 max-h-16 w-full bg-black/70 backdrop-blur-md">
			<div className="flex w-full items-center justify-evenly px-0 py-3 md:justify-between md:px-12">
				<h1 className="font-[Syne] text-2xl font-bold md:text-4xl">Louis&apos; Blog</h1>
				{!user ? (
					<SignInButton />
				) : (
					<Link href="/user-infos" className="text-white">
						Hello, {user.firstName}
					</Link>
				)}
			</div>
		</header>
	)
}
