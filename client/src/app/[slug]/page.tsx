import { Post, PostData } from '@/features/post'
import { postServiceContainer } from '@/features/post/index.server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PostPage {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPage): Promise<Metadata | undefined> {
	const { slug } = await params
	const metadata: Metadata | undefined = await postServiceContainer
		.service()
		.getMetadataFromSlug(slug)

	return metadata
}

export default async function BlogPost({ params }: PostPage) {
	const { slug } = await params
	const postData: PostData | undefined = await postServiceContainer.service().getPostFromSlug(slug)!

	if (!postData) {
		notFound()
	}

	return <Post post={postData} />
}
