import { PostData } from '@/features/post'
import type { Dictionary } from '@/i18n/dictionaries'
import PostContent from './post-content'
import PostHeader from './post-header'

export default function Post({ post, dict }: { post: PostData; dict: Dictionary }) {
	return (
		<article className="mx-auto flex max-w-screen flex-col px-4 pt-8 pb-12 md:max-w-2xl md:px-0 md:pb-28 lg:max-w-4xl lg:px-0">
			<PostHeader post={post} dict={dict} />
			<section>
				{post.content.map((component, index) => (
					<PostContent key={index} component={component} />
				))}
			</section>
		</article>
	)
}
