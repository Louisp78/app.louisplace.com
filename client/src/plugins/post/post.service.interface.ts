import { Metadata } from 'next'
import { PostData } from './post'

export default interface IPostService {
	getPosts(): Promise<PostData[]>
	getPostFromSlug(slug: string): Promise<PostData | undefined>
	getMetadataFromSlug(slug: string): Promise<Metadata | undefined>
}
