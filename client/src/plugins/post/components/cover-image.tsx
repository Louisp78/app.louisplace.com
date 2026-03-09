import Image from 'next/image'

const DEFAULT_IMAGE_ASPECT_RATIO = '16 / 9'

export default function CoverImage({
	src,
	alt,
	width,
	height,
}: {
	src: string
	alt: string
	width?: number
	height?: number
}) {
	const aspect = width && height && height > 0 ? `${width} / ${height}` : DEFAULT_IMAGE_ASPECT_RATIO

	return (
		<div className="mb-8 flex justify-center">
			<div
				className="w-full max-w-[900px] overflow-hidden rounded-lg shadow-lg"
				style={{ position: 'relative', width: '100%', aspectRatio: aspect }}
			>
				<Image
					src={src}
					alt={alt}
					fill
					priority
					style={{ objectFit: 'cover' }}
					sizes="(max-width: 768px) 100vw, 900px"
				/>
			</div>
		</div>
	)
}
