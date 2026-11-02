import LanguageSwitcher from '@/components/language-switcher/language-switcher'
import MobileNavMenu from '@/components/mobile-nav-menu/mobile-nav-menu'
import { TransitionLink } from '@/components/transition-link/TransitionLink'
import SPACING from '@/constants/spacing'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

interface AppBarProps {
	locale: Locale
	dict: Dictionary
}

export default function AppBar({ locale, dict }: AppBarProps) {
	return (
		<header className="relative sticky top-0 z-50 flex items-center justify-between border-b-[0.5px] border-gray-300 bg-[var(--background)]/70 p-4 backdrop-blur-md md:px-8 md:py-5">
			<TransitionLink href={`/${locale}`}>
				<span className="font-[Syne] text-base font-bold md:text-lg">
					<span className="md:hidden">{dict.brand.shortName}</span>
					<span className="hidden md:inline">{dict.brand.name}</span>
				</span>
			</TransitionLink>
			<MobileNavMenu
				locale={locale}
				appBar={dict.appBar}
				github={dict.github}
				scannerRoom={dict.scannerRoom}
			/>
			<div className="flex items-center gap-4 md:gap-6">
				<span className="hidden md:inline">
					<TransitionLink href={`/${locale}/about`}>
						<span className="text-gray-500 hover:text-gray-900 md:text-base dark:hover:text-white">
							{dict.appBar.about}
						</span>
					</TransitionLink>
				</span>
				<a
					className="group hidden items-center gap-1 text-gray-500 hover:text-gray-900 md:flex md:text-base dark:hover:text-white"
					href={dict.scannerRoom.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{dict.scannerRoom.name}
					<ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</a>
				<LanguageSwitcher locale={locale} label={dict.languageSwitcher.label} />
				<a
					className="group hidden items-center gap-1.5 text-sm text-blue-700 md:flex md:text-base"
					href={dict.github.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						src="/github.svg"
						alt={dict.github.iconAlt}
						width={SPACING.iconSize}
						height={SPACING.iconSize}
					/>
					GitHub
					<ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</a>
			</div>
		</header>
	)
}
