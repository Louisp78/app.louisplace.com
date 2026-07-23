import SPACING from '@/constants/spacing'
import type { Dictionary } from '@/i18n/dictionaries'
import Image from 'next/image'

export default function Footer({ dict }: { dict: Dictionary }) {
	return (
		<footer className="border-t-[0.5px] border-gray-300 p-5 text-center text-sm text-gray-500">
			<div className="flex flex-col gap-1">
				<span className="text-xs md:text-sm">{dict.footer.copyright}</span>
				<span className="text-xs md:text-sm">{dict.footer.technologies}</span>
				<a
					className="flex justify-center gap-3 text-blue-700"
					href={dict.github.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{dict.footer.visitGithub}
					<Image
						src="/github.svg"
						alt={dict.github.iconAlt}
						width={SPACING.iconSize}
						height={SPACING.iconSize}
						className="inline"
					/>
				</a>
			</div>
		</footer>
	)
}
