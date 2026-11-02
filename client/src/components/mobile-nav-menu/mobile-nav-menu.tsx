'use client'

import { TransitionLink } from '@/components/transition-link/TransitionLink'
import SPACING from '@/constants/spacing'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface MobileNavMenuProps {
	locale: Locale
	appBar: Dictionary['appBar']
	github: Dictionary['github']
	scannerRoom: Dictionary['scannerRoom']
}

export default function MobileNavMenu({ locale, appBar, github, scannerRoom }: MobileNavMenuProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	// <dialog>.showModal() gives us the top layer, the backdrop, focus trapping and Escape for free,
	// but it can only be called from an effect since the ref is not set on the first render.
	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) {
			return
		}
		if (isOpen && !dialog.open) {
			dialog.showModal()
		} else if (!isOpen && dialog.open) {
			dialog.close()
		}
	}, [isOpen])

	return (
		<>
			<button
				type="button"
				aria-label={appBar.openMenu}
				aria-expanded={isOpen}
				onClick={() => setIsOpen(true)}
				className="absolute left-1/2 -translate-x-1/2 text-gray-500 hover:text-gray-900 md:hidden dark:hover:text-white"
			>
				<Menu className="h-6 w-6" />
			</button>
			<dialog
				ref={dialogRef}
				aria-label={appBar.navLabel}
				onClose={() => setIsOpen(false)}
				onClick={(event) => {
					if (event.target === dialogRef.current) {
						setIsOpen(false)
					}
				}}
				className="m-0 max-h-none w-full max-w-none bg-[var(--background)] text-[var(--foreground)] backdrop:bg-black/40 open:h-full md:hidden"
			>
				<div className="flex h-full flex-col">
					<div className="flex items-center justify-end border-b-[0.5px] border-gray-300 p-4">
						<button
							type="button"
							aria-label={appBar.closeMenu}
							onClick={() => setIsOpen(false)}
							className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
						>
							<X className="h-6 w-6" />
						</button>
					</div>
					<nav aria-label={appBar.navLabel} className="flex flex-col gap-6 p-6">
						<TransitionLink href={`/${locale}/about`} onClick={() => setIsOpen(false)}>
							<span className="font-[Syne] text-2xl font-bold text-[var(--foreground)]">
								{appBar.about}
							</span>
						</TransitionLink>
						<a
							className="group flex items-center gap-1.5 font-[Syne] text-2xl font-bold text-[var(--foreground)]"
							href={scannerRoom.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{scannerRoom.name}
							<ArrowUpRight className="h-5 w-5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>
						<a
							className="group flex items-center gap-1.5 text-blue-700"
							href={github.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/github.svg"
								alt={github.iconAlt}
								width={SPACING.iconSize}
								height={SPACING.iconSize}
							/>
							GitHub
							<ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>
					</nav>
				</div>
			</dialog>
		</>
	)
}
