export default function PostVideo({
	src,
	poster,
	caption,
}: {
	src: string
	poster?: string
	caption?: string
}) {
	return (
		<figure className="mb-8 flex flex-col items-center">
			<div className="w-full max-w-[900px] overflow-hidden rounded-lg shadow-lg">
				<video className="h-auto w-full" controls playsInline preload="metadata" poster={poster}>
					<source src={src} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
			{caption && (
				<figcaption className="mt-2 text-center text-sm text-gray-500 italic">{caption}</figcaption>
			)}
		</figure>
	)
}
