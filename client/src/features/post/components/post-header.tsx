import type { Dictionary } from '@/i18n/dictionaries'
import { PostData } from '../post'
import CoverImage from './cover-image'
import Quote from './quote'

export default function PostHeader({ post, dict }: { post: PostData; dict: Dictionary }) {
	return (
		<section className="mb-6 text-center sm:mb-12">
			<header className="mb-2 block text-sm text-gray-500">
				{dict.post.by} {post.metadata.author} • {dict.post.publishedOn}{' '}
				{new Date(post.metadata.publishedAt).toLocaleDateString(dict.dateLocale)} •
				{` ${dict.post.readingTime(post.metadata.estimatedReadingTimeMinutes)}`}
			</header>
			<h1 className="mb-8 font-bold">{post.metadata.title}</h1>
			{post.metadata.image && <CoverImage {...post.metadata.image} />}
			<Quote content={post.metadata.summary} />
		</section>
	)
}
