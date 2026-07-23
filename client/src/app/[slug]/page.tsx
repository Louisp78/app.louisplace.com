import { Post, postContainer, PostData } from '@/features/post'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PostPage {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	const posts = await postContainer.service().getPosts()
	return posts.map((post) => ({ slug: post.metadata.slug }))
}

export async function generateMetadata({ params }: PostPage): Promise<Metadata | undefined> {
	const { slug } = await params
	const metadata: Metadata | undefined = await postContainer.service().getMetadataFromSlug(slug)

	return metadata
}

export default async function BlogPost({ params }: PostPage) {
	const { slug } = await params
	const postData: PostData | undefined = await postContainer.service().getPostFromSlug(slug)!

	if (!postData) {
		notFound()
	}

	return <Post post={postData} />
}
