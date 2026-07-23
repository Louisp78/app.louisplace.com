import { Post, postContainer, PostData } from '@/features/post'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PostPage {
	params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: PostPage): Promise<Metadata | undefined> {
	const { locale, slug } = await params

	if (!isLocale(locale)) {
		return undefined
	}

	return await postContainer.service().getMetadataFromSlug(slug, locale)
}

export default async function BlogPost({ params }: PostPage) {
	const { locale, slug } = await params

	if (!isLocale(locale)) {
		notFound()
	}

	const postData: PostData | undefined = await postContainer.service().getPostFromSlug(slug, locale)

	if (!postData) {
		notFound()
	}

	return <Post post={postData} dict={getDictionary(locale)} />
}
