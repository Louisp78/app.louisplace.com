import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { TransitionLink } from '@/components/transition-link/TransitionLink'
import TEXT from '@/constants/text'
import SPACING from '@/constants/spacing'

export default function AppBar() {
	return (
		<header className="sticky top-0 z-50 flex items-center justify-between border-b-[0.5px] border-gray-300 bg-[var(--background)]/70 p-4 backdrop-blur-md md:px-8 md:py-5">
			<TransitionLink href="/">
				<span className="font-[Syne] text-lg font-bold md:text-xl">{TEXT.brand.name}</span>
			</TransitionLink>
			<a
				className="group flex items-center gap-1.5 text-sm text-blue-700 md:text-base"
				href={TEXT.github.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					src="github.svg"
					alt={TEXT.github.iconAlt}
					width={SPACING.iconSize}
					height={SPACING.iconSize}
				/>
				GitHub
				<ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</a>
		</header>
	)
}
