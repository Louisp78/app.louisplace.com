'use client'

import { useAuth } from '@/plugins/auth/index.client'
import SignInButton from './sign-in-button'
import BurgerMenu from './burger-menu'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight, Code2 } from 'lucide-react'

export default function AppBar() {
	const { user } = useAuth()
	const currentPath = usePathname()

	return (
		<header className="fixed top-0 z-50 max-h-16 w-full bg-black/70 backdrop-blur-md">
			<div className="flex w-full items-center justify-between px-6 py-3 md:px-12">
				<Link href="/" className="flex items-center gap-3 text-white no-underline">
					<Image src="/me.png" alt="Logo" width={45} height={45} />
					<h1 className="font-[Syne] text-2xl font-bold md:text-4xl">Louis&apos; Blog</h1>
				</Link>

				{/* Desktop menu */}
				<div className="hidden items-center gap-4 md:flex">
					{user && (
						<Link
							href="/code-pieces"
							className={
								'group flex items-center gap-2 no-underline transition-all duration-300 hover:opacity-80 ' +
								(currentPath === '/code-pieces' ? 'text-secondary' : 'text-white')
							}
						>
							<Code2 className="h-5 w-5" />
							<span className="text-sm">My Code</span>
						</Link>
					)}
					{user && <span>|</span>}
					{!user ? (
						<SignInButton />
					) : (
						<Link
							href="/user-infos"
							className={
								'group no-underline transition-all duration-300 ' +
								(currentPath === '/user-infos' ? 'text-secondary' : 'text-white')
							}
						>
							<span className="transition-all duration-300 group-hover:font-bold">
								Account of {user.firstName}
							</span>
							<ArrowRight className="ml-2 inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</Link>
					)}
				</div>

				{/* Mobile menu burger */}
				<BurgerMenu />
			</div>
		</header>
	)
}
