import { Metadata } from 'next'
import { PostData } from '../post'
import PostRepositoryContainer from './post-repository.container'
import IPostService from './post.service.interface'

export default class PostService implements IPostService {
	private repository = PostRepositoryContainer.repository()
	private postsCache: PostData[] | null = null

	public async getPosts(): Promise<PostData[]> {
		if (this.postsCache) {
			return this.postsCache
		}

		const posts = await this.repository.getPosts()
		if (!posts) {
			this.postsCache = []
			return []
		}

		this.postsCache = posts.sort((a, b) => {
			return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
		})

		return this.postsCache
	}

	public async getPostFromSlug(slug: string): Promise<PostData | undefined> {
		const posts = await this.getPosts()
		return posts.find((post) => post.metadata.slug === slug)
	}

	public async getMetadataFromSlug(slug: string): Promise<Metadata | undefined> {
		const postData = await this.getPostFromSlug(slug)

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
