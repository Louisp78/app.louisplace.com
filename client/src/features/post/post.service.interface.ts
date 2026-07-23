import { Locale } from '@/i18n/config'
import { Metadata } from 'next'
import { PostData } from './post'

export default interface IPostService {
	getPosts(locale: Locale): Promise<PostData[]>
	getPostFromSlug(slug: string, locale: Locale): Promise<PostData | undefined>
	getMetadataFromSlug(slug: string, locale: Locale): Promise<Metadata | undefined>
}
