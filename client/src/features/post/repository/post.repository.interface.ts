import { Locale } from '@/i18n/config'
import { PostData } from '../post'

export default interface IPostRepository {
	getPost: (slug: string, locale: Locale) => Promise<PostData | null>
	getPosts: (locale: Locale) => Promise<PostData[] | null>
}
