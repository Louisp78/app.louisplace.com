import { PostCard, PostData, PostMetadata } from '@/plugins/post'
import { postServiceContainer } from '@/plugins/post/index.server'
import { addDays } from '@/utils/date'

export default async function PostsPage() {
	const posts = await postServiceContainer.service().getPosts()
	const postMetadata: PostMetadata[] = posts?.map((post: PostData) => post.metadata) ?? []

	return (
		<main className="flex-1 p-4 md:p-5">
			<ul className="grid grid-cols-1 gap-6 overflow-visible pt-5 pb-6 sm:grid-cols-2 lg:grid-cols-3">
				{postMetadata.map((metadata: PostMetadata) => (
					<li key={metadata.slug}>
						<PostCard
							title={metadata.title}
							image={metadata.image}
							description={metadata.summary}
							isNew={new Date(metadata.publishedAt) > addDays(new Date(), -7)}
							slug={metadata.slug}
						/>
					</li>
				))}
			</ul>
		</main>
	)
}
