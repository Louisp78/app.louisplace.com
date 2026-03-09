import Image from 'next/image'
import { TransitionLink } from '@/components/transition-link/TransitionLink'

interface PostCardProps {
	isNew?: boolean
	image: { src: string; alt: string }
	description: string
	title: string
	slug: string
}

export default function PostCard(props: PostCardProps) {
	return (
		<TransitionLink href={'/' + props.slug}>
			<div className="relative transition-transform duration-200 ease-in-out hover:scale-[1.01]">
				{props.isNew && (
					<div className="border-white-900 absolute -top-4 -right-3 w-fit rounded-4xl border-2 bg-black px-2 py-0.5 text-white">
						New Post
					</div>
				)}
				<article className="h-[500px] rounded-xl border-2 border-gray-500 p-3">
					<div className="h-[300px] max-h-[300px] pb-4">
						<Image
							src={props.image.src}
							width={500}
							height={300}
							alt={props.image.alt}
							className="h-full w-full rounded-xl object-cover"
						/>
					</div>
					<h2 className="hover: pb-2 font-[Syne] font-semibold text-white">{props.title}</h2>
					<p className="line-clamp-3 overflow-hidden text-ellipsis text-gray-300">
						{props.description}
					</p>
				</article>
			</div>
		</TransitionLink>
	)
}
