import Image from 'next/image'

const DEFAULT_IMAGE_ASPECT_RATIO = '4 / 3'

export default function PostImage({
	src,
	alt,
	width,
	height,
	caption,
}: {
	src: string
	alt: string
	width?: number
	height?: number
	caption?: string
}) {
	const aspect = width && height && height > 0 ? `${width} / ${height}` : DEFAULT_IMAGE_ASPECT_RATIO

	return (
		<figure className="mb-8 flex flex-col items-center">
			<div
				className="w-full max-w-[900px] overflow-hidden rounded-lg shadow-lg"
				style={{ position: 'relative', width: '100%', aspectRatio: aspect }}
			>
				<Image
					src={src}
					alt={alt}
					fill
					style={{ objectFit: 'cover' }}
					sizes="(max-width: 768px) 100vw, 900px"
				/>
			</div>
			{caption && (
				<figcaption className="mt-2 text-center text-sm text-gray-500 italic">{caption}</figcaption>
			)}
		</figure>
	)
}
