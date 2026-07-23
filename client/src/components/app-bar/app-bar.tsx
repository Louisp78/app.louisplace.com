import LanguageSwitcher from '@/components/language-switcher/language-switcher'
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
		<header className="sticky top-0 z-50 flex items-center justify-between border-b-[0.5px] border-gray-300 bg-[var(--background)]/70 p-4 backdrop-blur-md md:px-8 md:py-5">
			<TransitionLink href={`/${locale}`}>
				<span className="font-[Syne] text-lg font-bold md:text-xl">{dict.brand.name}</span>
			</TransitionLink>
			<div className="flex items-center gap-4 md:gap-6">
				<LanguageSwitcher locale={locale} label={dict.languageSwitcher.label} />
				<a
					className="group flex items-center gap-1.5 text-sm text-blue-700 md:text-base"
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
