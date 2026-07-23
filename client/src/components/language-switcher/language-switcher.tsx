'use client'

import { locales, type Locale } from '@/i18n/config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LanguageSwitcherProps {
	locale: Locale
	label: string
}

function pathForLocale(pathname: string, target: Locale): string {
	const segments = pathname.split('/')
	// segments[0] is the empty string before the leading slash, segments[1] is the locale.
	if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
		segments[1] = target
	} else {
		segments.splice(1, 0, target)
	}
	return segments.join('/') || `/${target}`
}

export default function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
	const pathname = usePathname()

	return (
		<nav aria-label={label} className="flex items-center gap-1 text-sm md:text-base">
			{locales.map((target, index) => {
				const isActive = target === locale
				return (
					<span key={target} className="flex items-center">
						{index > 0 && <span className="px-1 text-gray-300">/</span>}
						<Link
							href={pathForLocale(pathname, target)}
							aria-current={isActive ? 'true' : undefined}
							className={
								isActive
									? 'font-semibold text-gray-900 dark:text-white'
									: 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
							}
						>
							{target.toUpperCase()}
						</Link>
					</span>
				)
			})}
		</nav>
	)
}
