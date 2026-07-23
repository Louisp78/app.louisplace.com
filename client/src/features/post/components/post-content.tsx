import { generateHash } from '@/utils/string'
import { PostDataContent } from '../post'
import { parseInlineMarkdown } from '../utils/markdown'
import Callout from './callout'
import Quote from './quote'
import PostLink from './post-link'
import PostImage from './post-image'
import PostVideo from './post-video'

export default function PostContent({ component }: { component: PostDataContent }) {
	if (typeof component === 'string') {
		return <p dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(component) }} />
	}

	switch (component.type) {
		case 'spaced-content':
			return (
				<div className="mb-6">
					<PostContent component={component.data.content} />
				</div>
			)
		case 'title':
			return <h2 className="mb-4 font-semibold">{component.data.text}</h2>

		case 'subtitle':
			return <h3 className="font-semibold">{component.data.text}</h3>

		case 'callout':
			return (
				<Callout
					header={component.data.header}
					content={component.data.content}
					style={component.data.style}
				/>
			)

		case 'ul':
			return (
				<div className="mb-8">
					{component.data.header && (
						<div className="mb-2">
							<PostContent component={component.data.header} />
						</div>
					)}
					<ul className="space-y-2">
						{component.data.items.map((item: PostDataContent) => (
							<li key={generateHash(item.toString())} className="flex items-start">
								<span className="mr-2">•</span>
								<PostContent component={item} />
							</li>
						))}
					</ul>
				</div>
			)

		case 'quote':
			return <Quote highlight={component.data.highlight} content={component.data.content} />
		case 'link':
			return (
				<PostLink href={component.data.href}>
					<PostContent component={component.data.content} />
				</PostLink>
			)

		case 'image':
			return (
				<PostImage
					src={component.data.src}
					alt={component.data.alt}
					width={component.data.width}
					height={component.data.height}
					caption={component.data.caption}
				/>
			)

		case 'video':
			return (
				<PostVideo
					src={component.data.src}
					poster={component.data.poster}
					caption={component.data.caption}
				/>
			)
	}
}
