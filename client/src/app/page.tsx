import { PostCard, postContainer, PostData, PostMetadata } from '@/features/post'
import TEXT from '@/constants/text'
import { addDays } from '@/utils/date'

export default async function PostsPage() {
	const posts = await postContainer.service().getPosts()
	const postMetadata: PostMetadata[] = posts.map((post: PostData) => post.metadata)

	return (
		<main className="flex-1 p-4 md:p-5">
			<section className="flex flex-col items-center gap-4 py-10 text-center md:py-16">
				<h1 className="font-[Syne] text-3xl font-bold md:text-5xl">{TEXT.home.tagline}</h1>
				<p className="max-w-2xl text-gray-500 md:text-lg">{TEXT.home.intro}</p>
			</section>
			{postMetadata.length > 0 ? (
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
			) : (
				<p className="pt-5 pb-6 text-center text-gray-500">{TEXT.home.emptyState}</p>
			)}
		</main>
	)
}
