import { IStorageService } from '@/features/storage'
import { Locale } from '@/i18n/config'
import path from 'path'
import { PostData } from '../post'
import IPostRepository from './post.repository.interface'

const POSTS_PATH = path.join(process.cwd(), 'src/features/post/data')

export default class PostRepository implements IPostRepository {
	public constructor(private storage: IStorageService) {}

	async getPosts(locale: Locale): Promise<PostData[]> {
		const localePath = path.join(POSTS_PATH, locale)
		const postFileList = this.storage.getAll(localePath)
		return await Promise.all(
			postFileList.map(async (filePath) => {
				const fileContent = this.storage.get(localePath, filePath)!
				const postData: PostData = JSON.parse(fileContent)
				return postData
			})
		)
	}
	async getPost(slug: string, locale: Locale): Promise<PostData | null> {
		const posts = await this.getPosts(locale)
		const post = posts.find((post) => post.metadata.slug === slug)
		return post || null
	}
}
