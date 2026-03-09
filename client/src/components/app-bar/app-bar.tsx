'use client'

import { useAuth } from '@/plugins/auth/index.client'
import SignInButton from './sign-in-button'
import BurgerMenu from './burger-menu'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight, Code2, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function AppBar() {
	const { user } = useAuth()
	const currentPath = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const closeMenu = () => setIsOpen(false)

	const toggleMenu = () => setIsOpen(!isOpen)
	return (
		<header className="fixed top-0 z-50 min-h-16 w-full bg-black/70 shadow-md backdrop-blur-md">
			<div className="flex w-full items-center justify-between px-6 py-3 md:px-12">
				<Link href="/" className="flex items-center gap-3 text-white no-underline">
					<Image src="/me.png" alt="Louis (me)" width={45} height={45} />
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

				{/* Burger button */}
				<button
					onClick={toggleMenu}
					className="flex cursor-pointer items-center justify-center text-white transition hover:opacity-80 md:hidden"
					aria-label="Toggle menu"
				>
					{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>
			{isOpen && (
				<>
					<div className="flex h-screen flex-col space-y-1 px-6 py-6 md:hidden">
						{user && (
							<>
								<Link
									href="/code-pieces"
									onClick={closeMenu}
									className={
										'flex items-center gap-3 rounded px-4 py-3 text-lg no-underline transition-all duration-300 ' +
										(currentPath === '/code-pieces'
											? 'text-secondary bg-white/10'
											: 'text-white hover:bg-white/5')
									}
								>
									<Code2 className="h-6 w-6" />
									<span>My Code</span>
								</Link>
								<Link
									href="/user-infos"
									onClick={closeMenu}
									className={
										'flex items-center gap-3 rounded px-4 py-3 text-lg no-underline transition-all duration-300 ' +
										(currentPath === '/user-infos'
											? 'text-secondary bg-white/10'
											: 'text-white hover:bg-white/5')
									}
								>
									<span>Account of {user.firstName}</span>
									<ArrowRight className="h-5 w-5" />
								</Link>
							</>
						)}
						{!user && <SignInButton />}
					</div>
				</>
			)}
		</header>
	)
}
