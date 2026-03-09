import { PostData } from '../post'

export default interface IPostRepository {
	getPost: (slug: string) => Promise<PostData | null>
	getPosts: () => Promise<PostData[] | null>
}
