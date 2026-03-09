import { PostData } from '../post'
import Quote from './quote'
import CoverImage from './cover-image'

export default function PostHeader({ post }: { post: PostData }) {
	return (
		<section className="mb-6 text-center sm:mb-12">
			<header className="mb-2 block text-sm text-gray-500">
				By {post.metadata.author} • Published{' '}
				{new Date(post.metadata.publishedAt).toLocaleDateString()} •
				{` ${post.metadata.estimatedReadingTimeMinutes} min read`}
			</header>
			<h1 className="mb-8 font-bold">{post.metadata.title}</h1>
			{post.metadata.image && <CoverImage {...post.metadata.image} />}
			<Quote content={post.metadata.summary} />
		</section>
	)
}
