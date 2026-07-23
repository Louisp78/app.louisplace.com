import { Locale } from '@/i18n/config'
import { Metadata } from 'next'
import { PostData } from '../post'
import postContainer from './post.container'
import IPostService from './post.service.interface'

export default class PostService implements IPostService {
	private repository = postContainer.repository()
	private postsCache: Partial<Record<Locale, PostData[]>> = {}

	public async getPosts(locale: Locale): Promise<PostData[]> {
		const cached = this.postsCache[locale]
		if (cached) {
			return cached
		}

		const posts = await this.repository.getPosts(locale)
		if (!posts) {
			this.postsCache[locale] = []
			return []
		}

		const sorted = posts.sort((a, b) => {
			return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
		})

		this.postsCache[locale] = sorted
		return sorted
	}

	public async getPostFromSlug(slug: string, locale: Locale): Promise<PostData | undefined> {
		const posts = await this.getPosts(locale)
		return posts.find((post) => post.metadata.slug === slug)
	}

	public async getMetadataFromSlug(slug: string, locale: Locale): Promise<Metadata | undefined> {
		const postData = await this.getPostFromSlug(slug, locale)

		if (!postData) {
			return undefined
		}

		return {
			title: postData.metadata.title,
			description: postData.metadata.summary,
			authors: postData.metadata.author ? [{ name: postData.metadata.author }] : undefined,
			keywords: postData.metadata.tags,
			metadataBase: new URL(process.env.PUBLIC_URL || 'http://localhost:3000'),
			openGraph: {
				title: postData.metadata.title,
				description: postData.metadata.summary,
				images: postData.metadata.image.src,
			},
		}
	}
}
