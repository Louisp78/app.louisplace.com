'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Code2, ArrowRight } from 'lucide-react'
import { useAuth } from '@/plugins/auth/index.client'
import SignInButton from './sign-in-button'

export default function BurgerMenu() {
	const { user } = useAuth()
	const currentPath = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => setIsOpen(!isOpen)
	const closeMenu = () => setIsOpen(false)

	return (
		<div className="md:hidden">
			{/* Burger button */}
			<button
				onClick={toggleMenu}
				className="flex cursor-pointer items-center justify-center text-white transition hover:opacity-80"
				aria-label="Toggle menu"
			>
				{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
			</button>

			{isOpen && (
				<>
					<div className="fixed inset-0 top-12 h-screen bg-black" onClick={closeMenu} />

					<div className="fixed inset-0 top-12 flex flex-col space-y-1 bg-black/95 px-6 py-6 backdrop-blur-md">
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
						{!user && (
							<div className="border-t border-white/20 pt-4">
								<div className="flex flex-col gap-3">
									<SignInButton />
								</div>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}
