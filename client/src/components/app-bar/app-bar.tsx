'use client'

import { useAuth } from '@/plugins/auth/index.client'
import SignInButton from './sign-in-button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AppBar() {
	const { user } = useAuth()

	return (
		<header className="fixed top-0 z-50 max-h-16 w-full bg-black/70 backdrop-blur-md">
			<div className="flex w-full items-center justify-evenly px-0 py-3 md:justify-between md:px-12">
				<Link href="/" className="text-white no-underline">
					<h1 className="font-[Syne] text-2xl font-bold md:text-4xl">Louis&apos; Blog</h1>
				</Link>
				{!user ? (
					<SignInButton />
				) : (
					<Link
						href="/user-infos"
						className="group text-white no-underline transition-all duration-300"
					>
						<span className="transition-all duration-300 group-hover:font-bold">
							Account of {user.firstName}
						</span>
						<ArrowRight className="ml-2 inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				)}
			</div>
		</header>
	)
}
